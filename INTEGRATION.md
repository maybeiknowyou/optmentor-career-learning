# OptMentor Career Learning Integration

## Run locally

```bash
npm install
npm run dev
```

The module is a React + TypeScript + Vite package. Required runtime packages are `react`, `react-dom`, `react-router-dom`, and `lucide-react`; Tailwind is used for the existing build.

## Embed in OptMentor

Import `CareerLearningModule` from `src/index.ts` and render it inside the host router:

```tsx
<CareerLearningModule shellMode="embedded" />
```

Use `shellMode="standalone"` for the complete module preview. Embedded mode renders only the module content and does not duplicate the module sidebar or topbar.

## Routes

All routes use the `/career-learning` base path, including careers, roadmaps, stages, resources, assessments, results, My Learning, and badges. The host application should mount the module where this namespace is available and preserve browser refresh fallback to `index.html`.

## Persistence

Learning progress is stored in `localStorage` under `optmentor.learning-progress.v1`. Assessment attempts are stored under `optmentor.assessment-attempts.v1`. These records are browser-local, unauthenticated, user-editable, and not suitable as a source of verified certificates or cross-device progress. Replace the services in `src/services/` with authenticated backend adapters when the host platform is ready.
