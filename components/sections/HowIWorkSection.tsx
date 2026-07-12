import {
  FiCheckCircle,
  FiCompass,
  FiEye,
  FiLayers,
  FiRefreshCw,
} from "react-icons/fi";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { ENGINEERING_PRINCIPLES } from "@/data/portfolio";

const PRINCIPLE_META = [
  { label: "Clarify", icon: FiCompass },
  { label: "Evidence", icon: FiCheckCircle },
  { label: "Systems", icon: FiLayers },
  { label: "Access", icon: FiEye },
  { label: "Iterate", icon: FiRefreshCw },
] as const;

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

      <div className="principles-operating-model">
        <div className="principles-operating-copy">
          <p>Review loop</p>
          <strong>Intent → evidence → feedback.</strong>
          <span>
            A repeatable path from product ambiguity to a change another
            engineer can inspect, question, and improve.
          </span>
        </div>

        <ol className="principles-flow" aria-label="Engineering review loop">
          {PRINCIPLE_META.map((item, index) => {
            const Icon = item.icon;

            return (
              <li key={item.label}>
                <span className="principles-flow-icon" aria-hidden="true">
                  <Icon />
                </span>
                <span>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{item.label}</strong>
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <ol className="principles-grid">
        {ENGINEERING_PRINCIPLES.map((principle, index) => {
          const PrincipleIcon = PRINCIPLE_META[index].icon;

          return (
            <li key={principle.id}>
              <article>
                <header className="principle-card-header">
                  <span className="principle-card-icon" aria-hidden="true">
                    <PrincipleIcon />
                  </span>
                  <span className="principle-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </header>

                <p className="principle-stage">{PRINCIPLE_META[index].label}</p>
                <h3>{principle.title}</h3>
                <p className="principle-description">
                  {principle.description}
                </p>

                <div className="principle-application">
                  <strong>Applied as</strong>
                  <p>{principle.application}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
