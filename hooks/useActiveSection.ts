"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    const sections = SIDEBAR_NAVIGATION.map((item) =>
      document.getElementById(item.id)
    ).filter((section): section is HTMLElement => section !== null);

    function syncFromHistory() {
      setActiveSection(sectionFromHash() ?? "home");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            if (b.intersectionRatio !== a.intersectionRatio) {
              return b.intersectionRatio - a.intersectionRatio;
            }

            return Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top);
          });

        const section = visible[0]?.target.id;

        if (
          section &&
          SIDEBAR_NAVIGATION.some((item) => item.id === section)
        ) {
          setActiveSection(section as SectionId);
        }
      },
      {
        rootMargin: "-96px 0px -58% 0px",
        threshold: [0, 0.15, 0.35, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", syncFromHistory);
    window.addEventListener("popstate", syncFromHistory);
    syncFromHistory();

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncFromHistory);
      window.removeEventListener("popstate", syncFromHistory);
    };
  }, []);

  return [activeSection, setActiveSection] as const;
}
