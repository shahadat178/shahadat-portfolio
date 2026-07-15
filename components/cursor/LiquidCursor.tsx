"use client";

import { useEffect, useRef } from "react";

import styles from "@/components/cursor/PortfolioCursor.module.css";

type LiquidPoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  bornAt: number;
  lifeSpan: number;
  radius: number;
  color: string;
};

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MAX_POINTS = 88;

function getThemePalette() {
  const rootStyles = window.getComputedStyle(document.documentElement);
  const accent = rootStyles.getPropertyValue("--lg-accent").trim() || "#5f7cff";
  const accentStrong =
    rootStyles.getPropertyValue("--lg-accent-strong").trim() || "#6655f5";

  return [accent, accentStrong, "#63d8cf", "#8d7cff"];
}

export function LiquidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const coreRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const core = coreRef.current;

    if (!canvas || !core) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const finePointer = window.matchMedia(FINE_POINTER_QUERY);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    const points: LiquidPoint[] = [];
    let palette = getThemePalette();
    let frame = 0;
    let positionFrame = 0;
    let lastFrameAt = performance.now();
    let lastX = 0;
    let lastY = 0;
    let pendingX = 0;
    let pendingY = 0;
    let hasPosition = false;

    const canRender = () => finePointer.matches && !reducedMotion.matches;

    const resizeCanvas = () => {
      const density = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * density);
      canvas.height = Math.round(window.innerHeight * density);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(density, 0, 0, density, 0, 0);
    };

    const hide = () => {
      core.dataset.visible = "false";
      core.dataset.pressed = "false";
    };

    const addPoint = (
      x: number,
      y: number,
      velocityScale = 0.11,
      radiusScale = 1
    ) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.14 + Math.random() * 0.38;

      points.push({
        x,
        y,
        vx: Math.cos(angle) * speed * velocityScale,
        vy: Math.sin(angle) * speed * velocityScale,
        bornAt: performance.now(),
        lifeSpan: 460 + Math.random() * 260,
        radius: (7 + Math.random() * 11) * radiusScale,
        color: palette[Math.floor(Math.random() * palette.length)],
      });

      if (points.length > MAX_POINTS) {
        points.splice(0, points.length - MAX_POINTS);
      }
    };

    const animate = (now: number) => {
      const delta = Math.min(now - lastFrameAt, 34);
      lastFrameAt = now;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let index = points.length - 1; index >= 0; index -= 1) {
        const point = points[index];
        const progress = (now - point.bornAt) / point.lifeSpan;

        if (progress >= 1) {
          points.splice(index, 1);
          continue;
        }

        point.x += point.vx * delta;
        point.y += point.vy * delta;

        const remaining = 1 - progress;
        context.beginPath();
        context.arc(
          point.x,
          point.y,
          Math.max(1.5, point.radius * (0.34 + remaining * 0.66)),
          0,
          Math.PI * 2
        );
        context.globalAlpha = Math.min(0.82, remaining * 0.82);
        context.fillStyle = point.color;
        context.fill();
      }

      context.globalAlpha = 1;

      if (points.length > 0) {
        frame = window.requestAnimationFrame(animate);
      } else {
        frame = 0;
      }
    };

    const wakeAnimation = () => {
      if (frame === 0 && points.length > 0) {
        lastFrameAt = performance.now();
        frame = window.requestAnimationFrame(animate);
      }
    };

    const moveCore = () => {
      core.style.setProperty("--pointer-x", `${pendingX}px`);
      core.style.setProperty("--pointer-y", `${pendingY}px`);
      positionFrame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!canRender() || event.pointerType !== "mouse") {
        hide();
        return;
      }

      core.dataset.visible = "true";
      pendingX = event.clientX;
      pendingY = event.clientY;

      if (positionFrame === 0) {
        positionFrame = window.requestAnimationFrame(moveCore);
      }

      if (!hasPosition) {
        lastX = event.clientX;
        lastY = event.clientY;
        hasPosition = true;
        addPoint(event.clientX, event.clientY, 0.08, 0.8);
        wakeAnimation();
        return;
      }

      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
      const steps = Math.min(7, Math.max(1, Math.ceil(distance / 10)));

      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        addPoint(
          lastX + (event.clientX - lastX) * progress,
          lastY + (event.clientY - lastY) * progress
        );
      }

      lastX = event.clientX;
      lastY = event.clientY;
      wakeAnimation();
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!canRender() || event.pointerType !== "mouse") {
        return;
      }

      core.dataset.pressed = "true";

      for (let index = 0; index < 10; index += 1) {
        addPoint(event.clientX, event.clientY, 0.75, 0.7);
      }

      wakeAnimation();
    };

    const handlePointerUp = () => {
      core.dataset.pressed = "false";
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) {
        hide();
        hasPosition = false;
      }
    };

    const handleCapabilityChange = () => {
      if (!canRender()) {
        hide();
        points.length = 0;
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    const themeObserver = new MutationObserver(() => {
      palette = getThemePalette();
    });

    resizeCanvas();
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [
        "data-glass-theme",
        "data-glass-mode",
        "data-appearance-transition",
        "data-theme-transition",
        "class",
        "style",
      ],
    });
    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.addEventListener("pointercancel", hide, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });
    finePointer.addEventListener("change", handleCapabilityChange);
    reducedMotion.addEventListener("change", handleCapabilityChange);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      if (positionFrame !== 0) {
        window.cancelAnimationFrame(positionFrame);
      }

      themeObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("blur", hide);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointercancel", hide);
      document.removeEventListener("pointerout", handlePointerOut);
      finePointer.removeEventListener("change", handleCapabilityChange);
      reducedMotion.removeEventListener("change", handleCapabilityChange);
    };
  }, []);

  return (
    <div className={styles.liquidLayer} aria-hidden="true">
      <svg className={styles.filterDefinition} focusable="false">
        <defs>
          <filter id="portfolio-liquid-cursor-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 17 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <canvas ref={canvasRef} className={styles.liquidCanvas} />
      <span
        ref={coreRef}
        className={styles.liquidCore}
        data-visible="false"
        data-pressed="false"
      />
    </div>
  );
}
