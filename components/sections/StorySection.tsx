import {
  FiArrowUpRight,
  FiCompass,
  FiLayers,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { STORY_SECTION } from "@/data/portfolio";
import styles from "@/components/sections/StorySection.module.css";

const STORY_LENSES = [
  {
    label: "Product lens",
    shortLabel: "People first",
    icon: FiCompass,
    title: "Start with the person and the constraint.",
    description:
      "I want the interface, workflow and technical plan to answer a real need, not simply demonstrate a framework.",
  },
  {
    label: "Systems lens",
    shortLabel: "Whole system",
    icon: FiLayers,
    title: "Design the boundaries before adding complexity.",
    description:
      "Clear responsibilities, failure states and data flows make a product easier to operate, test and evolve.",
  },
  {
    label: "Learning lens",
    shortLabel: "Visible progress",
    icon: FiTrendingUp,
    title: "Make progress visible and claims verifiable.",
    description:
      "This portfolio distinguishes active builds from concepts and records what exists, what I learned and what comes next.",
  },
] as const;

export function StorySection() {
  return (
    <section
      className={`${styles.section} portfolio-section story-section`}
      id="story"
      aria-labelledby="story-title"
    >
      <SectionHeading
        eyebrow={STORY_SECTION.eyebrow}
        title={STORY_SECTION.title}
        description={STORY_SECTION.introduction}
        titleId="story-title"
      />

      <div className="story-layout">
        <div className="story-statement">
          <div className="story-statement-heading">
            <span aria-hidden="true">
              <FiCompass />
            </span>
            <div>
              <p>What shapes my approach</p>
              <strong>Build broadly. Explain precisely.</strong>
            </div>
          </div>

          <div className="story-narrative">
            {STORY_SECTION.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="story-current-focus">
            <span aria-hidden="true">
              <FiTarget />
            </span>
            <div>
              <p>Current direction</p>
              <strong>{STORY_SECTION.currentFocus}</strong>
            </div>
            <a href="#work" aria-label="See Shahadat's selected work">
              See the work
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <ol
          className="story-lenses"
          aria-label="How I think about product engineering"
        >
          {STORY_LENSES.map((item, index) => {
            const LensIcon = item.icon;

            return (
              <li key={item.label}>
                <article>
                  <div className="story-lens-icon" aria-hidden="true">
                    <LensIcon />
                  </div>

                  <div className="story-lens-content">
                    <div className="story-lens-meta">
                      <span aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p>{item.label}</p>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <span className="story-lens-signal" aria-hidden="true">
                    {item.shortLabel}
                  </span>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
