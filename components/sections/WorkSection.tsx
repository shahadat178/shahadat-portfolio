import Image from "next/image";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiCompass,
  FiExternalLink,
  FiGitBranch,
  FiLayers,
  FiZap,
} from "react-icons/fi";

import { ProjectCaseStudyDisclosure } from "@/components/sections/ProjectCaseStudyDisclosure";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { PORTFOLIO_PROJECTS, WORK_SECTION } from "@/data/portfolio";
import type { PortfolioProject } from "@/types/portfolio";
import styles from "@/components/sections/WorkSection.module.css";

const PROJECT_ORDER = {
  "shahadat-engineering-portfolio": 0,
  "sardar-atelier": 1,
  "derma-aware": 2,
} as const;

const SELECTED_PROJECTS = [...PORTFOLIO_PROJECTS].sort(
  (first, second) => PROJECT_ORDER[first.slug] - PROJECT_ORDER[second.slug],
);

const PROJECT_STATUS_META = {
  released: { icon: FiCheckCircle, label: "Released" },
  "active-build": { icon: FiZap, label: "Building" },
  concept: { icon: FiCompass, label: "Research" },
  planned: { icon: FiClock, label: "Concept only" },
} as const;

const PROJECT_DISCLOSURE_COPY = {
  released: {
    scopeLabel: "Delivered scope",
    scopeTitle: "What I built",
    outcomesLabel: "Release evidence",
    outcomesTitle: "What shipped",
    nextLabel: "Post-release roadmap",
    nextTitle: "Future improvements",
  },
  "active-build": {
    scopeLabel: "Built so far",
    scopeTitle: "What is already defined",
    outcomesLabel: "In progress",
    outcomesTitle: "What is being implemented",
    nextLabel: "Proposed later",
    nextTitle: "What follows after the core build",
  },
  concept: {
    scopeLabel: "Research scope",
    scopeTitle: "What this concept would explore",
    outcomesLabel: "Defined so far",
    outcomesTitle: "Current concept boundaries",
    nextLabel: "Validation required",
    nextTitle: "Before any real-world use",
  },
  planned: {
    scopeLabel: "Research scope",
    scopeTitle: "What this concept would explore",
    outcomesLabel: "Defined so far",
    outcomesTitle: "Current concept boundaries",
    nextLabel: "Validation required",
    nextTitle: "Before any real-world use",
  },
} as const;

