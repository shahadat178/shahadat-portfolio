"use client";

import Image from "next/image";
import { useState } from "react";

import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { FiArrowUpRight, FiMail } from "react-icons/fi";

type SectionId =
  | "home"
  | "work"
  | "story"
  | "experience"
  | "toolkit"
  | "contact";

  type SocialId = "linkedin" | "github" | "email";

type NavigationItem = {
  id: SectionId;
  label: string;
};

const sidebarNavigation: NavigationItem[] = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "story", label: "Story" },
  { id: "experience", label: "Experience" },
  { id: "toolkit", label: "Toolkit" },
  { id: "contact", label: "Contact" },
];

const topNavigation = sidebarNavigation.filter((item) => item.id !== "home");

/**
 * Portfolio homepage navigation behavior:
 *
 * - Hover changes only the navigation area being hovered.
 * - The latest hovered item remains visually selected.
 * - Click updates the real active section and syncs both navigation areas.
 * - Anchor links provide smooth scrolling through global CSS.
 */
export default function Home() {
  // Actual selected page section after a click.
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  // Sidebar liquid-glass indicator position.
  const [sidebarIndicator, setSidebarIndicator] =
    useState<SectionId>("home");

  // Top navigation has no Home link, so Work is the initial visual position.
  const [topIndicator, setTopIndicator] = useState<SectionId>("work");

  const [socialIndicator, setSocialIndicator] =
  useState<SocialId>("linkedin");

  /**
   * A click means the user selected a real page section.
   * Both navigation indicators should then stay synchronized.
   */
  function handleNavigation(section: SectionId) {
    setActiveSection(section);
    setSidebarIndicator(section);

    // Top navigation does not include Home, so keep its pill on Work.
    setTopIndicator(section === "home" ? "work" : section);
  }

  return (
    <main className="portfolio-shell">
      {/* =====================================================
          LEFT SIDEBAR
          ===================================================== */}
      <aside className="left-rail">
        <div className="brand-card">
          <div className="brand-logo">
            <Image
              src="/brand/shahadat-logo-dark.png"
              alt="Shahadat Sardar logo"
              width={180}
              height={70}
              priority
            />
          </div>

          <h2>Shahadat Sardar</h2>
          <p>Full-Stack &amp; Cloud Software Engineer</p>
        </div>

        {/* Sidebar hover affects only the sidebar indicator. */}
        <nav
          className="side-nav"
          aria-label="Sidebar navigation"
          data-active={sidebarIndicator}
        >
          {sidebarNavigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-item"
              aria-current={activeSection === item.id ? "page" : undefined}
              onClick={() => handleNavigation(item.id)}
              onMouseEnter={() => setSidebarIndicator(item.id)}
              onFocus={() => setSidebarIndicator(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="sidebar-bottom">
  {/* Bright liquid-glass social connection panel */}
  <div className="quick-connect-card">
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
    href="https://www.linkedin.com/in/shahadat-sardar"
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
    href="https://github.com/shahadat178"
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
    href="mailto:your-email@example.com"
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

  {/* Bright liquid-glass availability panel */}
  <div className="availability-card">
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

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}
      <section className="main-content">
        <header className="top-bar">
          {/* Top hover affects only the top navigation indicator. */}
          <nav
            className="top-dock"
            aria-label="Primary navigation"
            data-active={topIndicator}
          >
            {topNavigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="top-nav-link"
                aria-current={activeSection === item.id ? "page" : undefined}
                onClick={() => handleNavigation(item.id)}
                onMouseEnter={() => setTopIndicator(item.id)}
                onFocus={() => setTopIndicator(item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="top-actions">
            <button
              className="theme-toggle-button"
              type="button"
              aria-label="Switch to night mode"
              title="Switch to night mode"
            >
              <span aria-hidden="true">☀</span>
            </button>

            <a
              className="resume-button"
              href="/resume/shahadat-sardar-resume.pdf"
              aria-label="Download Shahadat Sardar's resume"
            >
              Resume ↓
            </a>
          </div>
        </header>

        {/* =====================================================
            HERO
            ===================================================== */}
        <section className="hero-placeholder" id="home">
          <p className="eyebrow">
            FULL-STACK &amp; CLOUD-FOCUSED SOFTWARE ENGINEER
          </p>

          <h1>
            Hi, I’m <br />
            <span>Shahadat Sardar</span>
          </h1>

          <p className="hero-text">
            I build reliable web products that turn complex workflows into
            simple, delightful experiences.
          </p>
        </section>

        {/* Future portfolio sections */}
        <section id="work" aria-label="Selected work" />
        <section id="story" aria-label="Engineering story" />
        <section id="experience" aria-label="Experience timeline" />
        <section id="toolkit" aria-label="Technical toolkit" />
        <section id="contact" aria-label="Contact Shahadat" />
      </section>

      {/* =====================================================
          RIGHT INSIGHT RAIL
          ===================================================== */}
      <aside className="right-rail" aria-label="Career summary">
        <div className="rail-card">
          <p className="rail-label">AT A GLANCE</p>
          <strong>3+</strong>
          <span>Major Projects</span>
        </div>

        <div className="rail-card">
          <strong>1+</strong>
          <span>Years Experience</span>
        </div>

        <div className="rail-card">
          <strong>100%</strong>
          <span>Dedication</span>
        </div>
      </aside>
    </main>
  );
}