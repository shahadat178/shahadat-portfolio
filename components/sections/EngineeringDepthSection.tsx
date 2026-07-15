import {
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiCompass,
  FiGitBranch,
  FiLayers,
  FiShield,
  FiTarget,
} from "react-icons/fi";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { PORTFOLIO_PROJECTS } from "@/data/portfolio";
import styles from "@/components/sections/EngineeringDepthSection.module.css";

const DECISION_ICONS = [FiShield, FiLayers, FiCompass, FiGitBranch] as const;

export function EngineeringDepthSection() {
  const referenceProject =
    PORTFOLIO_PROJECTS.find(
      (project) => project.slug === "shahadat-engineering-portfolio",
    ) ??
    PORTFOLIO_PROJECTS[0];

  return (
    <section
      className={`${styles.section} portfolio-section depth-section`}
      id="engineering-depth"
      aria-labelledby="engineering-depth-title"
    >
      <SectionHeading
        eyebrow="Engineering depth"
        title="The visible interface is only one layer of the product."
        description="This decision record exposes the reasoning behind the released portfolio: the problem boundary, implementation choices, shipped evidence, and the next improvement cycle."
        titleId="engineering-depth-title"
      />

      {referenceProject ? (
        <article
          className="depth-case"
          aria-labelledby="engineering-depth-case-title"
        >
          <header className="depth-case-header">
            <div className="depth-case-identity">
              <span className="depth-case-icon" aria-hidden="true">
                <FiCode />
              </span>
              <div>
                <p>Decision record 01 · {referenceProject.projectType}</p>
                <h3 id="engineering-depth-case-title">
                  Inside {referenceProject.title}
                </h3>
              </div>
            </div>
            <span className="depth-status">
              <span aria-hidden="true" />
              {referenceProject.statusLabel}
            </span>
          </header>

          <dl className="depth-snapshot" aria-label="Decision record summary">
            <div>
              <dt>Architecture decisions</dt>
              <dd>{String(referenceProject.decisions.length).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>Evidence points</dt>
              <dd>{String(referenceProject.outcomes.length).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>Validation steps</dt>
              <dd>{String(referenceProject.nextSteps.length).padStart(2, "0")}</dd>
            </div>
          </dl>

          <div className="depth-problem">
            <span aria-hidden="true">
              <FiTarget />
            </span>
            <div>
              <p className="project-detail-label">System boundary</p>
              <strong>{referenceProject.problem}</strong>
            </div>
          </div>

          <ol className="depth-decision-list">
            {referenceProject.decisions.map((decision, index) => {
              const DecisionIcon =
                DECISION_ICONS[index % DECISION_ICONS.length];

              return (
                <li key={decision.title}>
                  <div className="depth-decision-topline">
                    <span className="depth-decision-icon" aria-hidden="true">
                      <DecisionIcon />
                    </span>
                    <span className="depth-decision-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h4>{decision.title}</h4>
                    <p>{decision.rationale}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="depth-evidence">
            <section aria-labelledby="engineering-evidence-title">
              <header>
                <span aria-hidden="true">
                  <FiCheckCircle />
                </span>
                <div>
                  <p>Verified in the released product</p>
                  <h4 id="engineering-evidence-title">Evidence shipped</h4>
                </div>
              </header>
              <ul>
                {referenceProject.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="engineering-next-title">
              <header>
                <span aria-hidden="true">
                  <FiClock />
                </span>
                <div>
                  <p>Post-release work, stated clearly</p>
                  <h4 id="engineering-next-title">Next improvement cycle</h4>
                </div>
              </header>
              <ul>
                {referenceProject.nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </section>
          </div>

          <footer className="depth-stack">
            <div>
              <p>Implementation surface</p>
              <strong>Technologies visible or proposed in this record</strong>
            </div>
            <ul aria-label="Engineering depth technologies">
              {referenceProject.stack.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
            <a href="#work" aria-label="Open the complete portfolio case study">
              Full case study
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </footer>
        </article>
      ) : (
        <p className="portfolio-section-empty-state">
          The first engineering decision record is being prepared.
        </p>
      )}
    </section>
  );
}
