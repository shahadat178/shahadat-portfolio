import { FiArrowRight, FiDownload } from "react-icons/fi";

import InteractiveBangladeshGlobe from "@/components/InteractiveBangladeshGlobe";
import { AnimatedHeroTitle } from "@/components/sections/AnimatedHeroTitle";
import { PORTFOLIO_PROFILE } from "@/data/portfolio";

export function HeroSection() {
  return (
    <section className="hero-placeholder" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-identity">
          <span>{PORTFOLIO_PROFILE.name}</span>
          <span aria-hidden="true">•</span>
          <span>{PORTFOLIO_PROFILE.role}</span>
        </p>

        <h1 id="hero-title">
          <span className="sr-only">
            I build reliable web products from interface to cloud.
          </span>
          <span className="hero-title-visual" aria-hidden="true">
            <span className="hero-title-prefix">I build</span>
            <AnimatedHeroTitle />
          </span>
        </h1>

        <p className="hero-text">
          From thoughtful interfaces and resilient APIs to cloud delivery, I
          turn product ideas into software people can trust.
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
          >
            <FiDownload aria-hidden="true" />
            {PORTFOLIO_PROFILE.resumeConfigured ? "Résumé" : "Résumé soon"}
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

      <div className="hero-visual" aria-label="Shahadat's global engineering perspective">
        <div className="orb-glow" aria-hidden="true" />
        <div className="hero-globe-stage">
          <InteractiveBangladeshGlobe compact />
        </div>
      </div>
    </section>
  );
}
