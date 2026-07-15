import type { MouseEvent } from "react";

export type SectionId =
  | "home"
  | "work"
  | "story"
  | "experience"
  | "toolkit"
  | "contact";

export type SocialId = "linkedin" | "github" | "email";

export type GlassTheme = "aurora" | "frost" | "ash" | "emerald";

export type AppearanceMode = "light" | "dark";

export type PointerMode = "system" | "liquid" | "crystal" | "orbit";

export type NavigationItem = Readonly<{
  id: SectionId;
  label: string;
}>;

export type AppearanceTheme = Readonly<{
  id: GlassTheme;
  label: string;
  description: string;
}>;

export type NavigationHandler = (
  event: MouseEvent<HTMLAnchorElement>,
  section: SectionId
) => void;

export type ProjectLink = Readonly<{
  label: string;
  href: string;
  kind: "case-study" | "live" | "repository" | "internal";
  external?: boolean;
}>;

export type ProjectStatus = "released" | "active-build" | "concept" | "planned";

export type ProjectImage = Readonly<{
  src: string;
  alt: string;
}>;

export type ProjectDecision = Readonly<{
  title: string;
  rationale: string;
}>;

export type PortfolioProject = Readonly<{
  slug: string;
  title: string;
  eyebrow: string;
  projectType: string;
  summary: string;
  narrative: string;
  role: string;
  period: string;
  status: ProjectStatus;
  statusLabel: string;
  image: ProjectImage;
  problem: string;
  audience: readonly string[];
  scope: readonly string[];
  decisions: readonly ProjectDecision[];
  outcomes: readonly string[];
  nextSteps: readonly string[];
  stack: readonly string[];
  links: readonly ProjectLink[];
  disclaimer?: string;
  featured: boolean;
}>;

export type ExperienceStatus = "released" | "current" | "concept" | "learning";

export type ExperienceItem = Readonly<{
  organization: string;
  role: string;
  period: string;
  status: ExperienceStatus;
  statusLabel: string;
  summary: string;
  responsibilities: readonly string[];
  evidenceNote: string;
  technologies: readonly string[];
}>;

export type ToolkitConfidence = "in-project" | "practicing" | "exploring";

export type ToolkitItem = Readonly<{
  name: string;
  confidence: ToolkitConfidence;
  context: string;
}>;

export type ToolkitGroup = Readonly<{
  label: string;
  description: string;
  items: readonly ToolkitItem[];
}>;

export type EngineeringPrinciple = Readonly<{
  id: string;
  title: string;
  description: string;
  application: string;
}>;

export type ContactOption = Readonly<{
  id: SocialId | "resume" | "resume-drive";
  label: string;
  description: string;
  href: string;
  external: boolean;
  status: "ready" | "needs-configuration";
  statusLabel?: string;
}>;
