# Feature-Based Structure (TanStack Start + React Query + Drizzle)

## Goals

- Keep server-state (React Query) close to each feature.
- Keep database code server-only and shared by API routes.
- Make feature modules independently evolvable.
- Prevent client bundle from importing server dependencies.

## Recommended Directory Layout

```txt
src/
  app/
    router.tsx                # router + query client bootstrap
    providers/                # app-level providers only

  routes/
    __root.tsx
    index.tsx
    chat/
      $id.tsx
    api/
      chat.ts
      history.ts
      history.$id.ts
      messages.$id.ts

  features/
    chat/
      components/
      hooks/
      model/
        types.ts
      queries/
        messages.ts           # queryKey/queryOptions/fetcher

    history/
      api/
        history.ts            # fetch/delete request functions
      hooks/
        use-history.ts        # useQuery/useMutation hooks
      model/
        types.ts

    model/
      store/
        model-store.ts        # zustand store (feature-local)
      components/

    sidebar/
      components/

  db/
    index.ts                  # drizzle client
    schema/
    queries/                  # server-only repository functions

  shared/
    ui/                       # reusable primitive UI
    lib/                      # shared utility functions
    hooks/                    # cross-feature hooks only
```

## Placement Rules

- `routes/api/*`: HTTP boundary only, parse/validate request and call `db/queries`.
- `db/*`: never import from feature UI files.
- `features/*/queries`: keep `queryKey` and `queryOptions` in one place.
- `features/*/hooks`: compose `useQuery/useMutation` for UI consumption.
- `store/` (global) only for true cross-feature client state.
- Use barrel exports per feature, but keep root barrel minimal.
: prefer `features/<name>/index.ts` for public API and sub-barrels (e.g. `features/<name>/queries/index.ts`) for internal layers.

## React Query Rules

- Single `QueryClient` source: initialize once in `router.tsx`.
- Prefer `queryOptions(...)` + stable query keys.
- In route loader, prefetch with `context.queryClient.ensureQueryData(...)`.
- Use optimistic updates only in feature mutation hooks.

## DB Rules

- Keep `db/index.ts` and `db/queries/*` server-only.
- API route should not expose raw DB errors to client.
- Avoid calling DB directly from client-runnable route components.

## Migration Order (Low Risk)

1. Move server-state hooks into feature folders (`history`, `chat`).
2. Add feature barrels and keep root barrels minimal (avoid re-exporting entire heavy UI trees).
3. Add typed request validation in `routes/api/*` (e.g. `zod`).
4. Move feature-local zustand stores from `src/store` to each feature.
5. Split heavy rendering dependencies behind lazy boundaries.

## This Repository: Immediate Next Targets

1. Add request schema validation for `/api/chat` payload.
2. Remove remaining unused barrel entry files.
3. Add error boundaries for route loaders and query errors.
4. Move `src/store/model.ts` to `src/features/model/store/model-store.ts`.
5. Keep bundle budgets and track `dist/client/assets/main-*.js` growth.
