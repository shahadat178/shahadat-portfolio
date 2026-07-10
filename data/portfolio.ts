import type {
  AppearanceTheme,
  ExperienceItem,
  NavigationItem,
  PortfolioProject,
  ToolkitGroup,
} from "@/types/portfolio";

export const APPEARANCE_THEMES = [
  {
    id: "aurora",
    label: "Aurora",
    description: "Electric blue and violet",
  },
  {
    id: "frost",
    label: "Frost",
    description: "Silver-blue daylight",
  },
  {
    id: "ash",
    label: "Midnight Ash",
    description: "Graphite and navy",
  },
  {
    id: "emerald",
    label: "Emerald",
    description: "Teal and forest glass",
  },
] as const satisfies readonly AppearanceTheme[];

export const SIDEBAR_NAVIGATION = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "story", label: "Story" },
  { id: "experience", label: "Experience" },
  { id: "toolkit", label: "Toolkit" },
  { id: "contact", label: "Contact" },
] as const satisfies readonly NavigationItem[];

export const TOP_NAVIGATION = SIDEBAR_NAVIGATION.filter(
  (item) => item.id !== "home"
);

export const PORTFOLIO_PROFILE = {
  name: "Shahadat Sardar",
  role: "Full-Stack & Cloud Software Engineer",
  linkedInUrl: "https://www.linkedin.com/in/shahadat-sardar",
  githubUrl: "https://github.com/shahadat178",
  emailHref: "mailto:your-email@example.com",
  resumeHref: "/resume/shahadat-sardar-resume.pdf",
} as const;

export const PORTFOLIO_STATS = [
  { value: "3+", label: "Major Projects" },
  { value: "1+", label: "Years Experience" },
  { value: "100%", label: "Dedication" },
] as const;

// Content remains intentionally empty until it can be backed by real evidence.
// Each future entry should describe Shahadat's actual ownership and outcomes.
export const PORTFOLIO_PROJECTS: readonly PortfolioProject[] = [];

export const EXPERIENCE_ITEMS: readonly ExperienceItem[] = [];

export const TOOLKIT_GROUPS: readonly ToolkitGroup[] = [];
