"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import styles from "./InteractiveBangladeshGlobe.module.css";

/*
  react-globe.gl uses WebGL, so it must load in the browser only.
*/
const Globe = dynamic(
  () => import("react-globe.gl").then((module) => module.default),
  {
    ssr: false,
    loading: () => <div className={styles.loadingGlobe} />,
  }
) as any;

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

type MarkerDatum = {
  id: string;
  lat: number;
  lng: number;
};

const DHAKA_MARKER: MarkerDatum = {
  id: "dhaka-bangladesh",
  lat: 23.8103,
  lng: 90.4125,
};

/*
  This is only a generic city-level map search.
  It does not use your home address, IP address, GPS, or browser permission.
*/
const DHAKA_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Dhaka%2C%20Bangladesh";

export default function InteractiveBangladeshGlobe() {
  const globeRef = useRef<any>(null);
  const [bangladeshPolygon, setBangladeshPolygon] =
    useState<GeoFeature | null>(null);

  useEffect(() => {
    async function loadBangladeshBoundary() {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
        );

        if (!response.ok) {
          return;
        }

        const data: { features?: GeoFeature[] } = await response.json();

        const bangladesh = data.features?.find(
          (country) =>
            country.properties?.name === "Bangladesh" ||
            country.properties?.ADMIN === "Bangladesh"
        );

        if (bangladesh) {
          setBangladeshPolygon(bangladesh);
        }
      } catch {
        /*
          The globe still works if boundary data cannot load.
          The city-level pin remains visible.
        */
      }
    }

    loadBangladeshBoundary();
  }, []);

  function handleGlobeReady() {
    const globe = globeRef.current;

    if (!globe) {
      return;
    }

    /*
      Refresh animation:
      Start slightly farther away, then smoothly arrive at Bangladesh.
    */
    globe.pointOfView(
      {
        lat: 23.8,
        lng: 90.4,
        altitude: 1.62,
      },
      0
    );

    window.setTimeout(() => {
      globe.pointOfView(
        {
          lat: 23.8,
          lng: 90.4,
          altitude: 1.22,
        },
        1300
      );
    }, 220);

    const controls = globe.controls();

    controls.enablePan = false;
    controls.enableZoom = true;
    controls.enableDamping = true;

    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.58;
    controls.zoomSpeed = 0.42;

    /*
      Zoom behavior:
      - Zoom in is allowed.
      - Zoom out is intentionally limited, so the globe
        never turns into a tiny flat-looking circle.
    */
    controls.minDistance = 150;
    controls.maxDistance = 248;

    /*
      Very slow living-globe movement.
      Dragging still works normally.
    */
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.085;

    /*
      Material polish without importing THREE directly.
      This avoids the TypeScript error you saw before.
    */
    const material = globe.globeMaterial?.();

    if (material) {
      material.color.set("#c9d5ff");
      material.emissive.set("#101a50");
      material.emissiveIntensity = 0.11;
      material.specular.set("#f3f7ff");
      material.shininess = 34;
      material.bumpScale = 3.1;
    }
  }

  function createBangladeshMarker() {
    const button = document.createElement("button");

    button.type = "button";
    button.className = styles.mapMarker;
    button.setAttribute(
      "aria-label",
      "Open Dhaka, Bangladesh in Google Maps"
    );

    button.onclick = () => {
      window.open(DHAKA_MAP_URL, "_blank", "noopener,noreferrer");
    };

    const pulse = document.createElement("span");
    pulse.className = styles.mapMarkerPulse;

    const pin = document.createElement("span");
    pin.className = styles.mapMarkerPin;

    const name = document.createElement("span");
    name.className = styles.mapMarkerName;
    name.textContent = "Shahadat Sardar";

    button.appendChild(pulse);
    button.appendChild(pin);
    button.appendChild(name);

    return button;
  }

  return (
    <div className={styles.globeShell}>
      {/* Sky / space atmosphere */}
      <div className={styles.sceneStarfield} />
      <div className={styles.sceneAura} />
      <div className={styles.sceneHalo} />

      {/* 3D floating base */}
      <div className={styles.sceneBeam} />
      <div className={styles.sceneShadow} />
      <div className={styles.scenePlatformOuter} />
      <div className={styles.scenePlatformInner} />
      <div className={styles.scenePlatformGlow} />

      <div className={styles.globeCanvas}>
        <Globe
          ref={globeRef}
          width={286}
          height={286}
          backgroundColor="rgba(0, 0, 0, 0)"
          animateIn={false}
          globeImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
          showAtmosphere
          atmosphereColor="#a8a0ff"
          atmosphereAltitude={0.13}
          polygonsData={bangladeshPolygon ? [bangladeshPolygon] : []}
          polygonGeoJsonGeometry="geometry"
          polygonCapColor={() => "rgba(110, 151, 255, 0.23)"}
          polygonSideColor={() => "rgba(103, 86, 226, 0.08)"}
          polygonStrokeColor={() => "rgba(223, 239, 255, 0.94)"}
          polygonAltitude={0.018}
          htmlElementsData={[DHAKA_MARKER]}
          htmlLat="lat"
          htmlLng="lng"
          htmlAltitude={0.045}
          htmlElement={createBangladeshMarker}
          onGlobeReady={handleGlobeReady}
        />
      </div>

      <a
        className={styles.locationPill}
        href={DHAKA_MAP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Open Dhaka, Bangladesh in Google Maps"
      >
        <span className={styles.locationPillIcon} aria-hidden="true">
          ⌖
        </span>

        <span>Dhaka, Bangladesh</span>

        <span className={styles.locationPillArrow} aria-hidden="true">
          ↗
        </span>
      </a>
    </div>
  );
}