import { SectionHeading } from "@/components/sections/SectionHeading";
import { PORTFOLIO_PROJECTS } from "@/data/portfolio";

export function EngineeringDepthSection() {
  const referenceProject =
    PORTFOLIO_PROJECTS.find((project) => project.status === "active-build") ??
    PORTFOLIO_PROJECTS[0];

  return (
    <section
      className="portfolio-section depth-section"
      id="engineering-depth"
      aria-labelledby="engineering-depth-title"
    >
      <SectionHeading
        eyebrow="Engineering depth"
        title="The visible interface is only one layer of the product."
        description="This decision record exposes the reasoning behind an active build: the problem boundary, implementation choices, evidence available today and the next validation step."
        titleId="engineering-depth-title"
      />

      {referenceProject ? (
        <article
          className="depth-case"
          aria-labelledby="engineering-depth-case-title"
        >
          <header className="depth-case-header">
            <div>
              <p>{referenceProject.projectType}</p>
              <h3 id="engineering-depth-case-title">
                Inside {referenceProject.title}
              </h3>
            </div>
            <span>{referenceProject.statusLabel}</span>
          </header>

          <div className="depth-problem">
            <p className="project-detail-label">System boundary</p>
            <p>{referenceProject.problem}</p>
          </div>

          <ol className="depth-decision-list">
            {referenceProject.decisions.map((decision, index) => (
              <li key={decision.title}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4>{decision.title}</h4>
                  <p>{decision.rationale}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="depth-evidence">
            <section aria-labelledby="engineering-evidence-title">
              <h4 id="engineering-evidence-title">Evidence available now</h4>
              <ul>
                {referenceProject.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="engineering-next-title">
              <h4 id="engineering-next-title">Next validation steps</h4>
              <ul>
                {referenceProject.nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      ) : (
        <p className="portfolio-section-empty-state">
          The first engineering decision record is being prepared.
        </p>
      )}
    </section>
  );
}
