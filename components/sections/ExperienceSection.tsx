import { SectionHeading } from "@/components/sections/SectionHeading";
import { EXPERIENCE_ITEMS, EXPERIENCE_SECTION } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <section
      className="portfolio-section experience-section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <SectionHeading
        eyebrow={EXPERIENCE_SECTION.eyebrow}
        title={EXPERIENCE_SECTION.title}
        description={EXPERIENCE_SECTION.description}
        titleId="experience-title"
      />

      {EXPERIENCE_ITEMS.length > 0 ? (
        <ol className="experience-timeline">
          {EXPERIENCE_ITEMS.map((experience, index) => {
            const titleId = `experience-${index + 1}-title`;

            return (
              <li
                key={`${experience.organization}-${experience.role}-${experience.period}`}
                className="experience-timeline-item"
              >
                <article
                  aria-labelledby={titleId}
                  data-status={experience.status}
                >
                  <div className="experience-marker" aria-hidden="true" />

                  <div className="experience-content">
                    <header className="experience-header">
                      <div>
                        <p className="experience-period">{experience.period}</p>
                        <h3 id={titleId}>{experience.role}</h3>
                        <p className="experience-organization">
                          {experience.organization}
                        </p>
                      </div>
                      <span className="experience-status">
                        {experience.statusLabel}
                      </span>
                    </header>

                    <p className="experience-summary">{experience.summary}</p>

                    <ul className="experience-responsibilities">
                      {experience.responsibilities.map((responsibility) => (
                        <li key={responsibility}>{responsibility}</li>
                      ))}
                    </ul>

                    <p className="experience-evidence-note">
                      <strong>Evidence note:</strong> {experience.evidenceNote}
                    </p>

                    <ul
                      className="experience-technologies"
                      aria-label={`${experience.role} technologies`}
                    >
                      {experience.technologies.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
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