function ProjectStory({
  project,
  index,
}: Readonly<{ project: PortfolioProject; index: number }>) {
  const projectNumber = String(index + 1).padStart(2, "0");
  const statusMeta = PROJECT_STATUS_META[project.status];
  const StatusIcon = statusMeta.icon;
  const disclosureCopy = PROJECT_DISCLOSURE_COPY[project.status];

  return (
    <article
      className="project-story"
      id={`project-${project.slug}`}
      aria-labelledby={`project-${project.slug}-title`}
      data-status={project.status}
    >
      <figure className="project-visual">
        <a
          className="project-preview-link"
          href={project.image.src}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Open the full-resolution ${project.title} preview in a new tab`}
        >
          <Image
            className="project-image"
            src={project.image.src}
            alt={project.image.alt}
            width={1536}
            height={1024}
            sizes="(max-width: 700px) 94vw, (max-width: 1100px) 88vw, (max-width: 1640px) 68vw, 1120px"
            priority={index === 0}
            quality={90}
            draggable={false}
          />
          <span className="project-preview-action" aria-hidden="true">
            Full-resolution preview
            <FiExternalLink />
          </span>
        </a>
        <figcaption>
          <span>{project.projectType}</span>
          <span>
            <StatusIcon aria-hidden="true" />
            {project.statusLabel}
          </span>
        </figcaption>
      </figure>

      <div className="project-story-body">
        <div className="project-story-overview">
          <header className="project-story-header">
            <div className="project-story-meta">
              <span aria-hidden="true">{projectNumber}</span>
              <div>
                <p>{project.eyebrow}</p>
                <small>
                  <StatusIcon aria-hidden="true" />
                  {statusMeta.label}
                </small>
              </div>
            </div>

            <h3 id={`project-${project.slug}-title`}>{project.title}</h3>
            <p className="project-summary">{project.summary}</p>
          </header>

          <div className="project-story-evidence">
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

            <section
              className="project-evidence-preview"
              aria-labelledby={`project-${project.slug}-evidence`}
            >
              <p className="project-detail-label">Evidence snapshot</p>
              <h4 id={`project-${project.slug}-evidence`}>
                What can be verified
              </h4>
              <ul>
                {project.evidence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <ul className="project-chips" aria-label={`${project.title} signals`}>
          {project.chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>

        <ProjectCaseStudyDisclosure>
          <section aria-labelledby={`project-${project.slug}-overview`}>
            <p className="project-detail-label">Project context</p>
            <h4 id={`project-${project.slug}-overview`}>Why this work exists</h4>
            <p>{project.narrative}</p>
            <div className="project-context-grid">
              <div>
                <strong>The problem</strong>
                <p>{project.problem}</p>
              </div>
              <div>
                <strong>Designed for</strong>
                <ul>
                  {project.audience.map((audience) => (
                    <li key={audience}>{audience}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section aria-labelledby={`project-${project.slug}-scope`}>
            <p className="project-detail-label">
              <FiLayers aria-hidden="true" />
              {disclosureCopy.scopeLabel}
            </p>
            <h4 id={`project-${project.slug}-scope`}>
              {disclosureCopy.scopeTitle}
            </h4>
            <ul>
              {project.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby={`project-${project.slug}-decisions`}>
            <p className="project-detail-label">
              <FiGitBranch aria-hidden="true" />
              Decision record
            </p>
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
            <p className="project-detail-label">
              <FiCheckCircle aria-hidden="true" />
              {disclosureCopy.outcomesLabel}
            </p>
            <h4 id={`project-${project.slug}-outcomes`}>
              {disclosureCopy.outcomesTitle}
            </h4>
            <ul>
              {project.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby={`project-${project.slug}-next`}>
            <p className="project-detail-label">
              <FiClock aria-hidden="true" />
              {disclosureCopy.nextLabel}
            </p>
            <h4 id={`project-${project.slug}-next`}>
              {disclosureCopy.nextTitle}
            </h4>
            <ul>
              {project.nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby={`project-${project.slug}-technology`}>
            <p className="project-detail-label">
              <FiLayers aria-hidden="true" />
              Technical surface
            </p>
            <h4 id={`project-${project.slug}-technology`}>
              Technologies used or explicitly proposed
            </h4>
            <ul
              className="project-stack"
              aria-label={`${project.title} technology stack`}
            >
              {project.stack.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </section>
        </ProjectCaseStudyDisclosure>

        {project.disclaimer ? (
          <div className={styles.stackBlock}>
            <p className="project-disclaimer">
              <strong>Project note:</strong> {project.disclaimer}
            </p>
          </div>
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
      className={`${styles.section} portfolio-section work-section`}
      id="work"
      aria-labelledby="work-title"
    >
      <SectionHeading
        eyebrow={WORK_SECTION.eyebrow}
        title={WORK_SECTION.title}
        description={WORK_SECTION.description}
        titleId="work-title"
      />

      <nav className="work-project-index" aria-label="Selected project index">
        {SELECTED_PROJECTS.map((project, index) => {
          const statusMeta = PROJECT_STATUS_META[project.status];
          const StatusIcon = statusMeta.icon;

          return (
            <a key={project.slug} href={`#project-${project.slug}`}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <strong>{project.title}</strong>
                <small>
                  <StatusIcon aria-hidden="true" />
                  {project.statusLabel}
                </small>
              </div>
              {index === 0 ? (
                <FiCheckCircle aria-hidden="true" />
              ) : (
                <FiLayers aria-hidden="true" />
              )}
            </a>
          );
        })}
      </nav>

      <div className="project-story-list">
        {SELECTED_PROJECTS.map((project, index) => (
          <ProjectStory key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
