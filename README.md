# Shahadat Sardar — Engineering Portfolio

A responsive, evidence-first engineering portfolio built to present product thinking, implementation depth, and honest project status in one cohesive experience.

## What this repository contains

- A recruiter-focused portfolio shell with desktop, compact desktop, tablet, and mobile layouts
- An interactive Bangladesh-centered globe with a resilient non-WebGL fallback
- Three evidence-led product case studies with clear build-status boundaries
- Story, experience, engineering-depth, principles, toolkit, and contact sections
- Four visual themes with light and dark appearance modes
- Accessible navigation, reduced-motion support, keyboard focus states, and responsive typography

## Technology

- Next.js 16 App Router
- React 19 and TypeScript
- CSS Modules plus a shared liquid-glass token system
- Three.js through `react-globe.gl`
- React Icons

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npx tsc --noEmit --incremental false
npm run build
```

The production build is the final source of truth for CSS ordering and Next.js integration.

## Project structure

```text
app/                    App Router entry points and global foundations
components/layout/      Desktop and mobile portfolio shell
components/sections/    Evidence-led page sections
components/portfolio/   Client orchestration and responsive shell rules
data/                   Typed portfolio content and navigation model
hooks/                  Appearance and active-section behavior
styles/liquid-glass/     Shared visual tokens, themes, and glass primitives
public/                 Brand, project, profile, and resume assets
```

## Content and status policy

The portfolio distinguishes implemented work, active builds, and future concepts. Proposed technologies and unverified outcomes are labelled explicitly. DermaAware is a product concept for general education and care-navigation support; it is not a medical diagnostic or treatment product.

Personal phone information is intentionally not published. Contact is available through the public email and professional profile links shown in the portfolio.

## Ownership

Designed and engineered by Shahadat Sardar. All rights reserved.
