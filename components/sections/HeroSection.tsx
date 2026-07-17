import { FaBrain, FaNodeJs, FaReact } from "react-icons/fa6";
import { FiArrowRight, FiArrowUpRight, FiCheck } from "react-icons/fi";

import InteractiveBangladeshGlobe from "@/components/InteractiveBangladeshGlobe";
import { PORTFOLIO_PROFILE } from "@/data/portfolio";

export function HeroSection() {
  return (
    <section className="hero-placeholder" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-identity">
          <span>I&apos;m {PORTFOLIO_PROFILE.name}</span>
          <span aria-hidden="true">•</span>
          <span>{PORTFOLIO_PROFILE.role}</span>
        </p>

        <h1 id="hero-title">
          <span className="sr-only">
            I build reliable web products from interface to cloud.
          </span>
          <span className="hero-title-visual" aria-hidden="true">
            <span className="hero-title-prefix">I build</span>
            <span className="hero-phrase-window">
              <span className="hero-phrase">
                reliable web products from interface to cloud.
              </span>
            </span>
          </span>
        </h1>

        <p className="hero-text">
          Thoughtful interfaces, resilient systems, and clear delivery for
          products people can trust.
        </p>

        <div className="hero-actions">
          <a className="hero-primary-action" href="#work">
            View selected work
            <FiArrowRight aria-hidden="true" />
          </a>

          <a
            className="hero-resume-link"
            href={
              PORTFOLIO_PROFILE.resumeConfigured
                ? PORTFOLIO_PROFILE.resumeHref
                : "#contact"
            }
            target={PORTFOLIO_PROFILE.resumeConfigured ? "_blank" : undefined}
            rel={
              PORTFOLIO_PROFILE.resumeConfigured
                ? "noreferrer noopener"
                : undefined
            }
          >
            <FiArrowUpRight aria-hidden="true" />
            {PORTFOLIO_PROFILE.resumeConfigured
              ? "View resume"
              : "Resume soon"}
          </a>
        </div>

        <div className="hero-meta" aria-label="Location and availability">
          <span className="hero-availability">
            <span className="hero-status-dot" aria-hidden="true" />
            Available for meaningful opportunities
          </span>
          <span className="hero-location">Dhaka · Remote</span>
        </div>
      </div>

      <div
        className="hero-visual"
        aria-label="Shahadat's global engineering perspective"
      >
        <div className="orb-glow" aria-hidden="true" />
        <div className="workflow-scene">
          <span className="workflow-line workflow-line-1" aria-hidden="true" />
          <span className="workflow-line workflow-line-2" aria-hidden="true" />
          <span className="workflow-line workflow-line-3" aria-hidden="true" />
          <span className="workflow-line workflow-line-4" aria-hidden="true" />
          <span className="workflow-line workflow-line-5" aria-hidden="true" />

          <InteractiveBangladeshGlobe />

          <article className="workflow-node workflow-node-top-left">
            <span
              className="workflow-node-icon workflow-node-icon-product"
              aria-hidden="true"
            >
              ✦
            </span>
            <div className="workflow-node-content">
              <p className="workflow-node-title">Product Thinking</p>
              <p className="workflow-node-text">Problem → UX → solution</p>
            </div>
          </article>

          <article className="workflow-node workflow-node-top-right">
            <span
              className="workflow-node-icon workflow-node-icon-react"
              aria-hidden="true"
            >
              <FaReact />
            </span>
            <div className="workflow-node-content">
              <p className="workflow-node-title">Frontend Craft</p>
              <p className="workflow-node-text">
                React · Next.js · UI systems
              </p>
            </div>
          </article>

          <article className="workflow-node workflow-node-right">
            <span
              className="workflow-node-icon workflow-node-icon-node"
              aria-hidden="true"
            >
              <FaNodeJs />
            </span>
            <div className="workflow-node-content">
              <p className="workflow-node-title">Backend &amp; Cloud</p>
              <p className="workflow-node-text">
                APIs · deployment · scalability
              </p>
            </div>
          </article>

          <article className="workflow-node workflow-node-bottom-right">
            <span
              className="workflow-node-icon workflow-node-icon-quality"
              aria-hidden="true"
            >
              <FiCheck />
            </span>
            <div className="workflow-node-content">
              <p className="workflow-node-title">Quality &amp; Iteration</p>
              <p className="workflow-node-text">Test · refine · improve</p>
            </div>
          </article>

          <article className="workflow-node workflow-node-bottom-left">
            <span
              className="workflow-node-icon workflow-node-icon-systems"
              aria-hidden="true"
            >
              <FaBrain />
            </span>
            <div className="workflow-node-content">
              <p className="workflow-node-title">Systems Mindset</p>
              <p className="workflow-node-text">Reliable · clear · connected</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
