"use client";

import { useState, type MouseEvent, type ReactNode } from "react";

import { PortfolioSidebar } from "@/components/layout/PortfolioSidebar";
import { PortfolioMobileHeader } from "@/components/layout/PortfolioMobileHeader";
import { PortfolioTopBar } from "@/components/layout/PortfolioTopBar";
import { useAppearancePreferences } from "@/hooks/useAppearancePreferences";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { SectionId } from "@/types/portfolio";

type PortfolioPageProps = {
  children: ReactNode;
  insightRail: ReactNode;
};

export function PortfolioPage({ children, insightRail }: PortfolioPageProps) {
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

  function handleNavigation(
    event: MouseEvent<HTMLAnchorElement>,
    section: SectionId
  ) {
    setActiveSection(section);
    setSidebarIndicator(section);
    setTopIndicator(section === "home" ? "work" : section);

    if (section === "home") {
      event.preventDefault();
      const shouldReduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      window.scrollTo({
        top: 0,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
      window.history.replaceState(null, "", "#home");
    }
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <div className="portfolio-shell">
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

        {insightRail}
      </div>
    </>
  );
}
