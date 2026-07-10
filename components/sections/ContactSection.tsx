import { FiArrowUpRight } from "react-icons/fi";

import { SectionHeading } from "@/components/sections/SectionHeading";
import {
  CONTACT_OPTIONS,
  CONTACT_SECTION,
  PORTFOLIO_PROFILE,
} from "@/data/portfolio";

export function ContactSection() {
  return (
    <section
      className="portfolio-section contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <SectionHeading
        eyebrow={CONTACT_SECTION.eyebrow}
        title={CONTACT_SECTION.title}
        description={CONTACT_SECTION.description}
        titleId="contact-title"
      />

      <div className="contact-layout">
        <div className="contact-introduction">
          <p className="contact-availability">
            <span className="contact-status-dot" aria-hidden="true" />
            {PORTFOLIO_PROFILE.availabilityLabel}
          </p>
          <p>{CONTACT_SECTION.availability}</p>

          <dl className="contact-facts">
            <div>
              <dt>Based in</dt>
              <dd>{PORTFOLIO_PROFILE.location}</dd>
            </div>
            <div>
              <dt>Work preference</dt>
              <dd>{PORTFOLIO_PROFILE.workPreference}</dd>
            </div>
          </dl>
        </div>

        <address className="contact-options">
          {CONTACT_OPTIONS.map((option) =>
            option.status === "ready" ? (
              <a
                className="contact-option"
                key={option.id}
                href={option.href}
                target={option.external ? "_blank" : undefined}
                rel={option.external ? "noreferrer noopener" : undefined}
                aria-label={
                  option.external
                    ? `${option.label} (opens in a new tab)`
                    : undefined
                }
              >
                <span>
                  <strong>{option.label}</strong>
                  <small>{option.description}</small>
                </span>
                <FiArrowUpRight aria-hidden="true" />
              </a>
            ) : (
              <div
                className="contact-option contact-option-unavailable"
                key={option.id}
              >
                <span>
                  <strong>{option.label}</strong>
                  <small>{option.description}</small>
                </span>
                {option.statusLabel ? <em>{option.statusLabel}</em> : null}
              </div>
            )
          )}
        </address>
      </div>

      <p className="contact-configuration-note">
        <strong>Launch note:</strong> {CONTACT_SECTION.configurationNote}
      </p>
    </section>
  );
}
