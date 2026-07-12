"use client";

import dynamic from "next/dynamic";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type RefAttributes,
} from "react";

import bangladeshBoundaryData from "@/data/bangladesh.geo.json";
import InteractiveGlobeFallback from "@/components/InteractiveGlobeFallback";

import styles from "./InteractiveBangladeshGlobe.module.css";



type GlobeControls = {
  enablePan: boolean;
  enableZoom: boolean;
  enableDamping: boolean;
  dampingFactor: number;
  rotateSpeed: number;
  zoomSpeed: number;
  minDistance: number;
  maxDistance: number;
  autoRotate: boolean;
  autoRotateSpeed: number;
  addEventListener: (
    event: "start" | "end",
    listener: () => void
  ) => void;
  removeEventListener: (
    event: "start" | "end",
    listener: () => void
  ) => void;
};

type GlobeMaterial = {
  color: { set: (value: string) => void };
  emissive: { set: (value: string) => void };
  emissiveIntensity: number;
  specular: { set: (value: string) => void };
  shininess: number;
  bumpScale: number;
};

type GlobeRenderer = {
  dispose: () => void;
  forceContextLoss: () => void;
};

type GlobeRendererConfig = WebGLContextAttributes & {
  canvas: HTMLCanvasElement;
  context: WebGL2RenderingContext;
};

type GlobePointOfView = {
  lat: number;
  lng: number;
  altitude: number;
};

type GlobeHandle = {
  controls: () => GlobeControls | undefined;
  getGlobeRadius: () => number;
  renderer?: () => GlobeRenderer | undefined;
  pointOfView: {
    (): GlobePointOfView;
    (position: GlobePointOfView, duration?: number): void;
  };
  globeMaterial?: () => GlobeMaterial | undefined;
};

type GlobeComponent = ComponentType<
  Record<string, unknown> & RefAttributes<GlobeHandle>
>;



/*
  Globe uses WebGL, so it loads only in the browser.
  Returning null prevents any old loading orb/circle from appearing.
*/
const Globe = dynamic(
  () => import("react-globe.gl").then((module) => module.default),
  {
    ssr: false,
    loading: () => null,
  }
) as unknown as GlobeComponent;



type GeoFeature = {
  type: "Feature";
  properties?: {
    name?: string;
    ADMIN?: string;
    [key: string]: unknown;
  };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: unknown;
  };
};

type DhakaMarker = {
  id: string;
  lat: number;
  lng: number;
};

/*
  City-center point only.
  This is not your house address, GPS, IP, or live location.
*/
const DHAKA_MARKER: DhakaMarker = {
  id: "dhaka-bangladesh",
  lat: 23.8103,
  lng: 90.4125,
};

/*
  Opens generic Dhaka map search only.
*/
const DHAKA_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Dhaka%2C%20Bangladesh";

const BANGLADESH_VIEW: GlobePointOfView = {
  lat: 23.8,
  lng: 90.4,
  altitude: 1.2,
};

const BANGLADESH_POLYGON =
  bangladeshBoundaryData.features[0] as GeoFeature;

const WEBGL_CONTEXT_PROFILES = [
  { alpha: true, antialias: true },
  { alpha: true, antialias: false },
  {
    alpha: false,
    antialias: false,
    depth: true,
    preserveDrawingBuffer: false,
    stencil: false,
  },
] satisfies WebGLContextAttributes[];

function createBangladeshPin() {
  const link = document.createElement("a");

  link.className = styles.mapPin;
  link.href = DHAKA_MAP_URL;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute(
    "aria-label",
    "Open Dhaka, Bangladesh in Google Maps"
  );

  const pulse = document.createElement("span");
  pulse.className = styles.mapPinPulse;

  const pinHead = document.createElement("span");
  pinHead.className = styles.mapPinHead;

  link.appendChild(pulse);
  link.appendChild(pinHead);

  return link;
}

type InteractiveBangladeshGlobeProps = {
  compact?: boolean;
};

