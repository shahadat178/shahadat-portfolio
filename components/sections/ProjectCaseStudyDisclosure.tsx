"use client";

import { useId, useState, type ReactNode } from "react";
import { FiShield } from "react-icons/fi";

type ProjectCaseStudyDisclosureProps = Readonly<{
  children: ReactNode;
  defaultOpen?: boolean;
}>;

export function ProjectCaseStudyDisclosure({
  children,
  defaultOpen = false,
}: ProjectCaseStudyDisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const reactId = useId();
  const contentId = `project-case-study-${reactId.replaceAll(":", "")}`;

  return (
    <div className="project-case-study" data-open={isOpen ? "true" : "false"}>
      <button
        className="project-case-study-trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span>
          <FiShield aria-hidden="true" />
          Engineering case study
        </span>
        <small>{isOpen ? "Collapse record" : "Expand record"}</small>
      </button>

      <div
        className="project-case-study-reveal"
        id={contentId}
        aria-hidden={!isOpen}
      >
        <div className="project-case-study-reveal-inner">
          <div className="project-case-study-content">{children}</div>
        </div>
      </div>
    </div>
  );
}
