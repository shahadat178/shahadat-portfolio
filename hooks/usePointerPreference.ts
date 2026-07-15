"use client";

import { useEffect, useRef, useState } from "react";

import type { PointerMode } from "@/types/portfolio";

const POINTER_STORAGE_KEY = "portfolio-pointer-mode";
const VALID_POINTER_MODES = new Set<PointerMode>([
  "system",
  "liquid",
  "crystal",
  "orbit",
]);

function isPointerMode(value: string | null): value is PointerMode {
  return value !== null && VALID_POINTER_MODES.has(value as PointerMode);
}

export function usePointerPreference() {
  const [pointerMode, setPointerMode] = useState<PointerMode>("system");
  const hasLoadedPreference = useRef(false);

  useEffect(() => {
    const loadStoredPreference = window.setTimeout(() => {
      const storedMode = window.localStorage.getItem(POINTER_STORAGE_KEY);

      if (isPointerMode(storedMode)) {
        setPointerMode(storedMode);
      }

      hasLoadedPreference.current = true;
    }, 0);

    return () => window.clearTimeout(loadStoredPreference);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.pointerMode = pointerMode;

    if (hasLoadedPreference.current) {
      window.localStorage.setItem(POINTER_STORAGE_KEY, pointerMode);
    }

    return () => {
      root.removeAttribute("data-pointer-mode");
    };
  }, [pointerMode]);

  return { pointerMode, setPointerMode } as const;
}
