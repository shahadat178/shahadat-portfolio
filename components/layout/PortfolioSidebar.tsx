"use client";

import Image from "next/image";
import { useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { FiArrowUpRight, FiMail } from "react-icons/fi";

import {
  PORTFOLIO_PROFILE,
  SIDEBAR_NAVIGATION,
} from "@/data/portfolio";
import type {
  AppearanceMode,
  NavigationHandler,
  SectionId,
  SocialId,
} from "@/types/portfolio";

type PortfolioSidebarProps = {
  activeSection: SectionId;
  appearanceMode: AppearanceMode;
  indicator: SectionId;
  onIndicatorChange: (section: SectionId) => void;
  onNavigate: NavigationHandler;
};

export function PortfolioSidebar({
  activeSection,
  appearanceMode,
  indicator,
  onIndicatorChange,
  onNavigate,
}: PortfolioSidebarProps) {
  const [socialIndicator, setSocialIndicator] =
    useState<SocialId>("linkedin");

  return (
    <aside className="left-rail lg-panel">
      <div className="brand-card">
        <div
          className="brand-logo"
          data-appearance-mode={appearanceMode}
        >
          <Image
            className="brand-logo-image brand-logo-image-light"
            src="/brand/shahadat-logo-dark.png"
            alt="Shahadat Sardar logo"
            width={180}
            height={70}
            priority
          />

          <Image
            className="brand-logo-image brand-logo-image-dark"
            src="/brand/shahadat-logo-white.png"
            alt=""
            aria-hidden="true"
            width={180}
            height={70}
            priority
          />
        </div>

        <h2>{PORTFOLIO_PROFILE.name}</h2>
        <p>{PORTFOLIO_PROFILE.role}</p>
      </div>

      <nav
        className="side-nav"
        aria-label="Sidebar navigation"
        data-active={indicator}
      >
        {SIDEBAR_NAVIGATION.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="nav-item"
            aria-current={activeSection === item.id ? "page" : undefined}
            onClick={(event) => onNavigate(event, item.id)}
            onMouseEnter={() => onIndicatorChange(item.id)}
            onFocus={() => onIndicatorChange(item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="quick-connect-card lg-card">
          <div className="sidebar-card-heading">
            <p className="quick-label">QUICK CONNECT</p>
            <span className="sidebar-card-sparkle" aria-hidden="true">
              ✦
            </span>
          </div>

          <p className="quick-connect-text">
            Let&apos;s connect and build something meaningful.
          </p>

          <div className="quick-links" data-active={socialIndicator}>
            <a
              className="social-link linkedin-link"
              href={PORTFOLIO_PROFILE.linkedInUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Open Shahadat's LinkedIn profile"
              onMouseEnter={() => setSocialIndicator("linkedin")}
              onFocus={() => setSocialIndicator("linkedin")}
            >
              <FaLinkedinIn aria-hidden="true" />
              <span>LinkedIn</span>
              <FiArrowUpRight className="social-arrow" aria-hidden="true" />
            </a>

            <a
              className="social-link github-link"
              href={PORTFOLIO_PROFILE.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Open Shahadat's GitHub profile"
              onMouseEnter={() => setSocialIndicator("github")}
              onFocus={() => setSocialIndicator("github")}
            >
              <FaGithub aria-hidden="true" />
              <span>GitHub</span>
              <FiArrowUpRight className="social-arrow" aria-hidden="true" />
            </a>

            <a
              className="social-link email-link"
              href={PORTFOLIO_PROFILE.emailHref}
              aria-label="Send Shahadat an email"
              onMouseEnter={() => setSocialIndicator("email")}
              onFocus={() => setSocialIndicator("email")}
            >
              <FiMail aria-hidden="true" />
              <span>Email</span>
              <FiArrowUpRight className="social-arrow" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="availability-card lg-card">
          <div className="availability-status">
            <span className="status-dot" aria-hidden="true" />
            <span className="status-pulse" aria-hidden="true" />
          </div>

          <div className="availability-content">
            <div className="availability-heading">
              <p className="availability-title">
                Available for new opportunities
              </p>
              <span className="availability-badge">OPEN</span>
            </div>

            <p className="availability-text">
              Open to full-time roles and exciting projects.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
