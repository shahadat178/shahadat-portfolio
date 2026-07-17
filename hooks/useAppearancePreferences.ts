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

type TransitionTrigger = MouseEvent<HTMLButtonElement>;

function getTransitionGeometry(event: TransitionTrigger) {
  const rect = event.currentTarget.getBoundingClientRect();
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;
  const hasPointerPosition =
    event.detail > 0 &&
    Number.isFinite(event.clientX) &&
    Number.isFinite(event.clientY);
  const originX = Math.min(
    viewportWidth,
    Math.max(0, hasPointerPosition ? event.clientX : rect.left + rect.width / 2)
  );
  const originY = Math.min(
    viewportHeight,
    Math.max(0, hasPointerPosition ? event.clientY : rect.top + rect.height / 2)
  );

  return {
    originX,
    originY,
    revealRadius: Math.hypot(
      Math.max(originX, viewportWidth - originX),
      Math.max(originY, viewportHeight - originY)
    ),
  };
}

function setRevealGeometry(
  root: HTMLElement,
  prefix: "appearance" | "theme",
  event: TransitionTrigger
) {
  const { originX, originY, revealRadius } = getTransitionGeometry(event);

  root.style.setProperty(`--${prefix}-reveal-x`, `${originX}px`);
  root.style.setProperty(`--${prefix}-reveal-y`, `${originY}px`);
  root.style.setProperty(
    `--${prefix}-reveal-radius`,
    `${revealRadius}px`
  );
}

function isGlassTheme(value: string | null): value is GlassTheme {
  return value !== null && VALID_THEMES.has(value as GlassTheme);
}

function isAppearanceMode(value: string | null): value is AppearanceMode {
  return value === "light" || value === "dark";
}

export function useAppearancePreferences() {
  const [glassTheme, setGlassThemeState] = useState<GlassTheme>("aurora");
  const [appearanceMode, setAppearanceMode] =
    useState<AppearanceMode>("light");
  const hasLoadedPreferences = useRef(false);
  const themeTransitionId = useRef(0);

  useEffect(() => {
    const loadStoredAppearance = window.setTimeout(() => {
      const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      const savedMode = window.localStorage.getItem(MODE_STORAGE_KEY);

      if (isGlassTheme(savedTheme)) {
        setGlassThemeState(savedTheme);
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

  function setGlassTheme(nextTheme: GlassTheme, event: TransitionTrigger) {
    if (nextTheme === glassTheme) {
      return;
    }

    const root = document.documentElement;
    const applyTheme = () => {
      flushSync(() => setGlassThemeState(nextTheme));
    };
    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (shouldReduceMotion) {
      applyTheme();
      return;
    }

    const transitionDocument = document as ViewTransitionDocument;
    const transitionId = themeTransitionId.current + 1;
    themeTransitionId.current = transitionId;
    setRevealGeometry(root, "theme", event);
    root.dataset.themeTransition = "true";

    const transition = transitionDocument.startViewTransition?.(applyTheme);

    if (!transition) {
      applyTheme();
      root.removeAttribute("data-theme-transition");
      return;
    }

    transition.finished
      .catch(() => undefined)
      .finally(() => {
        if (themeTransitionId.current === transitionId) {
          root.removeAttribute("data-theme-transition");
        }
      });
  }

  function toggleAppearanceMode(event: TransitionTrigger) {
    const nextMode: AppearanceMode =
      appearanceMode === "light" ? "dark" : "light";
    const root = document.documentElement;

    setRevealGeometry(root, "appearance", event);
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

    transition.finished
      .catch(() => undefined)
      .finally(() => {
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