export default function InteractiveBangladeshGlobe({
  compact = false,
}: InteractiveBangladeshGlobeProps) {
  const globeRef = useRef<GlobeHandle | null>(null);
  const controlsCleanupRef = useRef<(() => void) | null>(null);
  const controlsConfiguredRef = useRef(false);
  const controlsRetryFrameRef = useRef<number | null>(null);
  const controlsRetryCountRef = useRef(0);
  const patchedRenderersRef = useRef(new WeakSet<GlobeRenderer>());
  const rendererAttachedRef = useRef(false);
  const ownedWebGlContextRef = useRef<WebGL2RenderingContext | null>(null);
  const [rendererConfig, setRendererConfig] =
    useState<GlobeRendererConfig | null>(null);

  useEffect(() => {
    let isCancelled = false;
    let retryTimer: number | undefined;

    const tryCreateWebGlContext = () => {
      if (isCancelled) {
        return;
      }

      for (const profile of WEBGL_CONTEXT_PROFILES) {
        const canvas = document.createElement("canvas");
        canvas.width = 286;
        canvas.height = 286;

        const context = canvas.getContext(
          "webgl2",
          profile
        ) as WebGL2RenderingContext | null;

        if (context) {
          ownedWebGlContextRef.current = context;
          setRendererConfig({
            ...profile,
            canvas,
            context,
          });
          return;
        }
      }

      retryTimer = window.setTimeout(tryCreateWebGlContext, 2400);
    };

    const initialFrame = window.requestAnimationFrame(
      tryCreateWebGlContext
    );

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(initialFrame);

      if (retryTimer !== undefined) {
        window.clearTimeout(retryTimer);
      }

      if (!rendererAttachedRef.current) {
        ownedWebGlContextRef.current
          ?.getExtension("WEBGL_lose_context")
          ?.loseContext();
      }
    };
  }, []);

  const prepareRendererForDisposal = useCallback(
    (globe: GlobeHandle) => {
      const renderer = globe.renderer?.();

      if (!renderer || patchedRenderersRef.current.has(renderer)) {
        return;
      }

      patchedRenderersRef.current.add(renderer);
      rendererAttachedRef.current = true;

      const originalDispose = renderer.dispose.bind(renderer);
      let isDisposed = false;

      renderer.dispose = () => {
        if (isDisposed) {
          return;
        }

        isDisposed = true;

        try {
          originalDispose();
        } finally {
          renderer.forceContextLoss();
          rendererAttachedRef.current = false;
          ownedWebGlContextRef.current = null;
        }
      };
    },
    []
  );

  const captureGlobe = useCallback(
    (globe: GlobeHandle | null) => {
      globeRef.current = globe;

      if (globe) {
        prepareRendererForDisposal(globe);
      }
    },
    [prepareRendererForDisposal]
  );

  useEffect(
    () => () => {
      if (controlsRetryFrameRef.current !== null) {
        window.cancelAnimationFrame(controlsRetryFrameRef.current);
      }

      controlsCleanupRef.current?.();
    },
    []
  );

  const configureGlobeControls = useCallback(() => {
    if (controlsConfiguredRef.current) {
      return true;
    }

    const globe = globeRef.current;

    if (!globe) {
      return false;
    }

    const controls = globe.controls();

    if (!controls) {
      return false;
    }

    controlsCleanupRef.current?.();
    controlsConfiguredRef.current = true;
    globe.pointOfView(BANGLADESH_VIEW, 0);

    /*
      Smooth iOS-like movement.
    */
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.enableDamping = true;

    controls.dampingFactor = 0.065;
    controls.rotateSpeed = 0.46;
    controls.zoomSpeed = 0.34;

    /*
      Zoom in is allowed.
      Zoom out is clamped so the globe never becomes tiny.
    */
    const globeRadius = globe.getGlobeRadius();

    controls.minDistance = globeRadius * 1.5;
    controls.maxDistance =
      globeRadius * (1 + BANGLADESH_VIEW.altitude);

    /*
      Restore the original ambient motion: start gently, pause while the
      visitor drags, then resume after the interaction settles.
    */
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.05;

    let startRotationTimer: number | undefined;
    let resumeRotationTimer: number | undefined;

    const stopAutoRotate = () => {
      if (startRotationTimer !== undefined) {
        window.clearTimeout(startRotationTimer);
        startRotationTimer = undefined;
      }

      if (resumeRotationTimer !== undefined) {
        window.clearTimeout(resumeRotationTimer);
        resumeRotationTimer = undefined;
      }

      controls.autoRotate = false;
    };

    const restartAutoRotate = () => {
      if (resumeRotationTimer !== undefined) {
        window.clearTimeout(resumeRotationTimer);
      }

      resumeRotationTimer = window.setTimeout(() => {
        controls.autoRotate = true;
      }, 1600);
    };

    controls.addEventListener("start", stopAutoRotate);
    controls.addEventListener("end", restartAutoRotate);

    startRotationTimer = window.setTimeout(() => {
      controls.autoRotate = true;
    }, 1750);

    controlsCleanupRef.current = () => {
      if (startRotationTimer !== undefined) {
        window.clearTimeout(startRotationTimer);
      }

      if (resumeRotationTimer !== undefined) {
        window.clearTimeout(resumeRotationTimer);
      }

      controls.removeEventListener("start", stopAutoRotate);
      controls.removeEventListener("end", restartAutoRotate);
      controls.autoRotate = false;
      controlsConfiguredRef.current = false;
    };

    /*
      Material polish without importing THREE directly.
      This avoids the missing declaration-file error.
    */
    const material = globe.globeMaterial?.();

    if (material) {
      material.color.set("#cbd7ff");
      material.emissive.set("#111b51");
      material.emissiveIntensity = 0.12;
      material.specular.set("#f5f8ff");
      material.shininess = 34;
      material.bumpScale = 3.1;
    }

    return true;
  }, []);

  const scheduleGlobeConfiguration = useCallback(() => {
    if (
      controlsConfiguredRef.current ||
      controlsRetryFrameRef.current !== null
    ) {
      return;
    }

    const tryConfigure = () => {
      controlsRetryFrameRef.current = null;

      if (configureGlobeControls()) {
        controlsRetryCountRef.current = 0;
        return;
      }

      if (controlsRetryCountRef.current >= 60) {
        return;
      }

      controlsRetryCountRef.current += 1;
      controlsRetryFrameRef.current =
        window.requestAnimationFrame(tryConfigure);
    };

    tryConfigure();
  }, [configureGlobeControls]);

  const handleGlobeReady = useCallback(() => {
    const globe = globeRef.current;

    if (globe) {
      prepareRendererForDisposal(globe);
    }

    scheduleGlobeConfiguration();
  }, [prepareRendererForDisposal, scheduleGlobeConfiguration]);

  return (
    <div
      className={styles.globeShell}
      data-variant={compact ? "compact" : "default"}
    >
      {/* Sky / subtle galaxy environment */}
      <div className={styles.skyParticles} />
      <div className={styles.skyAura} />
      <div className={styles.skyHalo} />

      {/* Floating 3D platform */}
      <div className={styles.lightBeam} />
      <div className={styles.floorShadow} />
      <div className={styles.platformOuter} />
      <div className={styles.platformInner} />
      <div className={styles.platformHighlight} />

      {/* Fixed label outside the globe canvas, so it never gets cut */}
      <div className={styles.identityTag}>
        <span className={styles.identityTagDot} />
        <span>Shahadat Sardar</span>
      </div>

      <span className={styles.identityConnector} aria-hidden="true" />

      <div className={styles.globeCanvas}>
        {rendererConfig ? (
          <Globe
            ref={captureGlobe}
            width={286}
            height={286}
            rendererConfig={rendererConfig}
            backgroundColor="rgba(0, 0, 0, 0)"
            animateIn={false}
            globeImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
            showAtmosphere
            atmosphereColor="#a9a2ff"
            atmosphereAltitude={0.13}
            polygonsData={[BANGLADESH_POLYGON]}
            polygonGeoJsonGeometry="geometry"
            polygonCapColor={() => "rgba(108, 150, 255, 0.22)"}
            polygonSideColor={() => "rgba(102, 84, 228, 0.08)"}
            polygonStrokeColor={() => "rgba(227, 241, 255, 0.94)"}
            polygonAltitude={0.018}
            htmlElementsData={[DHAKA_MARKER]}
            htmlLat="lat"
            htmlLng="lng"
            htmlAltitude={0.04}
            htmlElement={createBangladeshPin}
            onGlobeReady={handleGlobeReady}
          />
        ) : (
          <InteractiveGlobeFallback mapUrl={DHAKA_MAP_URL} />
        )}
      </div>

      <a
        className={styles.locationPill}
        href={DHAKA_MAP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Open Dhaka, Bangladesh in Google Maps"
      >
        <span className={styles.locationIcon} aria-hidden="true">
          ⌖
        </span>

        <span>Dhaka, Bangladesh</span>

        <span className={styles.locationArrow} aria-hidden="true">
          ↗
        </span>
      </a>
    </div>
  );
}
