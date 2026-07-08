"use client";

import Image from "next/image";

import { useEffect, useRef, useState, type MouseEvent } from "react";

import { flushSync } from "react-dom";

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
  FiCheck,
  FiChevronDown,
  FiMail,
  FiMoon,
  FiSun,
} from "react-icons/fi";

type SectionId =
  | "home"
  | "work"
  | "story"
  | "experience"
  | "toolkit"
  | "contact";

type SocialId = "linkedin" | "github" | "email";

type GlassTheme = "aurora" | "frost" | "ash" | "emerald";
type AppearanceMode = "light" | "dark";


type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    finished: Promise<void>;
  };
};


type NavigationItem = {
  id: SectionId;
  label: string;
};

const appearanceThemes: {
  id: GlassTheme;
  label: string;
  description: string;
}[] = [
  {
    id: "aurora",
    label: "Aurora",
    description: "Electric blue and violet",
  },
  {
    id: "frost",
    label: "Frost",
    description: "Silver-blue daylight",
  },
  {
    id: "ash",
    label: "Midnight Ash",
    description: "Graphite and navy",
  },
  {
    id: "emerald",
    label: "Emerald",
    description: "Teal and forest glass",
  },
];

const sidebarNavigation: NavigationItem[] = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "story", label: "Story" },
  { id: "experience", label: "Experience" },
  { id: "toolkit", label: "Toolkit" },
  { id: "contact", label: "Contact" },
];

const topNavigation = sidebarNavigation.filter((item) => item.id !== "home");




export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [sidebarIndicator, setSidebarIndicator] =
    useState<SectionId>("home");
  const [topIndicator, setTopIndicator] = useState<SectionId>("work");
  const [socialIndicator, setSocialIndicator] =
    useState<SocialId>("linkedin");

  
    const [glassTheme, setGlassTheme] = useState<GlassTheme>("aurora");
  const [appearanceMode, setAppearanceMode] =
    useState<AppearanceMode>("light");

  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const topActionsRef = useRef<HTMLDivElement | null>(null);



  useEffect(() => {
    const loadStoredAppearance = window.setTimeout(() => {
      const savedTheme = window.localStorage.getItem(
        "portfolio-glass-theme"
      );

      const savedMode = window.localStorage.getItem(
        "portfolio-appearance-mode"
      );

      if (
        savedTheme === "aurora" ||
        savedTheme === "frost" ||
        savedTheme === "ash" ||
        savedTheme === "emerald"
      ) {
        setGlassTheme(savedTheme);
      }

      if (savedMode === "light" || savedMode === "dark") {
        setAppearanceMode(savedMode);
      }
    }, 0);

    return () => {
      window.clearTimeout(loadStoredAppearance);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.glassTheme = glassTheme;
    document.documentElement.dataset.glassMode = appearanceMode;

    window.localStorage.setItem("portfolio-glass-theme", glassTheme);
    window.localStorage.setItem(
      "portfolio-appearance-mode",
      appearanceMode
    );
  }, [glassTheme, appearanceMode]);


  useEffect(() => {
  if (!isThemeMenuOpen) {
    return;
  }

  function handlePointerDown(event: PointerEvent) {
    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    if (!topActionsRef.current?.contains(target)) {
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



  function handleNavigation(
    event: MouseEvent<HTMLAnchorElement>,
    section: SectionId
  ) {
    setActiveSection(section);
    setSidebarIndicator(section);
    setTopIndicator(section === "home" ? "work" : section);

    if (section === "home") {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      window.history.replaceState(null, "", "#home");
    }
  }

  function selectTheme(theme: GlassTheme) {
    setGlassTheme(theme);

    window.setTimeout(() => {
      setIsThemeMenuOpen(false);
    }, 460);
  }



  

function toggleAppearanceMode(event: MouseEvent<HTMLButtonElement>) {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();

  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  const revealRadius = Math.hypot(
    Math.max(originX, window.innerWidth - originX),
    Math.max(originY, window.innerHeight - originY)
  );

  const nextMode: AppearanceMode =
    appearanceMode === "light" ? "dark" : "light";

  const root = document.documentElement;

  root.style.setProperty("--appearance-reveal-x", `${originX}px`);
  root.style.setProperty("--appearance-reveal-y", `${originY}px`);
  root.style.setProperty(
    "--appearance-reveal-radius",
    `${revealRadius}px`
  );

  /*
    We keep this value during the animation.
    CSS uses it to decide whether the circle expands
    or reverses back into the button.
  */
  root.dataset.appearanceTransition = nextMode;

  const applyAppearance = () => {
    flushSync(() => {
      setAppearanceMode(nextMode);
    });
  };

  const transitionDocument = document as ViewTransitionDocument;
  const transition =
    transitionDocument.startViewTransition?.(applyAppearance);

  if (!transition) {
    applyAppearance();
    root.removeAttribute("data-appearance-transition");
    return;
  }

  transition.finished.finally(() => {
    root.removeAttribute("data-appearance-transition");
  });
}


  const currentTheme =
    appearanceThemes.find((theme) => theme.id === glassTheme) ??
    appearanceThemes[0];

  return (
    <main className="portfolio-shell">
      {/* =====================================================
          LEFT SIDEBAR
          ===================================================== */}
      <aside className="left-rail lg-panel">
        <div className="brand-card">


          <div
            className="brand-logo"
            data-appearance-mode={appearanceMode}>
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
                href="https://www.linkedin.com/in/shahadat-sardar"
                target="_blank"
                rel="noreferrer noopener"
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
                rel="noreferrer noopener"
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

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}
      <section className="main-content">
        <header className="top-bar" data-theme-menu-open={isThemeMenuOpen ? "true" : "false"}>
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
                {appearanceThemes.map((theme) => {
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
                        <FiCheck
                          className="theme-orb-check"
                          aria-hidden="true"
                        />
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
                <span
                  className="appearance-current-swatch"
                  aria-hidden="true"
                />

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
              onClick={toggleAppearanceMode}
            >
              {appearanceMode === "light" ? (
                <FiMoon aria-hidden="true" />
              ) : (
                <FiSun aria-hidden="true" />
              )}
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

          <div className="hero-visual">
            <div className="orb-glow" />

            <div className="workflow-scene">
              <span className="workflow-line workflow-line-1" />
              <span className="workflow-line workflow-line-2" />
              <span className="workflow-line workflow-line-3" />
              <span className="workflow-line workflow-line-4" />
              <span className="workflow-line workflow-line-5" />

              <InteractiveBangladeshGlobe />

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

              <div className="workflow-node workflow-node-bottom-right">
                <div className="workflow-node-icon workflow-node-icon-quality">
                  ✓
                </div>

                <div className="workflow-node-content">
                  <p className="workflow-node-title">
                    Quality &amp; Iteration
                  </p>
                  <p className="workflow-node-text">
                    Test • refine • improve
                  </p>
                </div>
              </div>

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
