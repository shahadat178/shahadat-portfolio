"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { SIDEBAR_NAVIGATION } from "@/data/portfolio";
import type { SectionId } from "@/types/portfolio";

function sectionFromHash(): SectionId | null {
  const candidate = window.location.hash.slice(1);

  return SIDEBAR_NAVIGATION.some((item) => item.id === candidate)
    ? (candidate as SectionId)
    : null;
}

export function useActiveSection(initialSection: SectionId = "home") {
  const [activeSection, setActiveSection] =
    useState<SectionId>(initialSection);
  const navigationTargetRef = useRef<{
    section: SectionId;
    expiresAt: number;
  } | null>(null);

  const selectSection = useCallback((section: SectionId) => {
    navigationTargetRef.current = {
      section,
      expiresAt: performance.now() + 1400,
    };
    setActiveSection(section);
  }, []);

  useEffect(() => {
    const sections = SIDEBAR_NAVIGATION.map((item) =>
      document.getElementById(item.id)
    ).filter((section): section is HTMLElement => section !== null);
    let animationFrame = 0;

    function syncFromHistory() {
      navigationTargetRef.current = null;
      const historySection = sectionFromHash();

      if (historySection) {
        setActiveSection(historySection);
      } else if (window.location.hash === "") {
        setActiveSection("home");
      }

      scheduleViewportSync();
    }

    function syncFromViewport() {
      animationFrame = 0;

      if (sections.length === 0) {
        return;
      }

      const activationLine = Math.min(
        180,
        Math.max(104, window.innerHeight * 0.2)
      );
      let currentSection = sections[0].id as SectionId;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= activationLine) {
          currentSection = section.id as SectionId;
        } else {
          break;
        }
      }

      const reachedPageEnd =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4;

      const navigationTarget = navigationTargetRef.current;

      if (navigationTarget) {
        const targetElement = document.getElementById(
          navigationTarget.section
        );
        const targetTop = targetElement?.getBoundingClientRect().top;
        const reachedTarget =
          (typeof targetTop === "number" &&
            targetTop >= 0 &&
            targetTop <= activationLine) ||
          (navigationTarget.section === "contact" && reachedPageEnd);

        if (!reachedTarget && performance.now() < navigationTarget.expiresAt) {
          return;
        }

        navigationTargetRef.current = null;
      }

      if (reachedPageEnd) {
        currentSection = sections[sections.length - 1].id as SectionId;
      }

      setActiveSection((previousSection) =>
        previousSection === currentSection ? previousSection : currentSection
      );
    }

    function scheduleViewportSync() {
      if (animationFrame !== 0) {
        return;
      }

      animationFrame = window.requestAnimationFrame(syncFromViewport);
    }

    window.addEventListener("scroll", scheduleViewportSync, { passive: true });
    window.addEventListener("resize", scheduleViewportSync);
    window.addEventListener("hashchange", syncFromHistory);
    window.addEventListener("popstate", syncFromHistory);
    syncFromHistory();
    scheduleViewportSync();

    return () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", scheduleViewportSync);
      window.removeEventListener("resize", scheduleViewportSync);
      window.removeEventListener("hashchange", syncFromHistory);
      window.removeEventListener("popstate", syncFromHistory);
    };
  }, []);

  return [activeSection, selectSection] as const;
}
