import {
  FiArrowDownRight,
  FiBookOpen,
  FiClock,
  FiDroplet,
  FiMousePointer,
  FiSmile,
  FiTool,
  FiZap,
} from "react-icons/fi";
import type { IconType } from "react-icons";

import { PORTFOLIO_STATS, SIDEBAR_NAVIGATION } from "@/data/portfolio";
import type {
  NavigationHandler,
  PointerMode,
  SectionId,
} from "@/types/portfolio";

const POINTER_MODES = [
  {
    id: "system",
    label: "System",
    detail: "Native",
    icon: FiMousePointer,
  },
  {
    id: "liquid",
    label: "Liquid",
    detail: "Fluid trail",
    icon: FiDroplet,
  },
  {
    id: "crystal",
    label: "Emoji",
    detail: "Falling trail",
    icon: FiSmile,
  },
  {
    id: "orbit",
    label: "Clock",
    detail: "Date + hands",
    icon: FiClock,
  },
] as const satisfies readonly {
  id: PointerMode;
  label: string;
  detail: string;
  icon: IconType;
}[];

const EVIDENCE_SIGNALS = [
  {
    id: "work",
    href: "#work",
    icon: FiBookOpen,
    label: "Project tracks",
    detail: "Released, active, and future work",
  },
  {
    id: "work",
    href: "#project-shahadat-engineering-portfolio",
    icon: FiZap,
    label: "Released product",
    detail: "Live engineering portfolio",
  },
  {
    id: "toolkit",
    href: "#toolkit",
    icon: FiTool,
    label: "Toolkit scope",
    detail: "Frontend through cloud",
  },
] as const satisfies readonly {
  id: SectionId;
  href: `#${string}`;
  icon: IconType;
  label: string;
  detail: string;
}[];

const REVIEW_CONTEXT: Record<
  SectionId,
  { title: string; description: string }
> = {
  home: {
    title: "Positioning and capability",
    description: "Engineering focus, product mindset, and the systems I aim to build.",
  },
  work: {
    title: "Projects and evidence",
    description: "Build status, technical decisions, constraints, and evidence behind the work.",
  },
  story: {
    title: "Product and systems mindset",
    description: "How I connect user intent, engineering choices, and continuous learning.",
  },
  experience: {
    title: "Ownership and build log",
    description: "What I owned, what exists today, and where the evidence boundary sits.",
  },
  toolkit: {
    title: "Technical depth",
    description: "Tools grouped by applied experience, current practice, and exploration.",
  },
  achievements: {
    title: "Credentials and continued learning",
    description:
      "Inspectable course records across algorithms, full-stack development, and structured web training.",
  },
  contact: {
    title: "Start a conversation",
    description: "Direct channels for engineering roles, collaboration, or project feedback.",
  },
};

type PortfolioInsightRailProps = {
  activeSection: SectionId;
  pointerMode: PointerMode;
  onNavigate: NavigationHandler;
  onPointerModeChange: (mode: PointerMode) => void;
};

export function PortfolioInsightRail({
  activeSection,
  pointerMode,
  onNavigate,
  onPointerModeChange,
}: PortfolioInsightRailProps) {
  const activeIndex = SIDEBAR_NAVIGATION.findIndex(
    (item) => item.id === activeSection
  );
  const currentStep = Math.max(activeIndex, 0) + 1;
  const progress = (currentStep / SIDEBAR_NAVIGATION.length) * 100;
  const nextItem =
    SIDEBAR_NAVIGATION[(currentStep % SIDEBAR_NAVIGATION.length)];
  const context = REVIEW_CONTEXT[activeSection];

  return (
    <aside className="right-rail" aria-label="Portfolio review assistant">
      <header className="rail-introduction">
        <p>Evidence index</p>
        <strong>Review the proof.</strong>
        <span>A clear map of the work, ownership, and technical depth.</span>
      </header>

      <div className="rail-stat-list">
        {PORTFOLIO_STATS.map((stat, index) => {
          const signal = EVIDENCE_SIGNALS[index];
          const StatIcon = signal.icon;

          return (
            <a
              className="rail-card"
              key={stat.label}
              href={signal.href}
              onClick={
                signal.href === `#${signal.id}`
                  ? (event) => onNavigate(event, signal.id)
                  : undefined
              }
              aria-label={`${stat.value} ${signal.label}: ${signal.detail}`}
            >
              <span className="rail-card-icon" aria-hidden="true">
                <StatIcon />
              </span>
              <div>
                <strong>{stat.value}</strong>
                <span>{signal.label}</span>
                <small>{signal.detail}</small>
              </div>
              <FiArrowDownRight className="rail-card-arrow" aria-hidden="true" />
            </a>
          );
        })}
      </div>

      <section className="rail-pointer-control" aria-labelledby="pointer-mode-title">
        <div className="rail-pointer-heading">
          <div>
            <p>Pointer mode</p>
            <strong id="pointer-mode-title">Choose your cursor effect</strong>
          </div>
          <span>Desktop</span>
        </div>

        <div className="rail-pointer-grid" aria-label="Pointer mode">
          {POINTER_MODES.map((mode) => {
            const ModeIcon = mode.icon;
            const isSelected = pointerMode === mode.id;

            return (
              <button
                key={mode.id}
                className="rail-pointer-option"
                type="button"
                aria-pressed={isSelected}
                data-selected={isSelected ? "true" : "false"}
                onClick={() => onPointerModeChange(mode.id)}
              >
                <span className="rail-pointer-icon" aria-hidden="true">
                  <ModeIcon />
                </span>
                <span>
                  <strong>{mode.label}</strong>
                  <small>{mode.detail}</small>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section
        className="rail-progress"
        aria-labelledby="rail-progress-title"
      >
        <div className="rail-progress-heading">
          <p>Review progress</p>
          <strong aria-label={`${currentStep} of ${SIDEBAR_NAVIGATION.length} sections`}>
            {String(currentStep).padStart(2, "0")}
            <span>/ {String(SIDEBAR_NAVIGATION.length).padStart(2, "0")}</span>
          </strong>
        </div>

        <div
          className="rail-progress-track"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={SIDEBAR_NAVIGATION.length}
          aria-valuenow={currentStep}
          aria-label="Portfolio review progress"
        >
          <span style={{ width: `${progress}%` }} />
        </div>

        <div className="rail-current-context">
          <span>Now reviewing</span>
          <strong id="rail-progress-title">{context.title}</strong>
          <p>{context.description}</p>
        </div>

        <a
          className="rail-next-step"
          href={`#${nextItem.id}`}
          onClick={(event) => onNavigate(event, nextItem.id)}
        >
          <span>{activeSection === "contact" ? "Return to" : "Up next"}</span>
          <strong>{nextItem.label}</strong>
          <FiArrowDownRight aria-hidden="true" />
        </a>
      </section>
    </aside>
  );
}
