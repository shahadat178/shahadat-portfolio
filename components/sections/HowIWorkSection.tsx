import { SectionHeading } from "@/components/sections/SectionHeading";
import { ENGINEERING_PRINCIPLES } from "@/data/portfolio";

export function HowIWorkSection() {
  return (
    <section
      className="portfolio-section principles-section"
      id="how-i-work"
      aria-labelledby="how-i-work-title"
    >
      <SectionHeading
        eyebrow="How I work"
        title="Principles that turn ambition into reviewable engineering."
        description="These are working standards, not claims of perfection. Each one defines how I want to make product decisions and how another engineer should be able to review them."
        titleId="how-i-work-title"
      />

      <ol className="principles-grid">
        {ENGINEERING_PRINCIPLES.map((principle, index) => (
          <li key={principle.id}>
            <article>
              <span className="principle-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
              <p className="principle-application">
                <strong>In practice:</strong> {principle.application}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
