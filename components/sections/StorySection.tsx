import { SectionHeading } from "@/components/sections/SectionHeading";
import { STORY_SECTION } from "@/data/portfolio";

const STORY_LENSES = [
  {
    label: "Product lens",
    title: "Start with the person and the constraint.",
    description:
      "I want the interface, workflow and technical plan to answer a real need, not simply demonstrate a framework.",
  },
  {
    label: "Systems lens",
    title: "Design the boundaries before adding complexity.",
    description:
      "Clear responsibilities, failure states and data flows make a product easier to operate, test and evolve.",
  },
  {
    label: "Learning lens",
    title: "Make progress visible and claims verifiable.",
    description:
      "This portfolio distinguishes active builds from concepts and records what exists, what I learned and what comes next.",
  },
] as const;

export function StorySection() {
  return (
    <section
      className="portfolio-section story-section"
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
          {STORY_SECTION.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="story-current-focus">
            <strong>Current focus:</strong> {STORY_SECTION.currentFocus}
          </p>
        </div>

        <ol
          className="story-lenses"
          aria-label="How I think about product engineering"
        >
          {STORY_LENSES.map((item, index) => (
            <li key={item.label}>
              <article>
                <div className="story-lens-meta">
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{item.label}</p>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
