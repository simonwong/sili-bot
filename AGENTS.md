# Repository Guidelines

## Project Structure & Module Organization
- `src/routes/`: TanStack Start route files, including API handlers in `src/routes/api/*`.
- `src/features/`: feature-first modules (`chat`, `history`, `model`, `sidebar`) with barrel exports (`index.ts` and sub-barrels like `queries/index.ts`).
- `src/components/`: shared UI primitives and reusable components.
- `src/db/`: Drizzle setup, schema, queries, and SQL migrations. Treat this layer as server-only.
- `src/lib/` and `src/hooks/`: cross-feature utilities and hooks.
- `public/`: static assets. `docs/architecture/`: architecture notes.

## Feature-Base Architecture
- Organize by business feature first, not by technical type. Keep UI, hooks, model types, and query logic inside each feature folder.
- Use root feature barrels for public APIs (e.g., `@/features/chat`) and sub-barrels for internal layers (e.g., `@/features/chat/queries`).
- In this repo, “shared” is a layer, not a folder: it refers to `src/components`, `src/hooks`, and `src/lib`.
- Keep dependency direction clear: `routes -> features -> shared layer`, while DB access stays in `routes/api/*` and `src/db/*`.
- Do not import one feature’s deep internal files from another feature; import from its barrel instead.

## Build, Test, and Development Commands
- `pnpm dev`: run local dev server.
- `pnpm build`: build client + server bundles.
- `pnpm start`: run production server from `.output`.
- `pnpm check`: run project-wide Ultracite checks.
- `pnpm lint` / `pnpm lint:fix`: lint and safe auto-format.
- `pnpm exec tsc --noEmit`: strict type check.
- DB workflow: `pnpm db:generate`, `pnpm db:migrate`, `pnpm db:studio`.
- Migration policy: always use `pnpm db:migrate`. Do **not** use `pnpm db:push` in this repository.

## Coding Style & Naming Conventions
- Language: TypeScript + React.
- Formatting/linting: Ultracite/Biome; use project defaults (2-space indentation, semicolons, single quotes).
- File naming: kebab-case (e.g., `app-side-bar.tsx`, `use-scroll-to-bottom.tsx`).
- Component naming: PascalCase; hooks start with `use`.
- Prefer feature barrel imports: `@/features/chat`, `@/features/history`, or sub-barrels (`@/features/chat/queries`).
- Do not import `src/db/*` into client-rendered components.

## Testing Guidelines
- No dedicated test framework is configured.
- Minimum verification before PR:
  - `pnpm exec tsc --noEmit`
  - `pnpm build`
  - `pnpm check`

## Commit & Pull Request Guidelines
- Follow Conventional Commits seen in history: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`.
- Keep commits focused by feature/layer.
- PRs should include:
  - summary + impacted paths,
  - verification commands run,
  - screenshots/GIFs for UI changes,
  - migration notes for `src/db/migrations/*`.

## Security & Configuration Tips
- Store secrets in `.env`; never commit credentials.
- Validate request payloads in API routes.
