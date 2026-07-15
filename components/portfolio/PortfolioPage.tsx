"use client";

import { useState, type MouseEvent, type ReactNode } from "react";

import { PortfolioCursor } from "@/components/cursor/PortfolioCursor";
import { PortfolioSidebar } from "@/components/layout/PortfolioSidebar";
import { PortfolioInsightRail } from "@/components/layout/PortfolioInsightRail";
import { PortfolioMobileHeader } from "@/components/layout/PortfolioMobileHeader";
import { PortfolioTopBar } from "@/components/layout/PortfolioTopBar";
import { useAppearancePreferences } from "@/hooks/useAppearancePreferences";
import { useActiveSection } from "@/hooks/useActiveSection";
import { usePointerPreference } from "@/hooks/usePointerPreference";
import type { SectionId } from "@/types/portfolio";
import styles from "@/components/portfolio/PortfolioPage.module.css";

type PortfolioPageProps = {
  children: ReactNode;
};

export function PortfolioPage({ children }: PortfolioPageProps) {
  const [activeSection, setActiveSection] = useActiveSection("home");
  const [sidebarIndicator, setSidebarIndicator] =
    useState<SectionId>("home");
  const [topIndicator, setTopIndicator] = useState<SectionId>("work");
  const {
    appearanceMode,
    glassTheme,
    setGlassTheme,
    toggleAppearanceMode,
  } = useAppearancePreferences();
  const { pointerMode, setPointerMode } = usePointerPreference();

  function handleNavigation(
    event: MouseEvent<HTMLAnchorElement>,
    section: SectionId
  ) {
    event.preventDefault();

    setActiveSection(section);
    setSidebarIndicator(section);
    setTopIndicator(section === "home" ? "work" : section);

    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const behavior = shouldReduceMotion ? "auto" : "smooth";
    const nextHash = `#${section}`;

    if (section === "home") {
      window.scrollTo({
        top: 0,
        behavior,
      });
    } else {
      document.getElementById(section)?.scrollIntoView({
        behavior,
        block: "start",
      });
    }

    if (window.location.hash === nextHash) {
      window.history.replaceState(null, "", nextHash);
    } else {
      window.history.pushState(null, "", nextHash);
    }
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <div className={`${styles.shell} portfolio-shell`}>
        <PortfolioSidebar
          activeSection={activeSection}
          appearanceMode={appearanceMode}
          indicator={sidebarIndicator}
          onIndicatorChange={setSidebarIndicator}
          onNavigate={handleNavigation}
        />

        <main className="main-content" id="main-content" tabIndex={-1}>
          <PortfolioMobileHeader
            activeSection={activeSection}
            appearanceMode={appearanceMode}
            glassTheme={glassTheme}
            onNavigate={handleNavigation}
            onThemeChange={setGlassTheme}
            onToggleAppearance={toggleAppearanceMode}
          />

          <PortfolioTopBar
            activeSection={activeSection}
            appearanceMode={appearanceMode}
            glassTheme={glassTheme}
            indicator={topIndicator}
            onIndicatorChange={setTopIndicator}
            onNavigate={handleNavigation}
            onThemeChange={setGlassTheme}
            onToggleAppearance={toggleAppearanceMode}
          />

          {children}
        </main>

        <PortfolioInsightRail
          activeSection={activeSection}
          pointerMode={pointerMode}
          onNavigate={handleNavigation}
          onPointerModeChange={setPointerMode}
        />
      </div>

      <PortfolioCursor mode={pointerMode} />
    </>
  );
}
