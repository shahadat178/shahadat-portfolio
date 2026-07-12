"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import {
  FiArrowUpRight,
  FiCheck,
  FiDownload,
  FiMail,
  FiMenu,
  FiMoon,
  FiSun,
  FiX,
} from "react-icons/fi";

import {
  APPEARANCE_THEMES,
  PORTFOLIO_PROFILE,
  SIDEBAR_NAVIGATION,
} from "@/data/portfolio";
import type {
  AppearanceMode,
  GlassTheme,
  NavigationHandler,
  SectionId,
} from "@/types/portfolio";

import styles from "./PortfolioMobileHeader.module.css";

type PortfolioMobileHeaderProps = {
  activeSection: SectionId;
  appearanceMode: AppearanceMode;
  glassTheme: GlassTheme;
  onNavigate: NavigationHandler;
  onThemeChange: (theme: GlassTheme) => void;
  onToggleAppearance: (event: MouseEvent<HTMLButtonElement>) => void;
};

export function PortfolioMobileHeader({
  activeSection,
  appearanceMode,
  glassTheme,
  onNavigate,
  onThemeChange,
  onToggleAppearance,
}: PortfolioMobileHeaderProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);

  function openMenu() {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      setIsMenuClosing(false);
      dialog.showModal();
      setIsMenuOpen(true);
    }
  }

  function closeMenu() {
    const dialog = dialogRef.current;

    if (!dialog?.open || isMenuClosing || closeTimerRef.current !== null) {
      return;
    }

    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (shouldReduceMotion) {
      dialog.close();
      return;
    }

    setIsMenuClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      dialog.close();
      closeTimerRef.current = null;
    }, 300);
  }

  function handleNavigation(
    event: MouseEvent<HTMLAnchorElement>,
    section: SectionId
  ) {
    onNavigate(event, section);
    closeMenu();
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      closeMenu();
    }
  }

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1081px)");

    function closeOnDesktop(event: MediaQueryListEvent) {
      if (event.matches && dialogRef.current?.open) {
        dialogRef.current.close();
      }
    }

    desktopQuery.addEventListener("change", closeOnDesktop);

    return () => {
      desktopQuery.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  return (
    <header className={styles.root}>
      <div className={styles.bar}>
        <a
          className={styles.brand}
          href="#home"
          aria-label="Go to Shahadat Sardar's introduction"
          onClick={(event) => handleNavigation(event, "home")}
        >
          <span
            className={styles.logo}
            data-appearance-mode={appearanceMode}
          >
            <Image
              className={`${styles.logoImage} ${styles.logoImageLight}`}
              src="/brand/shahadat-logo-dark.png"
              alt="Shahadat Sardar"
              width={150}
              height={58}
              priority
            />
            <Image
              className={`${styles.logoImage} ${styles.logoImageDark}`}
              src="/brand/shahadat-logo-white.png"
              alt=""
              aria-hidden="true"
              width={150}
              height={58}
              priority
            />
          </span>
        </a>

        <div className={styles.actions}>
          <button
            className={styles.iconButton}
            type="button"
            aria-label={
              appearanceMode === "light"
                ? "Switch to night mode"
                : "Switch to light mode"
            }
            aria-pressed={appearanceMode === "dark"}
            onClick={onToggleAppearance}
          >
            {appearanceMode === "light" ? (
              <FiMoon aria-hidden="true" />
            ) : (
              <FiSun aria-hidden="true" />
            )}
          </button>

          <button
            className={`${styles.iconButton} ${styles.menuButton}`}
            type="button"
            aria-label="Open portfolio menu"
            aria-controls="portfolio-mobile-menu"
            aria-expanded={isMenuOpen}
            onClick={openMenu}
          >
            <FiMenu aria-hidden="true" />
          </button>
        </div>
      </div>

      <dialog
        className={styles.dialog}
        id="portfolio-mobile-menu"
        ref={dialogRef}
        data-closing={isMenuClosing ? "true" : "false"}
        aria-labelledby="portfolio-mobile-menu-title"
        onClick={handleBackdropClick}
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => {
          if (closeTimerRef.current !== null) {
            window.clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
          }

          setIsMenuOpen(false);
          setIsMenuClosing(false);
        }}
      >
        <div className={styles.sheet}>
          <div className={styles.sheetHeader}>
            <div>
              <p className={styles.kicker}>PORTFOLIO MENU</p>
              <h2 id="portfolio-mobile-menu-title">
                {PORTFOLIO_PROFILE.name}
              </h2>
              <p className={styles.role}>{PORTFOLIO_PROFILE.role}</p>
            </div>

            <button
              className={styles.closeButton}
              type="button"
              aria-label="Close portfolio menu"
              onClick={closeMenu}
            >
              <FiX aria-hidden="true" />
            </button>
          </div>

          <nav className={styles.navigation} aria-label="Mobile navigation">
            {SIDEBAR_NAVIGATION.map((item) => (
              <a
                key={item.id}
                className={styles.navigationLink}
                data-active={activeSection === item.id ? "true" : "false"}
                href={`#${item.id}`}
                aria-current={
                  activeSection === item.id ? "location" : undefined
                }
                onClick={(event) => handleNavigation(event, item.id)}
              >
                <span>{item.label}</span>
                <FiArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </nav>

          <section className={styles.preferenceSection} aria-labelledby="mobile-theme-title">
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.kicker}>APPEARANCE</p>
                <h3 id="mobile-theme-title">Choose your atmosphere</h3>
              </div>

              <button
                className={styles.modeButton}
                type="button"
                aria-label={
                  appearanceMode === "light"
                    ? "Switch to night mode"
                    : "Switch to light mode"
                }
                aria-pressed={appearanceMode === "dark"}
                onClick={onToggleAppearance}
              >
                {appearanceMode === "light" ? (
                  <FiMoon aria-hidden="true" />
                ) : (
                  <FiSun aria-hidden="true" />
                )}
                <span>{appearanceMode === "light" ? "Night" : "Light"}</span>
              </button>
            </div>

            <div className={styles.themeGrid}>
              {APPEARANCE_THEMES.map((theme) => {
                const isSelected = glassTheme === theme.id;

                return (
                  <button
                    key={theme.id}
                    className={styles.themeChoice}
                    type="button"
                    data-selected={isSelected ? "true" : "false"}
                    aria-pressed={isSelected}
                    onClick={() => onThemeChange(theme.id)}
                  >
                    <span
                      className={styles.themeSwatch}
                      data-theme={theme.id}
                      aria-hidden="true"
                    />
                    <span>{theme.label}</span>
                    {isSelected && <FiCheck aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </section>

          <div className={styles.primaryActions}>
            <a
              className={styles.resumeButton}
              href={
                PORTFOLIO_PROFILE.resumeConfigured
                  ? PORTFOLIO_PROFILE.resumeHref
                  : "#contact"
              }
              onClick={closeMenu}
            >
              <FiDownload aria-hidden="true" />
              <span>
                {PORTFOLIO_PROFILE.resumeConfigured
                  ? "View resume"
                  : "Resume coming soon"}
              </span>
            </a>

            <div className={styles.socialLinks} aria-label="Social links">
              <a
                href={PORTFOLIO_PROFILE.linkedInUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Open Shahadat's LinkedIn profile"
              >
                <FaLinkedinIn aria-hidden="true" />
              </a>
              <a
                href={PORTFOLIO_PROFILE.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Open Shahadat's GitHub profile"
              >
                <FaGithub aria-hidden="true" />
              </a>
              <a
                href={PORTFOLIO_PROFILE.emailHref}
                aria-label="Send Shahadat an email"
              >
                <FiMail aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className={styles.availability}>
            <span className={styles.availabilityDot} aria-hidden="true" />
            <div>
              <strong>Available for new opportunities</strong>
              <span>Full-time roles and meaningful projects</span>
            </div>
          </div>
        </div>
      </dialog>
    </header>
  );
}
