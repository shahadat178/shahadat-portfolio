import {
  FiCheckCircle,
  FiClock,
  FiCompass,
  FiLayers,
  FiShield,
  FiZap,
} from "react-icons/fi";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { EXPERIENCE_ITEMS, EXPERIENCE_SECTION } from "@/data/portfolio";
import styles from "@/components/sections/ExperienceSection.module.css";

const EXPERIENCE_STATUS_META = {
  released: { icon: FiCheckCircle, shortLabel: "Released product" },
  current: { icon: FiZap, shortLabel: "Active build" },
  concept: { icon: FiCompass, shortLabel: "Discovery" },
  learning: { icon: FiLayers, shortLabel: "Planned study" },
} as const;

export function ExperienceSection() {
  return (
    <section
      className={`${styles.section} portfolio-section experience-section`}
      id="experience"
      aria-labelledby="experience-title"
    >
      <SectionHeading
        eyebrow={EXPERIENCE_SECTION.eyebrow}
        title={EXPERIENCE_SECTION.title}
        description={EXPERIENCE_SECTION.description}
        titleId="experience-title"
      />

      <aside className="experience-proof-bar" aria-label="Experience evidence standard">
        <div className="experience-proof-intro">
          <span className="experience-proof-icon" aria-hidden="true">
            <FiShield />
          </span>
          <div>
            <p>Evidence standard</p>
            <strong>Scope, status, and limitations stay visible.</strong>
          </div>
        </div>

        <dl className="experience-proof-facts">
          <div>
            <dt>Documented tracks</dt>
            <dd>{String(EXPERIENCE_ITEMS.length).padStart(2, "0")}</dd>
          </div>
          <div>
            <dt>Released product</dt>
            <dd>01</dd>
          </div>
          <div>
            <dt>Active build</dt>
            <dd>01</dd>
          </div>
        </dl>
      </aside>

      {EXPERIENCE_ITEMS.length > 0 ? (
        <ol className="experience-timeline">
          {EXPERIENCE_ITEMS.map((experience, index) => {
            const titleId = `experience-${index + 1}-title`;
            const statusMeta = EXPERIENCE_STATUS_META[experience.status];
            const StatusIcon = statusMeta.icon;

            return (
              <li
                key={`${experience.organization}-${experience.role}-${experience.period}`}
                className="experience-timeline-item"
              >
                <article
                  aria-labelledby={titleId}
                  data-status={experience.status}
                >
                  <div className="experience-rail" aria-hidden="true">
                    <span className="experience-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="experience-marker">
                      <StatusIcon />
                    </span>
                  </div>

                  <div className="experience-content">
                    <header className="experience-header">
                      <div>
                        <div className="experience-meta-line">
                          <p className="experience-period">
                            <FiClock aria-hidden="true" />
                            {experience.period}
                          </p>
                          <span aria-hidden="true">•</span>
                          <p>{statusMeta.shortLabel}</p>
                        </div>
                        <h3 id={titleId}>{experience.role}</h3>
                        <p className="experience-organization">
                          {experience.organization}
                        </p>
                      </div>
                      <span className="experience-status">
                        <StatusIcon aria-hidden="true" />
                        {experience.statusLabel}
                      </span>
                    </header>

                    <p className="experience-summary">{experience.summary}</p>

                    <div className="experience-detail-grid">
                      <section aria-labelledby={`${titleId}-ownership`}>
                        <p
                          className="experience-detail-label"
                          id={`${titleId}-ownership`}
                        >
                          <FiCheckCircle aria-hidden="true" />
                          Ownership and decisions
                        </p>
                        <ul className="experience-responsibilities">
                          {experience.responsibilities.map((responsibility) => (
                            <li key={responsibility}>{responsibility}</li>
                          ))}
                        </ul>
                      </section>

                      <aside className="experience-evidence-note">
                        <span aria-hidden="true">
                          <FiShield />
                        </span>
                        <div>
                          <strong>Evidence boundary</strong>
                          <p>{experience.evidenceNote}</p>
                        </div>
                      </aside>
                    </div>

                    <footer className="experience-footer">
                      <p>Tools and focus</p>
                      <ul
                        className="experience-technologies"
                        aria-label={`${experience.role} technologies`}
                      >
                        {experience.technologies.map((technology) => (
                          <li key={technology}>{technology}</li>
                        ))}
                      </ul>
                    </footer>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="portfolio-section-empty-state">
          Verified experience details are being prepared for publication.
        </p>
      )}
    </section>
  );
}
