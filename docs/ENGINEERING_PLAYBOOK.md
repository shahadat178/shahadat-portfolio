# Portfolio Engineering Playbook

This document defines how the portfolio should evolve without trading speed for
quality or creating unnecessary rework.

## Product objective

The portfolio must prove engineering judgment, ownership, and measurable impact.
Visual polish supports that story; it is not the story by itself.

## Architecture boundaries

- `app/` owns routes, metadata, and route-level composition.
- `components/portfolio/` coordinates page-level state and interactions.
- `components/layout/` owns persistent navigation and rail UI.
- `components/sections/` gives every portfolio section an independent delivery
  boundary.
- `data/` contains reviewed portfolio content. Do not invent achievements or
  metrics.
- `types/` defines stable content and interaction contracts.
- `hooks/` owns reusable browser-side behavior.
- `styles/liquid-glass/` owns shared design-system primitives and tokens.
- Component-specific styles should use CSS Modules when new section work begins.

## Delivery order

1. Confirm real content and evidence.
2. Build the whole-page content skeleton.
3. Complete Work, Experience, Story, Toolkit, and Contact as vertical slices.
4. Revisit the Hero after the supporting narrative is stable.
5. Run a whole-site accessibility, performance, SEO, and browser audit.

## Definition of done for every section

A section is complete only when it has:

- reviewed, truthful content with a clear reader outcome;
- responsive behavior at mobile, tablet, laptop, and wide desktop sizes;
- keyboard access, semantic markup, and useful accessible names;
- verified light, dark, and supported color-theme presentation;
- reduced-motion behavior;
- no console, lint, type, or production-build failures;
- no avoidable layout shift or oversized client-side dependency;
- a documented manual verification path.

## Decision rules

- Fix systemic problems before section-local polish.
- Prefer the smallest abstraction that removes proven duplication.
- Keep server-renderable content outside client boundaries when practical.
- Do not add dependencies without an explicit capability and maintenance reason.
- Preserve working behavior during refactors; change structure and behavior in
  separate reviewable steps.
- Measure performance and accessibility instead of judging them by appearance.

## Current launch blockers

- Replace the placeholder email address in `data/portfolio.ts`.
- Add the resume PDF referenced by `PORTFOLIO_PROFILE.resumeHref`, or remove the
  link until it exists.
- Populate project, experience, and toolkit data with verified information.
- Implement the five currently empty content sections.
- Add production URL-dependent metadata only after the canonical domain is known.
