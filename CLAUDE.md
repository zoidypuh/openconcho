# openconcho

Frontend UI for self-hosted Honcho instances — browse memories, peers, sessions, conclusions, and chat with memory context. Ships as a web app (`@openconcho/web`) and a Tauri desktop wrapper (`@openconcho/desktop`).

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Launch Tauri desktop app (also starts the web dev server) |
| `pnpm --filter @openconcho/web dev` | Web-only dev server on http://localhost:5173 |
| `pnpm build` | Turbo: build web + desktop |
| `pnpm lint` | Turbo: Biome check across packages |
| `pnpm typecheck` | Turbo: tsc --noEmit across packages |
| `pnpm test` | Turbo: Vitest (unit + integration), excludes `e2e/` |
| `pnpm test:e2e` | Turbo: Playwright e2e (uncached) |
| `pnpm --filter @openconcho/web generate:api` | Regen `src/api/schema.d.ts` from `openapi.json` |

## Structure

| Path | Purpose |
|------|---------|
| `packages/web/` | Vite + React 19 + TanStack Router/Query SPA |
| `packages/web/src/routes/` | TanStack Router file-based routes (flat-route syntax) |
| `packages/web/src/components/` | Feature components grouped by domain |
| `packages/web/src/api/` | openapi-fetch client + TanStack Query hooks |
| `packages/web/src/lib/` | Config (localStorage) + theme utilities |
| `packages/web/src/hooks/` | Custom React hooks |
| `packages/web/src/test/` | Vitest unit/integration tests + setup |
| `packages/web/e2e/` | Playwright e2e specs |
| `packages/desktop/` | Tauri shell that bundles the built web app |
| `.claude/rules/` | Coding conventions (auto-loaded) |
| `docs/` | Architecture and references |

## Code Style

Read `.claude/rules/coding-standards.md` when writing or reviewing any code file.

## Workflows

Read `.claude/rules/workflows.md` for recurring task patterns.

## Architecture

Read `docs/architecture.md` for component overview, data flow, and design decisions.

## Key Constraints

- **No hardcoded URLs** — all connection config lives in `localStorage` under `openconcho:config`
- **TanStack Router flat-route params** — always cast `params` as `as never` at `navigate()` and `<Link>` callsites
- **`framer-motion` Variants typing** — import `type Variants` and annotate objects; never use `as const` on variant objects
- **Auth is optional** — token header only sent when non-empty; `checkConnection()` detects if auth is required
- **CSS variables only** — no Tailwind color utilities for theme-aware colors; use `var(--text-1)` etc.
- **Shared deps via pnpm catalog** — version-pinned in `pnpm-workspace.yaml`; reference as `"catalog:"` in package.json
- **Conventional commits enforced** — commitlint runs in husky `commit-msg`; body lines must be ≤100 chars
- **Releases via semantic-release** — `.releaserc.json`; commits land on `main`, no manual version bumps
- **GitHub account** — push under `offendingcommit` (`gh auth switch` if needed)
