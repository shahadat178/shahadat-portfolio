"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";

import InteractiveBangladeshGlobe from "../components/InteractiveBangladeshGlobe";

import {
  FaBrain,
  FaGithub,
  FaLinkedinIn,
  FaNodeJs,
  FaReact,
} from "react-icons/fa6";

import {
  FiArrowRight,
  FiArrowUpRight,
  FiMail,
} from "react-icons/fi";

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
 * Main portfolio homepage.
 *
 * Navigation behavior:
 * - Hover moves each navigation indicator independently.
 * - Click synchronizes sidebar and top navigation indicators.
 * - CSS handles smooth anchor scrolling between page sections.
 */
export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const [sidebarIndicator, setSidebarIndicator] =
    useState<SectionId>("home");

  const [topIndicator, setTopIndicator] = useState<SectionId>("work");

  const [socialIndicator, setSocialIndicator] =
    useState<SocialId>("linkedin");


function handleNavigation(
  event: MouseEvent<HTMLAnchorElement>,
  section: SectionId
) {
  setActiveSection(section);
  setSidebarIndicator(section);

  // Top navigation has no Home item, so Work is the visual fallback.
  setTopIndicator(section === "home" ? "work" : section);

  /*
    Home should always return to the true top of the portfolio,
    not just the hero section's current anchor offset.
  */
  if (section === "home") {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    window.history.replaceState(null, "", "#home");
  }
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
              onClick={(event) => handleNavigation(event, item.id)}
              onMouseEnter={() => setSidebarIndicator(item.id)}
              onFocus={() => setSidebarIndicator(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* =====================================================
            QUICK CONNECT + AVAILABILITY
            ===================================================== */}
        <div className="sidebar-bottom">
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
                target="_blank"
                rel="noreferrer"
                aria-label="Open Shahadat's LinkedIn profile"
                onMouseEnter={() => setSocialIndicator("linkedin")}
                onFocus={() => setSocialIndicator("linkedin")}
              >
                <FaLinkedinIn aria-hidden="true" />
                <span>LinkedIn</span>
                <FiArrowUpRight
                  className="social-arrow"
                  aria-hidden="true"
                />
              </a>

              <a
                className="social-link github-link"
                href="https://github.com/shahadat178"
                target="_blank"
                rel="noreferrer"
                aria-label="Open Shahadat's GitHub profile"
                onMouseEnter={() => setSocialIndicator("github")}
                onFocus={() => setSocialIndicator("github")}
              >
                <FaGithub aria-hidden="true" />
                <span>GitHub</span>
                <FiArrowUpRight
                  className="social-arrow"
                  aria-hidden="true"
                />
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
                <FiArrowUpRight
                  className="social-arrow"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

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
                onClick={(event) => handleNavigation(event, item.id)}
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
          <div className="hero-copy">
            <p className="eyebrow">
              FULL-STACK &amp; CLOUD SOFTWARE ENGINEER
            </p>

            <h1>
              I build digital
              <span> experiences that feel effortless.</span>
            </h1>

            <p className="hero-text">
              I design and build reliable web products that turn complex
              workflows into clear, fast, and delightful experiences.
            </p>

            <div className="hero-actions">
              <a className="hero-primary-action" href="#work">
                Explore my work
                <FiArrowRight aria-hidden="true" />
              </a>

              <a className="hero-secondary-action" href="#contact">
                Let&apos;s connect
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>

            <div className="hero-stack" aria-label="Core technology stack">
              <span>Next.js</span>
              <span>React</span>
              <span>Node.js</span>
              <span>AWS</span>
            </div>
          </div>

          {/* =====================================================
              CONNECTED SS ENGINEERING VISUAL
              ===================================================== */}
          <div className="hero-visual" >
            <div className="orb-glow" />

            <div className="workflow-scene">
              <span className="workflow-line workflow-line-1" />
              <span className="workflow-line workflow-line-2" />
              <span className="workflow-line workflow-line-3" />
              <span className="workflow-line workflow-line-4" />
              <span className="workflow-line workflow-line-5" />




              {/* Main Shahadat Sardar identity orb */}
              
              <InteractiveBangladeshGlobe />



              {/* Product thinking workflow */}
              <div className="workflow-node workflow-node-top-left">
                <div className="workflow-node-icon workflow-node-icon-product">
                  ✦
                </div>

                <div className="workflow-node-content">
                  <p className="workflow-node-title">Product Thinking</p>
                  <p className="workflow-node-text">
                    Problem → UX → solution
                  </p>
                </div>
              </div>

              {/* Frontend engineering workflow */}
              <div className="workflow-node workflow-node-top-right">
                <div className="workflow-node-icon workflow-node-icon-react">
                  <FaReact aria-hidden="true" />
                </div>

                <div className="workflow-node-content">
                  <p className="workflow-node-title">Frontend Craft</p>
                  <p className="workflow-node-text">
                    React • Next.js • UI systems
                  </p>
                </div>
              </div>

              {/* Backend and cloud workflow */}
              <div className="workflow-node workflow-node-right">
                <div className="workflow-node-icon workflow-node-icon-node">
                  <FaNodeJs aria-hidden="true" />
                </div>

                <div className="workflow-node-content">
                  <p className="workflow-node-title">Backend &amp; Cloud</p>
                  <p className="workflow-node-text">
                    APIs • deployment • scalability
                  </p>
                </div>
              </div>

              {/* QA and improvement workflow */}
              <div className="workflow-node workflow-node-bottom-right">
                <div className="workflow-node-icon workflow-node-icon-quality">
                  ✓
                </div>

                <div className="workflow-node-content">
                  <p className="workflow-node-title">Quality &amp; Iteration</p>
                  <p className="workflow-node-text">
                    Test • refine • improve
                  </p>
                </div>
              </div>

              {/* Systems thinking workflow */}
              <div className="workflow-node workflow-node-bottom-left">
                <div className="workflow-node-icon workflow-node-icon-systems">
                  <FaBrain aria-hidden="true" />
                </div>

                <div className="workflow-node-content">
                  <p className="workflow-node-title">Systems Mindset</p>
                  <p className="workflow-node-text">
                    Reliable • clear • connected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FUTURE PORTFOLIO SECTIONS
            ===================================================== */}
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
