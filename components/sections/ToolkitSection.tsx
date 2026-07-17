import { FiCloud, FiDatabase, FiGitBranch, FiMonitor } from "react-icons/fi";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { TOOLKIT_GROUPS, TOOLKIT_SECTION } from "@/data/portfolio";
import type { ToolkitConfidence } from "@/types/portfolio";

const CONFIDENCE_LABELS: Readonly<Record<ToolkitConfidence, string>> = {
  "in-project": "In project",
  practicing: "Practicing",
  exploring: "Exploring",
};

const CONFIDENCE_DETAILS = [
  {
    id: "in-project",
    label: "In project",
    description: "Visible in this codebase",
  },
  {
    id: "practicing",
    label: "Practicing",
    description: "Used in active learning loops",
  },
  {
    id: "exploring",
    label: "Exploring",
    description: "Building working foundations",
  },
] as const satisfies readonly {
  id: ToolkitConfidence;
  label: string;
  description: string;
}[];

const TOOLKIT_GROUP_ICONS = [
  FiMonitor,
  FiDatabase,
  FiCloud,
  FiGitBranch,
] as const;

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

      <div className="toolkit-confidence-legend">
        <div className="toolkit-confidence-copy">
          <p>Evidence model</p>
          <strong>How the labels work.</strong>
          <span>
            Current code, active practice, and exploration stay separate.
          </span>
        </div>

        <ul aria-label="Toolkit confidence levels">
          {CONFIDENCE_DETAILS.map((item) => (
            <li key={item.id} data-confidence={item.id}>
              <span aria-hidden="true" />
              <div>
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="toolkit-groups">
        {TOOLKIT_GROUPS.map((group, groupIndex) => {
          const GroupIcon = TOOLKIT_GROUP_ICONS[groupIndex];

          return (
            <article className="toolkit-group" key={group.label}>
              <header>
                <div className="toolkit-group-meta">
                  <span className="toolkit-group-icon" aria-hidden="true">
                    <GroupIcon />
                  </span>
                  <span className="toolkit-group-index">
                    {String(groupIndex + 1).padStart(2, "0")} /{" "}
                    {String(TOOLKIT_GROUPS.length).padStart(2, "0")}
                  </span>
                </div>

                <h3>{group.label}</h3>
                <p>{group.description}</p>
              </header>

              <ul className="toolkit-list">
                {group.items.map((item) => (
                  <li key={item.name} data-confidence={item.confidence}>
                    <div className="toolkit-item-heading">
                      <span className="toolkit-item-name">
                        <span className="toolkit-item-marker" aria-hidden="true" />
                        <strong>{item.name}</strong>
                      </span>
                      <span className="toolkit-confidence">
                        {CONFIDENCE_LABELS[item.confidence]}
                      </span>
                    </div>
                    <p>{item.context}</p>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
