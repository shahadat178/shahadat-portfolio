import { SectionHeading } from "@/components/sections/SectionHeading";
import { TOOLKIT_GROUPS, TOOLKIT_SECTION } from "@/data/portfolio";
import type { ToolkitConfidence } from "@/types/portfolio";

const CONFIDENCE_LABELS: Readonly<Record<ToolkitConfidence, string>> = {
  "in-project": "Used in a project",
  practicing: "Actively practicing",
  exploring: "Currently exploring",
};

export function ToolkitSection() {
  return (
    <section
      className="portfolio-section toolkit-section"
      id="toolkit"
      aria-labelledby="toolkit-title"
    >
      <SectionHeading
        eyebrow={TOOLKIT_SECTION.eyebrow}
        title={TOOLKIT_SECTION.title}
        description={TOOLKIT_SECTION.description}
        titleId="toolkit-title"
      />

      <div className="toolkit-groups">
        {TOOLKIT_GROUPS.map((group) => (
          <article className="toolkit-group" key={group.label}>
            <header>
              <h3>{group.label}</h3>
              <p>{group.description}</p>
            </header>

            <ul className="toolkit-list">
              {group.items.map((item) => (
                <li key={item.name} data-confidence={item.confidence}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{CONFIDENCE_LABELS[item.confidence]}</span>
                  </div>
                  <p>{item.context}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
