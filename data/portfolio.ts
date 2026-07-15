import type {
  AchievementCredential,
  AppearanceTheme,
  ContactOption,
  EngineeringPrinciple,
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
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const satisfies readonly NavigationItem[];

export const TOP_NAVIGATION = SIDEBAR_NAVIGATION.filter(
  (item) => item.id !== "home"
);

export const PORTFOLIO_PROFILE = {
  name: "Shahadat Sardar",
  role: "Full-Stack & Cloud Software Engineer",
  shortRole: "Product-minded software engineer",
  headline: "I turn product ideas into clear, reliable digital experiences.",
  introduction:
    "I work across interface, application, and cloud layers, with a growing focus on thoughtful systems and measurable product value.",
  location: "Dhaka, Bangladesh",
  workPreference: "Open to suitable engineering conversations",
  availabilityLabel: "Open to engineering opportunities",
  availabilityDetail:
    "Interested in teams that value product thinking, engineering fundamentals, and continuous learning.",
  linkedInUrl: "https://www.linkedin.com/in/shahadat-sardar",
  githubUrl: "https://github.com/shahadat178",
  email: "shahadatsardar73@gmail.com",
  emailHref: "mailto:shahadatsardar73@gmail.com",
  emailConfigured: true,
  resumeHref:
    "https://docs.google.com/document/d/1X2tlhmAi6izrvLUzo9TX6EI8iHlSi6wq/edit?usp=sharing",
  resumeDownloadHref:
    "https://docs.google.com/document/d/1X2tlhmAi6izrvLUzo9TX6EI8iHlSi6wq/export?format=pdf",
  resumeConfigured: true,
} as const;

export const PORTFOLIO_STATS = [
  { value: "03", label: "Product case studies" },
  { value: "01", label: "Released product" },
  { value: "04", label: "Toolkit domains" },
] as const;

export const WORK_SECTION = {
  eyebrow: "Selected work",
  title: "Three products. Three different trust problems.",
  description:
    "The engineering portfolio is released, the commerce platform remains the active full-stack build, and the skin-health product stays a deliberately later research track until safety, clinical review, privacy, and inclusive validation come first.",
} as const;

export const PORTFOLIO_PROJECTS = [
  {
    slug: "shahadat-engineering-portfolio",
    title: "Shahadat — Engineering Portfolio",
    eyebrow: "01 / Released product",
    projectType: "Portfolio platform · Design system",
    summary:
      "A responsive engineering portfolio that brings identity, product reasoning, implementation detail, and technical work into one coherent experience.",
    narrative:
      "What started as a single landing page became a production-ready portfolio system with reusable sections, typed content, responsive navigation, theme and pointer preferences, accessible disclosures, and a resilient interactive globe.",
    role: "Independent product engineer and designer",
    period: "Released in 2026",
    status: "released",
    statusLabel: "Production release",
    image: {
      src: "/images/projects/shahadat-engineering-portfolio-v3.png",
      alt: "High-resolution responsive views of the Shahadat engineering portfolio across desktop and mobile devices",
    },
    problem:
      "Visitors need to understand who I am, what I build, how I make technical decisions, and where to find the relevant work without searching through a dense page.",
    audience: [
      "Recruiters and hiring teams",
      "Engineering leaders",
      "Potential collaborators",
    ],
    scope: [
      "Information architecture and task-focused content hierarchy",
      "Responsive shell, navigation, and section system",
      "Theme-aware visual language and reusable glass surfaces",
      "Accessible interaction, reduced-motion behavior, and touch targets",
      "Interactive globe used as a supporting identity detail",
    ],
    decisions: [
      {
        title: "Make the work easy to inspect",
        rationale:
          "Project scope, ownership, technical decisions, and build status stay close to each case study.",
      },
      {
        title: "Build one responsive system",
        rationale:
          "Shared layout rules and deliberate breakpoints are easier to maintain than a separate mobile imitation.",
      },
      {
        title: "Keep motion supportive",
        rationale:
          "Animation reinforces hierarchy and identity while reduced-motion preferences preserve comfort and clarity.",
      },
      {
        title: "Separate content from presentation",
        rationale:
          "Typed project and profile data lets future case studies evolve without coupling copy to components.",
      },
    ],
    outcomes: [
      "Delivered a reusable portfolio shell with dedicated layout and section components.",
      "Implemented responsive navigation, four visual themes, pointer preferences, active-section tracking, and accessible interaction states.",
      "Separated project, experience, toolkit, profile, and contact content into a typed data model.",
      "Completed lint, type, production-build, responsive, zoom, and interaction verification before release.",
    ],
    nextSteps: [
      "Monitor real production performance and runtime behavior after deployment.",
      "Add automated regression coverage for navigation, themes, disclosures, and responsive layout states.",
      "Refresh the evidence and screenshots as the commerce case study becomes an implemented product.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "CSS Modules",
      "Three.js",
      "react-globe.gl",
    ],
    links: [
      {
        label: "View live portfolio",
        href: "https://shahadat-engineering-portfolio.vercel.app",
        kind: "live",
        external: true,
      },
    ],
    featured: true,
  },
  {
    slug: "derma-aware",
    title: "DermaAware",
    eyebrow: "03 / Future research track",
    projectType: "Skin-health education · Care navigation",
    summary:
      "A privacy-conscious skin-health companion designed to help people document concerns, learn from reviewed information, and prepare for appropriate professional care.",
    narrative:
      "People often search alarming image results or receive overconfident automated answers when they are worried about a skin concern. DermaAware explores a safer path: organize observations, communicate uncertainty, surface reviewed guidance, and make professional care easier to approach.",
    role: "Product discovery and full-stack systems planning",
    period: "Scheduled after the commerce build",
    status: "planned",
    statusLabel: "Future research · Not launched",
    image: {
      src: "/images/projects/derma-aware.webp",
      alt: "Concept interface for a calm and inclusive skin-health education and care-navigation product",
    },
    problem:
      "People need understandable skin-health information, but a consumer interface must not turn uncertainty into a diagnosis or delay qualified medical care.",
    audience: [
      "People documenting a skin concern",
      "Patients preparing for a clinical conversation",
      "Clinicians or reviewers validating future content",
    ],
    scope: [
      "Guided observation journal with change-over-time notes",
      "Inclusive educational content designed for varied skin tones",
      "Care-navigation prompts and appointment-preparation summaries",
      "Consent, retention, export, and deletion controls for sensitive images",
      "Content governance and clinician-review workflow before release",
    ],
    decisions: [
      {
        title: "Education, never diagnosis",
        rationale:
          "The concept avoids disease predictions and uses clear uncertainty language so it cannot be mistaken for clinical judgment.",
      },
      {
        title: "Escalation over reassurance",
        rationale:
          "Potential warning signs would route to reviewed care guidance, not an automated claim that a concern is safe.",
      },
      {
        title: "Privacy before image intelligence",
        rationale:
          "Explicit consent, minimal collection, secure storage, deletion, and auditability are prerequisites for any photo workflow.",
      },
      {
        title: "Design for representation",
        rationale:
          "Research and future validation must include different skin tones, languages, accessibility needs, and levels of health literacy.",
      },
    ],
    outcomes: [
      "Defined a non-diagnostic product boundary and the language needed to communicate it.",
      "Mapped a core journey from private observation to a better-prepared professional-care conversation.",
      "Documented the research required for clinical review, inclusion, privacy, safety, and accessibility.",
      "Kept diagnosis, treatment, and clinical-accuracy claims outside the planned product boundary.",
    ],
    nextSteps: [
      "Review the problem and content model with qualified dermatology and safety professionals.",
      "Conduct inclusive user research before deciding which features should exist.",
      "Complete privacy, security, and regulatory risk assessments before accepting health data.",
      "Prototype and usability-test the journal and care-preparation journey without diagnostic output.",
    ],
    stack: [
      "Next.js (proposed)",
      "TypeScript (proposed)",
      "Node.js (proposed)",
      "PostgreSQL (proposed)",
      "Private object storage (proposed)",
      "AWS delivery controls (proposed)",
    ],
    links: [],
    disclaimer:
      "Concept only. DermaAware would provide general education and care-navigation support, not diagnosis, treatment, emergency assessment, or a substitute for a qualified healthcare professional.",
    featured: true,
  },
  {
    slug: "sardar-atelier",
    title: "Shahadat Zenith Commerce",
    eyebrow: "02 / Active full-stack build",
    projectType: "Premium lifestyle brand · Full-stack commerce",
    summary:
      "A premium full-stack marketplace extending Shahadat's identity into a responsive shopping experience across fashion, gadgets, beauty, skincare, and everyday essentials.",
    narrative:
      "Premium commerce depends on more than polished product cards. Shahadat Zenith is being built as one coherent brand and product system where discovery, catalogue data, accounts, cart, checkout, payments, fulfilment, and support reinforce the same customer promise.",
    role: "Independent full-stack product engineer and brand designer",
    period: "Current build",
    status: "active-build",
    statusLabel: "Under active construction",
    image: {
      src: "/images/projects/sardar-atelier.webp",
      alt: "Responsive Shahadat Zenith premium e-commerce experience across desktop and mobile layouts",
    },
    problem:
      "A new fashion identity needs to earn trust without existing brand recognition while keeping a large catalogue easy to explore and purchase on any device.",
    audience: [
      "Style-conscious women and men shopping across lifestyle categories",
      "Mobile-first returning customers",
      "Merchandising and fulfilment teams",
    ],
    scope: [
      "Logo-derived identity, typography, colour, photography, and motion direction",
      "Women, men, new-arrival, collection, and accessories discovery journeys",
      "Search, filtering, sizing, variants, wishlists, cart, and checkout",
      "Customer accounts, order status, returns, and support touchpoints",
      "Catalogue, inventory, promotion, editorial, and order-management foundations",
    ],
    decisions: [
      {
        title: "Make the logo a system",
        rationale:
          "The existing mark becomes a source for proportions, contrast, packaging, and interaction details rather than a decoration placed on top.",
      },
      {
        title: "Merchandise without trapping people",
        rationale:
          "Women, men, and collection paths support familiar discovery while search and product attributes remain flexible and inclusive.",
      },
      {
        title: "Treat performance as luxury",
        rationale:
          "Responsive imagery, progressive loading, stable layouts, and a focused checkout protect the premium experience on real mobile networks.",
      },
      {
        title: "Design operations with the storefront",
        rationale:
          "Inventory, content, fulfilment, returns, and support flows shape the customer promise and belong in the architecture from the beginning.",
      },
    ],
    outcomes: [
      "Created the responsive desktop and mobile storefront direction shown in this case study.",
      "Defined brand, navigation, category, trust, membership, and merchandising surfaces.",
      "Mapped full-stack catalogue, account, cart, checkout, payment, order, and fulfilment responsibilities now being implemented.",
      "Specified catalogue, inventory, checkout, payment, order, fulfilment, and returns boundaries for implementation.",
    ],
    nextSteps: [
      "Finish catalogue, search, filtering, product-detail, wishlist, cart, and account flows.",
      "Implement secure checkout, payment, order, inventory, and fulfilment boundaries.",
      "Prepare representative catalogue data and connect editorial content management.",
      "Run accessibility, performance, security, and cross-device validation before release.",
    ],
    stack: [
      "Next.js (proposed)",
      "TypeScript (proposed)",
      "Headless commerce API (proposed)",
      "PostgreSQL (proposed)",
      "Stripe (proposed)",
      "Headless CMS and CDN (proposed)",
    ],
    links: [],
    featured: true,
  },
] as const satisfies readonly PortfolioProject[];

export const STORY_SECTION = {
  eyebrow: "My story",
  title: "I build to understand the whole system.",
  introduction:
    "I am Shahadat Sardar, an early-career full-stack and cloud engineer using independent product work to connect thoughtful interfaces, resilient application logic, and reliable delivery.",
  paragraphs: [
    "My path is being shaped through hands-on builds. Each project helps me understand how interface decisions, application logic, data, accessibility, delivery, and operations influence one another.",
    "I am drawn to teams where strong fundamentals, thoughtful feedback, and useful customer outcomes matter more than technology for its own sake.",
  ],
  currentFocus:
    "Using this released portfolio as the evidence foundation while turning the commerce concept into the next implemented full-stack product.",
} as const;

export const EXPERIENCE_SECTION = {
  eyebrow: "Experience and build log",
  title: "Ownership described without inflated titles.",
  description:
    "These entries represent independent project work and structured learning. They do not imply employment, launch success, or business results that have not been verified.",
} as const;

export const EXPERIENCE_ITEMS = [
  {
    organization: "Independent portfolio product",
    role: "Product engineer and designer",
    period: "Released in 2026",
    status: "released",
    statusLabel: "Released portfolio",
    summary:
      "Delivered a responsive and maintainable engineering portfolio that makes product reasoning, implementation evidence, and project boundaries easy to inspect.",
    responsibilities: [
      "Defined the information architecture, evidence hierarchy, and typed content model.",
      "Built the responsive shell, navigation, themes, motion system, cursor preferences, and interactive globe.",
      "Verified lint, types, production compilation, cross-device behavior, zoom resilience, and accessible interaction states.",
    ],
    evidenceNote:
      "Implementation evidence is available through the live product and its structured case study; hiring outcomes are not claimed.",
    technologies: ["Next.js", "React", "TypeScript", "CSS Modules", "Three.js"],
  },
  {
    organization: "Independent health-product discovery",
    role: "Responsible product and systems exploration",
    period: "Concept phase",
    status: "concept",
    statusLabel: "Research required",
    summary:
      "Defining a non-diagnostic skin-health education and care-navigation concept with safety, inclusion, and privacy as constraints.",
    responsibilities: [
      "Separate educational support from diagnosis and treatment claims.",
      "Map consent, sensitive-data, content-review, and escalation requirements.",
      "Prepare research questions for users and qualified clinical reviewers.",
    ],
    evidenceNote:
      "This is planning work only; it has not been clinically validated, launched, or used for care.",
    technologies: [
      "Product discovery",
      "Privacy modelling",
      "Accessibility planning",
      "Full-stack architecture",
    ],
  },
  {
    organization: "Independent commerce systems study",
    role: "Brand, experience, and architecture planning",
    period: "Planned build",
    status: "learning",
    statusLabel: "Learning roadmap",
    summary:
      "Using a proposed premium fashion brand to study how storefront experience, catalogue data, payments, and operations work as one system.",
    responsibilities: [
      "Translate an existing personal identity into a coherent proposed brand system.",
      "Model discovery, product, cart, checkout, account, and post-purchase journeys.",
      "Plan performance, accessibility, inventory, content, and fulfilment quality gates.",
    ],
    evidenceNote:
      "Architecture and delivery choices remain proposals until requirements and prototypes are validated.",
    technologies: [
      "Next.js",
      "Commerce architecture",
      "Payments research",
      "Cloud delivery planning",
    ],
  },
] as const satisfies readonly ExperienceItem[];

export const TOOLKIT_SECTION = {
  eyebrow: "Toolkit",
  title: "Tools are useful when they support a decision.",
  description:
    "Confidence labels distinguish technology visible in the current codebase from skills being practised or explored for future concepts.",
} as const;

export const TOOLKIT_GROUPS = [
  {
    label: "Product interface",
    description:
      "Responsive, accessible interfaces with reusable components and deliberate interaction states.",
    items: [
      {
        name: "React",
        confidence: "in-project",
        context: "Component composition and interactive client experiences",
      },
      {
        name: "Next.js",
        confidence: "in-project",
        context: "Application structure, routing, rendering, and asset delivery",
      },
      {
        name: "TypeScript",
        confidence: "in-project",
        context: "Typed content, component contracts, and safer refactoring",
      },
      {
        name: "CSS and responsive design",
        confidence: "in-project",
        context: "Fluid layout, design tokens, themes, and device adaptation",
      },
      {
        name: "Accessibility",
        confidence: "practicing",
        context: "Semantic structure, keyboard flow, touch targets, and reduced motion",
      },
    ],
  },
  {
    label: "Application and data",
    description:
      "Clear contracts and dependable data flows behind the interface.",
    items: [
      {
        name: "Node.js",
        confidence: "practicing",
        context: "Server-side JavaScript and application service fundamentals",
      },
      {
        name: "API design",
        confidence: "practicing",
        context: "Resource boundaries, validation, errors, and client contracts",
      },
      {
        name: "SQL and PostgreSQL",
        confidence: "exploring",
        context: "Relational modelling for health journals and commerce domains",
      },
      {
        name: "Authentication and privacy",
        confidence: "exploring",
        context: "Identity, authorization, consent, and sensitive-data boundaries",
      },
    ],
  },
  {
    label: "Cloud and delivery",
    description:
      "Learning how products remain deployable, observable, secure, and efficient after implementation.",
    items: [
      {
        name: "AWS",
        confidence: "exploring",
        context: "Compute, storage, delivery, access control, and deployment patterns",
      },
      {
        name: "CI/CD",
        confidence: "practicing",
        context: "Repeatable lint, type, build, test, and deployment checks",
      },
      {
        name: "Performance",
        confidence: "practicing",
        context: "Loading strategy, image delivery, stable layouts, and runtime cost",
      },
      {
        name: "Observability",
        confidence: "exploring",
        context: "Logs, metrics, traces, alerts, and product feedback loops",
      },
    ],
  },
  {
    label: "Quality and collaboration",
    description:
      "Small feedback loops that make changes understandable and reversible.",
    items: [
      {
        name: "Git and GitHub",
        confidence: "in-project",
        context: "Scoped changes, reviewable history, and repository evidence",
      },
      {
        name: "ESLint and type checks",
        confidence: "in-project",
        context: "Automated static feedback before integration",
      },
      {
        name: "Testing strategy",
        confidence: "practicing",
        context: "Choosing unit, integration, interaction, and end-to-end checks by risk",
      },
      {
        name: "Technical communication",
        confidence: "practicing",
        context: "Documenting assumptions, trade-offs, status, and next steps",
      },
    ],
  },
] as const satisfies readonly ToolkitGroup[];

export const ACHIEVEMENTS_SECTION = {
  eyebrow: "Achievements & certificates",
  title: "Learning backed by inspectable credentials.",
  description:
    "Three completion records spanning algorithms, full-stack development, and an 80-hour instructor-led web development program.",
} as const;

export const ACHIEVEMENT_CREDENTIALS = [
  {
    id: "edge-web-development-essentials",
    index: "01",
    title: "Web Development Essentials",
    track: "Instructor-led training",
    issuer: "EDGE Project · Bangladesh Computer Council · ICT Division",
    provider: "Department of CSE, Jagannath University",
    description:
      "Completed a structured web development program delivered through the EDGE Digital Skills Training initiative.",
    period: "Sep 2024 – Mar 2025",
    issued: "16 Jun 2025",
    duration: "80 hours",
    credentialId: "EDGE-DSTS-106-2418-00024",
    certificateHref: "/certificates/edge-certificate.pdf",
    previewSrc: "/certificates/edge-web-development-essentials.webp",
    previewAlt:
      "EDGE Web Development Essentials certificate awarded to Shahadat Sardar",
    validationHref: "https://training.edge.gov.bd/certificate-validation",
    validationLabel: "Validate with EDGE",
    highlights: [
      "Web development foundations",
      "Structured instructor-led practice",
      "Official serial-number validation",
    ],
  },
  {
    id: "apna-college-delta-full-stack",
    index: "02",
    title: "Full Stack Web Development",
    track: "Delta program",
    issuer: "Apna College",
    description:
      "Completed the Delta full-stack web development course and its guided implementation curriculum.",
    credentialId: "68a36e13b4c7000a0e00a8a8",
    certificateHref: "/certificates/apna-college-delta-certificate.pdf",
    previewSrc: "/certificates/apna-college-delta-full-stack.webp",
    previewAlt:
      "Apna College Delta Full Stack Web Development certificate awarded to Shahadat Sardar",
    highlights: [
      "Frontend development",
      "Backend foundations",
      "End-to-end application practice",
    ],
  },
  {
    id: "apna-college-alpha-dsa",
    index: "03",
    title: "Data Structures & Algorithms with Java",
    track: "Alpha program",
    issuer: "Apna College",
    description:
      "Completed the Alpha data structures and algorithms course using Java as the implementation language.",
    certificateHref: "/certificates/apna-college-alpha-dsa-certificate.pdf",
    previewSrc: "/certificates/apna-college-alpha-dsa.webp",
    previewAlt:
      "Apna College Alpha Data Structures and Algorithms with Java certificate awarded to Shahadat Sardar",
    highlights: [
      "Data structures",
      "Algorithmic problem solving",
      "Java implementation practice",
    ],
  },
] as const satisfies readonly AchievementCredential[];

export const ENGINEERING_PRINCIPLES = [
  {
    id: "clarity-before-novelty",
    title: "Clarity before novelty",
    description:
      "A visitor or teammate should understand the purpose before noticing the technique.",
    application:
      "Use strong hierarchy, plain language, predictable controls, and motion only where it helps comprehension.",
  },
  {
    id: "evidence-over-claims",
    title: "Evidence over claims",
    description:
      "Honest status, concrete decisions, and inspectable work build more trust than inflated numbers.",
    application:
      "Label concepts as concepts, separate proposed stacks from implemented ones, and never invent outcomes.",
  },
  {
    id: "systems-not-screens",
    title: "Systems, not isolated screens",
    description:
      "The interface, data, delivery, operations, and customer promise are parts of the same product.",
    application:
      "Model the complete journey and its failure states before optimizing a single surface.",
  },
  {
    id: "accessibility-as-baseline",
    title: "Accessibility is a baseline",
    description:
      "Keyboard, touch, contrast, motion, semantics, and readable content belong in the definition of done.",
    application:
      "Design inclusive interaction states early and verify them alongside responsive behavior.",
  },
  {
    id: "small-feedback-loops",
    title: "Work in small feedback loops",
    description:
      "Good engineering reduces uncertainty through reviewable changes and proportional validation.",
    application:
      "Build one coherent slice, test the riskiest assumptions, document what is unknown, and iterate.",
  },
] as const satisfies readonly EngineeringPrinciple[];

export const CONTACT_SECTION = {
  eyebrow: "Contact",
  title: "Let’s start with the problem worth solving.",
  description:
    "For engineering roles, project feedback, or thoughtful collaboration, choose the channel that works best for you.",
  availability:
    "Open to conversations with teams working on useful products and strong engineering foundations.",
  configurationNote:
    "The current resume is view-only for visitors and editable only by the owner. A live PDF export is also available.",
} as const;

export const CONTACT_OPTIONS = [
  {
    id: "linkedin",
    label: "Connect on LinkedIn",
    description: "Best for role and collaboration conversations.",
    href: PORTFOLIO_PROFILE.linkedInUrl,
    external: true,
    status: "ready",
  },
  {
    id: "github",
    label: "Review the GitHub profile",
    description: "Inspect repositories and the evolution of current work.",
    href: PORTFOLIO_PROFILE.githubUrl,
    external: true,
    status: "ready",
  },
  {
    id: "email",
    label: "Email Shahadat",
    description: PORTFOLIO_PROFILE.email,
    href: PORTFOLIO_PROFILE.emailHref,
    external: false,
    status: "ready",
  },
  {
    id: "resume",
    label: "View current resume",
    description: "Open the latest version in Google Docs.",
    href: PORTFOLIO_PROFILE.resumeHref,
    external: true,
    status: "ready",
  },
  {
    id: "resume-download",
    label: "Download resume PDF",
    description: "Export the latest document as a PDF copy.",
    href: PORTFOLIO_PROFILE.resumeDownloadHref,
    external: true,
    status: "ready",
  },
] as const satisfies readonly ContactOption[];
