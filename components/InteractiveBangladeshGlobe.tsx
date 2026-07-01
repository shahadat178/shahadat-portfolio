"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import styles from "./InteractiveBangladeshGlobe.module.css";

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

export default function InteractiveBangladeshGlobe() {
  const globeRef = useRef<any>(null);

  const [bangladeshPolygon, setBangladeshPolygon] =
    useState<GeoFeature | null>(null);

  useEffect(() => {
    let isMounted = true;

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

        if (isMounted && bangladesh) {
          setBangladeshPolygon(bangladesh);
        }
      } catch {
        /*
          If the country boundary cannot load, the globe still works.
          The red Dhaka pin remains visible.
        */
      }
    }

    loadBangladeshBoundary();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleGlobeReady() {
    const globe = globeRef.current;

    if (!globe) {
      return;
    }

    const controls = globe.controls();

    if (!controls) {
      return;
    }

    /*
      Start farther away, then smoothly settle into Bangladesh.
    */
    globe.pointOfView(
      {
        lat: 23.8,
        lng: 90.4,
        altitude: 1.72,
      },
      0
    );

    window.setTimeout(() => {
      globe.pointOfView(
        {
          lat: 23.8,
          lng: 90.4,
          altitude: 1.2,
        },
        1350
      );
    }, 180);

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
    controls.minDistance = 150;
    controls.maxDistance = 230;

    /*
      Ambient auto-rotation starts after the intro animation.
      It pauses during drag and resumes gently afterwards.
    */
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.05;

    let resumeRotationTimer: number | undefined;

    const stopAutoRotate = () => {
      if (resumeRotationTimer !== undefined) {
        window.clearTimeout(resumeRotationTimer);
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

    window.setTimeout(() => {
      controls.autoRotate = true;
    }, 1750);

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
  }

  function createBangladeshPin() {
    const button = document.createElement("button");

    button.type = "button";
    button.className = styles.mapPin;
    button.setAttribute(
      "aria-label",
      "Open Dhaka, Bangladesh in Google Maps"
    );

    button.onclick = () => {
      window.open(DHAKA_MAP_URL, "_blank", "noopener,noreferrer");
    };

    const pulse = document.createElement("span");
    pulse.className = styles.mapPinPulse;

    const pinHead = document.createElement("span");
    pinHead.className = styles.mapPinHead;

    button.appendChild(pulse);
    button.appendChild(pinHead);

    return button;
  }

  return (
    <div className={styles.globeShell}>
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
        <Globe
          ref={globeRef}
          width={286}
          height={286}
          backgroundColor="rgba(0, 0, 0, 0)"
          animateIn={false}
          globeImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
          showAtmosphere
          atmosphereColor="#a9a2ff"
          atmosphereAltitude={0.13}
          polygonsData={bangladeshPolygon ? [bangladeshPolygon] : []}
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