# OptMentor Career Learning Module

Phase 1 foundation for the standalone and integration-ready OptMentor Career Learning Module.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown by Vite. The application redirects to `/career-learning/careers`.

## Production build

```bash
npm run build
npm run preview
```

## Shell modes

The default app in `src/App.tsx` renders the module in standalone mode:

```tsx
<CareerLearningModule shellMode="standalone" />
```

This includes the module sidebar and topbar. When the team's main OptMentor application already supplies global navigation, mount the exported module inside its existing React Router using embedded mode:

```tsx
import { CareerLearningModule } from './path-to-module/src'

<CareerLearningModule shellMode="embedded" />
```

Embedded mode renders only the career-learning page content. It does not create a router, sidebar, or topbar, preventing duplicate navigation. The host must provide a React Router context.

For local visual verification, append `?shell=embedded` to any module URL. This query switch belongs only to the standalone demo entry; integrated consumers should pass the prop directly.

## Route namespace

- `/career-learning/careers`
- `/career-learning/careers/:careerId`
- `/career-learning/careers/:careerId/roadmap`
- `/career-learning/careers/:careerId/roadmap/:stageId`
- `/career-learning/careers/:careerId/resources`
- `/career-learning/assessments`
- `/career-learning/assessments/:assessmentId`
- `/career-learning/assessments/:assessmentId/results`
- `/career-learning/learning`
- `/career-learning/badges`

The Career Explorer is implemented with ten typed career records, combined search and category filters, responsive image cards, and stable detail links. Phase 3 adds reusable career detail tabs and prerequisite-driven vertical roadmaps for all ten fields. Resources, assessments, progress tracking, and badge rules remain deferred.

## Project structure

```text
src/
├── app/                    Module routes
├── components/
│   ├── feedback/           Loading, empty, and error states
│   ├── layout/             Standalone shell, sidebar, and topbar
│   └── ui/                 Shared UI primitives
├── config/                 Module navigation
├── features/placeholders/  Phase-labeled route placeholders
├── lib/                    Small shared utilities
├── App.tsx                 Standalone entry composition
├── index.ts                Integration-facing exports
└── main.tsx                Browser entry point
```

## Current scope

Phase 3 includes the reusable career detail experience and roadmap engine. Courses, assessments, progress logic, badge rules, backend work, and unrelated OptMentor modules remain outside the current scope.
