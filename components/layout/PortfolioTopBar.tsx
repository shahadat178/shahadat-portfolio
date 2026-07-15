"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiMoon,
  FiSun,
} from "react-icons/fi";

import {
  APPEARANCE_THEMES,
  PORTFOLIO_PROFILE,
  TOP_NAVIGATION,
} from "@/data/portfolio";
import type {
  AppearanceMode,
  GlassTheme,
  NavigationHandler,
  SectionId,
} from "@/types/portfolio";

type PortfolioTopBarProps = {
  activeSection: SectionId;
  appearanceMode: AppearanceMode;
  glassTheme: GlassTheme;
  indicator: SectionId;
  onIndicatorChange: (section: SectionId) => void;
  onNavigate: NavigationHandler;
  onThemeChange: (theme: GlassTheme) => void;
  onToggleAppearance: (event: MouseEvent<HTMLButtonElement>) => void;
};

export function PortfolioTopBar({
  activeSection,
  appearanceMode,
  glassTheme,
  indicator,
  onIndicatorChange,
  onNavigate,
  onThemeChange,
  onToggleAppearance,
}: PortfolioTopBarProps) {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const topActionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isThemeMenuOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;

      if (target instanceof Node && !topActionsRef.current?.contains(target)) {
        setIsThemeMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsThemeMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isThemeMenuOpen]);

  function selectTheme(theme: GlassTheme) {
    onThemeChange(theme);
    window.setTimeout(() => setIsThemeMenuOpen(false), 460);
  }

  const currentTheme =
    APPEARANCE_THEMES.find((theme) => theme.id === glassTheme) ??
    APPEARANCE_THEMES[0];

  return (
    <header
      className="top-bar"
      data-theme-menu-open={isThemeMenuOpen ? "true" : "false"}
    >
      <nav
        className="top-dock"
        aria-label="Primary navigation"
        data-active={indicator}
      >
        {TOP_NAVIGATION.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="top-nav-link"
            aria-current={activeSection === item.id ? "location" : undefined}
            onClick={(event) => onNavigate(event, item.id)}
            onMouseEnter={() => onIndicatorChange(item.id)}
            onFocus={() => onIndicatorChange(item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="top-actions" ref={topActionsRef}>
        <div
          className="appearance-control"
          data-open={isThemeMenuOpen ? "true" : "false"}
        >
          <div
            className="theme-inline-rail"
            data-active-theme={glassTheme}
            role="group"
            aria-label="Choose color theme"
          >
            {APPEARANCE_THEMES.map((theme) => {
              const isSelected = glassTheme === theme.id;

              return (
                <button
                  key={theme.id}
                  className="theme-orb-choice"
                  type="button"
                  aria-label={`Use ${theme.label} theme`}
                  aria-pressed={isSelected}
                  title={theme.label}
                  tabIndex={isThemeMenuOpen ? 0 : -1}
                  onClick={() => selectTheme(theme.id)}
                >
                  <span
                    className={`theme-orb-swatch theme-orb-swatch-${theme.id}`}
                    aria-hidden="true"
                  />
                  {isSelected && (
                    <FiCheck className="theme-orb-check" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>

          <button
            className="theme-picker-button"
            type="button"
            aria-label="Choose color theme"
            aria-expanded={isThemeMenuOpen}
            onClick={() => setIsThemeMenuOpen((current) => !current)}
          >
            <span className="appearance-current-swatch" aria-hidden="true" />
            <span className="appearance-current-label">
              {currentTheme.label}
            </span>
            <FiChevronDown
              className="theme-picker-chevron"
              aria-hidden="true"
            />
          </button>
        </div>

        <button
          className="theme-toggle-button"
          type="button"
          aria-label={
            appearanceMode === "light"
              ? "Switch to night mode"
              : "Switch to light mode"
          }
          title={
            appearanceMode === "light"
              ? "Switch to night mode"
              : "Switch to light mode"
          }
          onClick={onToggleAppearance}
        >
          {appearanceMode === "light" ? (
            <FiMoon aria-hidden="true" />
          ) : (
            <FiSun aria-hidden="true" />
          )}
        </button>

        <a
          className="resume-button"
          href={
            PORTFOLIO_PROFILE.resumeConfigured
              ? PORTFOLIO_PROFILE.resumeHref
              : "#contact"
          }
          aria-label={
            PORTFOLIO_PROFILE.resumeConfigured
              ? "Open Shahadat Sardar's current resume in a new tab"
              : "View resume availability details"
          }
          target={PORTFOLIO_PROFILE.resumeConfigured ? "_blank" : undefined}
          rel={
            PORTFOLIO_PROFILE.resumeConfigured
              ? "noreferrer noopener"
              : undefined
          }
        >
          {PORTFOLIO_PROFILE.resumeConfigured ? "Resume ↗" : "Resume soon"}
        </a>
      </div>
    </header>
  );
}
