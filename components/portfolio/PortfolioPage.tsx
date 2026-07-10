"use client";

import { useState, type MouseEvent, type ReactNode } from "react";

import { PortfolioSidebar } from "@/components/layout/PortfolioSidebar";
import { PortfolioTopBar } from "@/components/layout/PortfolioTopBar";
import { useAppearancePreferences } from "@/hooks/useAppearancePreferences";
import type { SectionId } from "@/types/portfolio";

type PortfolioPageProps = {
  children: ReactNode;
  insightRail: ReactNode;
};

export function PortfolioPage({ children, insightRail }: PortfolioPageProps) {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
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
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "#home");
    }
  }

  return (
    <main className="portfolio-shell">
      <PortfolioSidebar
        activeSection={activeSection}
        appearanceMode={appearanceMode}
        indicator={sidebarIndicator}
        onIndicatorChange={setSidebarIndicator}
        onNavigate={handleNavigation}
      />

      <section className="main-content">
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
      </section>

      {insightRail}
    </main>
  );
}
