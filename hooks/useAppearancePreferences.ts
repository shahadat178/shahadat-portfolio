"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";

import type { AppearanceMode, GlassTheme } from "@/types/portfolio";

const THEME_STORAGE_KEY = "portfolio-glass-theme";
const MODE_STORAGE_KEY = "portfolio-appearance-mode";

const VALID_THEMES = new Set<GlassTheme>([
  "aurora",
  "frost",
  "ash",
  "emerald",
]);

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    finished: Promise<void>;
  };
};

function isGlassTheme(value: string | null): value is GlassTheme {
  return value !== null && VALID_THEMES.has(value as GlassTheme);
}

function isAppearanceMode(value: string | null): value is AppearanceMode {
  return value === "light" || value === "dark";
}

export function useAppearancePreferences() {
  const [glassTheme, setGlassTheme] = useState<GlassTheme>("aurora");
  const [appearanceMode, setAppearanceMode] =
    useState<AppearanceMode>("light");
  const hasLoadedPreferences = useRef(false);

  useEffect(() => {
    const loadStoredAppearance = window.setTimeout(() => {
      const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      const savedMode = window.localStorage.getItem(MODE_STORAGE_KEY);

      if (isGlassTheme(savedTheme)) {
        setGlassTheme(savedTheme);
      }

      if (isAppearanceMode(savedMode)) {
        setAppearanceMode(savedMode);
      }

      hasLoadedPreferences.current = true;
    }, 0);

    return () => window.clearTimeout(loadStoredAppearance);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    root.dataset.glassTheme = glassTheme;
    root.dataset.glassMode = appearanceMode;

    if (hasLoadedPreferences.current) {
      window.localStorage.setItem(THEME_STORAGE_KEY, glassTheme);
      window.localStorage.setItem(MODE_STORAGE_KEY, appearanceMode);
    }
  }, [glassTheme, appearanceMode]);

  function toggleAppearanceMode(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    const revealRadius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY)
    );
    const nextMode: AppearanceMode =
      appearanceMode === "light" ? "dark" : "light";
    const root = document.documentElement;

    root.style.setProperty("--appearance-reveal-x", `${originX}px`);
    root.style.setProperty("--appearance-reveal-y", `${originY}px`);
    root.style.setProperty(
      "--appearance-reveal-radius",
      `${revealRadius}px`
    );
    root.dataset.appearanceTransition = nextMode;

    const applyAppearance = () => {
      flushSync(() => setAppearanceMode(nextMode));
    };

    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (shouldReduceMotion) {
      applyAppearance();
      root.removeAttribute("data-appearance-transition");
      return;
    }

    const transitionDocument = document as ViewTransitionDocument;
    const transition =
      transitionDocument.startViewTransition?.(applyAppearance);

    if (!transition) {
      applyAppearance();
      root.removeAttribute("data-appearance-transition");
      return;
    }

    transition.finished.finally(() => {
      root.removeAttribute("data-appearance-transition");
    });
  }

  return {
    appearanceMode,
    glassTheme,
    setGlassTheme,
    toggleAppearanceMode,
  } as const;
}
