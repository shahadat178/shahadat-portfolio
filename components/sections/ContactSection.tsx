import Image from "next/image";
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
        <div className="contact-main">
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
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={PORTFOLIO_PROFILE.emailHref}>
                    {PORTFOLIO_PROFILE.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <address className="contact-options">
            {CONTACT_OPTIONS.map((option, index) =>
              option.status === "ready" ? (
                <a
                  className="contact-option"
                  key={option.id}
                  data-contact-option={option.id}
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
                  <span className="contact-option-trailing" aria-hidden="true">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <FiArrowUpRight />
                  </span>
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
                  {"statusLabel" in option &&
                  typeof option.statusLabel === "string" ? (
                    <em>{option.statusLabel}</em>
                  ) : null}
                </div>
              )
            )}
          </address>

          <p className="contact-configuration-note">
            <strong>Resume access:</strong> {CONTACT_SECTION.configurationNote}
          </p>
        </div>

        <figure className="contact-portrait">
          <span className="contact-portrait-orbit" aria-hidden="true" />
          <p className="contact-portrait-availability">
            <span aria-hidden="true" />
            Open to engineering opportunities
          </p>
          <Image
            className="contact-portrait-image"
            src="/images/profile/shahadat-sardar-contact.png"
            alt="Shahadat Sardar standing outdoors"
            width={899}
            height={1599}
            sizes="(max-width: 920px) 86vw, 34vw"
          />
          <figcaption className="contact-portrait-caption">
            <span>
              <strong>{PORTFOLIO_PROFILE.name}</strong>
              <small>{PORTFOLIO_PROFILE.role}</small>
            </span>
            <em>{PORTFOLIO_PROFILE.location}</em>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
