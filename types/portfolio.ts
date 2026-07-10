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
}>;

export type PortfolioProject = Readonly<{
  slug: string;
  title: string;
  summary: string;
  role: string;
  period: string;
  challenge: string;
  approach: readonly string[];
  outcomes: readonly string[];
  technologies: readonly string[];
  links: readonly ProjectLink[];
  featured: boolean;
}>;

export type ExperienceItem = Readonly<{
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  summary: string;
  achievements: readonly string[];
  technologies: readonly string[];
}>;

export type ToolkitGroup = Readonly<{
  label: string;
  description: string;
  technologies: readonly string[];
}>;
