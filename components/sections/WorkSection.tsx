import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { PORTFOLIO_PROJECTS, WORK_SECTION } from "@/data/portfolio";
import type { PortfolioProject } from "@/types/portfolio";

function ProjectStory({
  project,
  index,
}: Readonly<{ project: PortfolioProject; index: number }>) {
  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <article
      className="project-story"
      id={`project-${project.slug}`}
      aria-labelledby={`project-${project.slug}-title`}
      data-status={project.status}
    >
      <figure className="project-visual">
        <Image
          className="project-image"
          src={project.image.src}
          alt={project.image.alt}
          width={1440}
          height={960}
          sizes="(max-width: 920px) 100vw, (max-width: 1640px) 72vw, 52vw"
        />
        <figcaption>
          <span>{project.projectType}</span>
          <span>{project.statusLabel}</span>
        </figcaption>
      </figure>

      <div className="project-story-body">
        <header className="project-story-header">
          <div className="project-story-meta">
            <span aria-hidden="true">{projectNumber}</span>
            <p>{project.eyebrow}</p>
          </div>

          <h3 id={`project-${project.slug}-title`}>{project.title}</h3>
          <p className="project-summary">{project.summary}</p>
          <p className="project-narrative">{project.narrative}</p>
        </header>

        <dl className="project-facts">
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>{project.period}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{project.statusLabel}</dd>
          </div>
        </dl>

        <div className="project-story-grid">
          <section aria-labelledby={`project-${project.slug}-problem`}>
            <p className="project-detail-label">The problem</p>
            <h4 id={`project-${project.slug}-problem`}>
              What this project needs to solve
            </h4>
            <p>{project.problem}</p>
          </section>

          <section aria-labelledby={`project-${project.slug}-audience`}>
            <p className="project-detail-label">Designed for</p>
            <h4 id={`project-${project.slug}-audience`}>
              People and contexts
            </h4>
            <ul>
              {project.audience.map((audience) => (
                <li key={audience}>{audience}</li>
              ))}
            </ul>
          </section>
        </div>

        <details className="project-case-study">
          <summary>Explore the case-study outline</summary>

          <div className="project-case-study-content">
            <section aria-labelledby={`project-${project.slug}-scope`}>
              <p className="project-detail-label">Scope</p>
              <h4 id={`project-${project.slug}-scope`}>What I am building</h4>
              <ul>
                {project.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby={`project-${project.slug}-decisions`}>
              <p className="project-detail-label">Decision record</p>
              <h4 id={`project-${project.slug}-decisions`}>
                Engineering choices and rationale
              </h4>
              <dl className="project-decisions">
                {project.decisions.map((decision) => (
                  <div key={decision.title}>
                    <dt>{decision.title}</dt>
                    <dd>{decision.rationale}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby={`project-${project.slug}-outcomes`}>
              <p className="project-detail-label">Current evidence</p>
              <h4 id={`project-${project.slug}-outcomes`}>
                What exists today
              </h4>
              <ul>
                {project.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby={`project-${project.slug}-next`}>
              <p className="project-detail-label">Next iteration</p>
              <h4 id={`project-${project.slug}-next`}>What comes next</h4>
              <ul>
                {project.nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </section>
          </div>
        </details>

        <ul
          className="project-stack"
          aria-label={`${project.title} technology stack`}
        >
          {project.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        {project.disclaimer ? (
          <p className="project-disclaimer">
            <strong>Project note:</strong> {project.disclaimer}
          </p>
        ) : null}

        {project.links.length > 0 ? (
          <nav className="project-links" aria-label={`${project.title} links`}>
            {project.links.map((link) => (
              <a
                key={`${link.label}-${link.href}`}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer noopener" : undefined}
                aria-label={
                  link.external
                    ? `${link.label} (opens in a new tab)`
                    : undefined
                }
              >
                {link.label}
                <FiArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </article>
  );
}

export function WorkSection() {
  return (
    <section
      className="portfolio-section work-section"
      id="work"
      aria-labelledby="work-title"
    >
      <SectionHeading
        eyebrow={WORK_SECTION.eyebrow}
        title={WORK_SECTION.title}
        description={WORK_SECTION.description}
        titleId="work-title"
      />

      <div className="project-story-list">
        {PORTFOLIO_PROJECTS.map((project, index) => (
          <ProjectStory key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
