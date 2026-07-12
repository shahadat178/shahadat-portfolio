"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type KeyboardEvent,
  type PointerEvent,
  type WheelEvent,
} from "react";

import styles from "./InteractiveBangladeshGlobe.module.css";

type InteractiveGlobeFallbackProps = {
  mapUrl: string;
};

const GLOBE_SIZE = 286;
const TEXTURE_WIDTH = GLOBE_SIZE * 2;
const SURFACE_RADIUS = 118;
const MIN_ZOOM = 1;
const MAX_ZOOM = 1.62;

export default function InteractiveGlobeFallback({
  mapUrl,
}: InteractiveGlobeFallbackProps) {
  const worldRef = useRef<HTMLDivElement | null>(null);
  const interactionRef = useRef({
    angle: 0,
    isDragging: false,
    lastPointerX: 0,
    pausedUntil: 0,
    zoom: MIN_ZOOM,
  });

  const clampZoom = useCallback((zoom: number) => {
    return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));
  }, []);

  useEffect(() => {
    let animationFrame = 0;
    let previousTime = performance.now();

    const update = (time: number) => {
      const interaction = interactionRef.current;
      const elapsed = Math.min(48, time - previousTime);
      previousTime = time;

      if (!interaction.isDragging && time >= interaction.pausedUntil) {
        interaction.angle += elapsed * 0.00004;
      }

      const normalizedAngle =
        ((interaction.angle % (Math.PI * 2)) + Math.PI * 2) %
        (Math.PI * 2);
      const depth = Math.cos(normalizedAngle);
      const surfaceX =
        GLOBE_SIZE / 2 + Math.sin(normalizedAngle) * SURFACE_RADIUS;
      const textureShift =
        (normalizedAngle / (Math.PI * 2)) * TEXTURE_WIDTH;
      const surfaceOpacity = Math.max(
        0,
        Math.min(1, (depth + 0.08) / 0.22)
      );
      const surfaceScale = 0.68 + Math.max(0, depth) * 0.32;
      const world = worldRef.current;

      if (world) {
        world.style.setProperty(
          "--fallback-texture-shift",
          `${textureShift}px`
        );
        world.style.setProperty(
          "--fallback-surface-x",
          `${surfaceX}px`
        );
        world.style.setProperty(
          "--fallback-surface-opacity",
          `${surfaceOpacity}`
        );
        world.style.setProperty(
          "--fallback-surface-scale",
          `${surfaceScale}`
        );
        world.style.setProperty(
          "--fallback-world-scale",
          `${interaction.zoom}`
        );
      }

      animationFrame = window.requestAnimationFrame(update);
    };

    animationFrame = window.requestAnimationFrame(update);

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  const pauseRotation = useCallback(() => {
    interactionRef.current.pausedUntil = performance.now() + 1600;
  }, []);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if ((event.target as Element).closest("a")) {
        return;
      }

      const interaction = interactionRef.current;
      interaction.isDragging = true;
      interaction.lastPointerX = event.clientX;
      pauseRotation();
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [pauseRotation]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const interaction = interactionRef.current;

      if (!interaction.isDragging) {
        return;
      }

      const movement = event.clientX - interaction.lastPointerX;
      interaction.lastPointerX = event.clientX;
      interaction.angle += movement / 125;
      pauseRotation();
    },
    [pauseRotation]
  );

  const handlePointerEnd = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      interactionRef.current.isDragging = false;
      pauseRotation();

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [pauseRotation]
  );

  const handleWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      event.preventDefault();
      const interaction = interactionRef.current;
      interaction.zoom = clampZoom(
        interaction.zoom + (event.deltaY < 0 ? 0.1 : -0.1)
      );
      pauseRotation();
    },
    [clampZoom, pauseRotation]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const interaction = interactionRef.current;

      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        interaction.angle += event.key === "ArrowLeft" ? -0.14 : 0.14;
        pauseRotation();
        event.preventDefault();
      }

      if (["+", "=", "-", "_"].includes(event.key)) {
        interaction.zoom = clampZoom(
          interaction.zoom + (["+", "="].includes(event.key) ? 0.1 : -0.1)
        );
        pauseRotation();
        event.preventDefault();
      }
    },
    [clampZoom, pauseRotation]
  );

  return (
    <div
      className={styles.globeFallback}
      role="group"
      tabIndex={0}
      aria-label="Interactive globe centered on Bangladesh. Drag to rotate and scroll to zoom."
      onKeyDown={handleKeyDown}
      onPointerCancel={handlePointerEnd}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onWheel={handleWheel}
    >
      <div className={styles.fallbackWorld} ref={worldRef}>
        <span className={styles.loadingGlobe} aria-hidden="true" />

        <span className={styles.fallbackSurface}>
          <span
            className={styles.fallbackBangladeshGlass}
            aria-hidden="true"
          />
          <a
            className={styles.fallbackMapPin}
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Dhaka, Bangladesh in Google Maps"
          >
            <span className={styles.mapPinPulse} aria-hidden="true" />
            <span className={styles.mapPinHead} aria-hidden="true" />
          </a>
        </span>
      </div>
    </div>
  );
}
