"use client";

import { useEffect, useRef } from "react";

import styles from "@/components/cursor/PortfolioCursor.module.css";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const EMOJI = ["😀", "😂", "😆", "😊"] as const;
const EMIT_DELAY = 18;
const MAX_PARTICLES = 72;

type EmojiParticle = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  life: number;
  maxLife: number;
  emoji: (typeof EMOJI)[number];
};

export function EmojiCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const finePointer = window.matchMedia(FINE_POINTER_QUERY);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    const particles: EmojiParticle[] = [];
    let animationFrame = 0;
    let lastFrameAt = performance.now();
    let lastEmitAt = 0;
    let lastX = 0;
    let lastY = 0;
    let hasPosition = false;

    const canRender = () => finePointer.matches && !reducedMotion.matches;

    const resizeCanvas = () => {
      const density = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * density);
      canvas.height = Math.round(window.innerHeight * density);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(density, 0, 0, density, 0, 0);
      context.font = '21px "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
      context.textAlign = "center";
      context.textBaseline = "middle";
    };

    const stop = () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }

      particles.length = 0;
      hasPosition = false;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const addParticle = (x: number, y: number) => {
      const life = 80 + Math.floor(Math.random() * 60);

      particles.push({
        x,
        y,
        velocityX: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
        velocityY: Math.random() * 0.4 + 0.8,
        life,
        maxLife: life,
        emoji: EMOJI[Math.floor(Math.random() * EMOJI.length)],
      });

      if (particles.length > MAX_PARTICLES) {
        particles.splice(0, particles.length - MAX_PARTICLES);
      }
    };

    const animate = (now: number) => {
      const deltaScale = Math.min((now - lastFrameAt) / 16.67, 2);
      lastFrameAt = now;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.life -= deltaScale;

        if (particle.life <= 0) {
          particles.splice(index, 1);
          continue;
        }

        particle.x += particle.velocityX * deltaScale;
        particle.y += particle.velocityY * deltaScale;
        particle.velocityY += 0.05 * deltaScale;

        const scale = Math.max(particle.life / particle.maxLife, 0);
        context.save();
        context.globalAlpha = Math.min(1, scale * 1.35);
        context.translate(particle.x, particle.y);
        context.scale(scale, scale);
        context.fillText(particle.emoji, 0, 0);
        context.restore();
      }

      if (particles.length > 0) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        animationFrame = 0;
      }
    };

    const wakeAnimation = () => {
      if (animationFrame === 0 && particles.length > 0) {
        lastFrameAt = performance.now();
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!canRender() || event.pointerType !== "mouse") {
        stop();
        return;
      }

      if (!hasPosition) {
        lastX = event.clientX;
        lastY = event.clientY;
        hasPosition = true;
      }

      if (event.timeStamp - lastEmitAt < EMIT_DELAY) {
        return;
      }

      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);

      if (distance > 2) {
        addParticle(event.clientX, event.clientY);
        lastX = event.clientX;
        lastY = event.clientY;
        lastEmitAt = event.timeStamp;
        wakeAnimation();
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) {
        hasPosition = false;
      }
    };

    const handleCapabilityChange = () => {
      if (!canRender()) {
        stop();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("blur", stop);
    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });
    finePointer.addEventListener("change", handleCapabilityChange);
    reducedMotion.addEventListener("change", handleCapabilityChange);

    return () => {
      stop();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("blur", stop);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerout", handlePointerOut);
      finePointer.removeEventListener("change", handleCapabilityChange);
      reducedMotion.removeEventListener("change", handleCapabilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.emojiCanvas} aria-hidden="true" />;
}
