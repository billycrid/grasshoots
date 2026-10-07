# Grasshoots

Making noise for grassroots sport.

Phase 0 only: a branded local application shell, Node.js modular monolith and PostgreSQL readiness check. No authentication, club data, sports integrations, billing, AI or publishing is implemented.

**Acceptance status:** implementation is provided, but Phase 0 is **not yet signed off**. See [validation.md](docs/validation.md) for checks actually run and environment blockers. The Docker/database and browser gates must pass on a Docker-capable machine before Phase 1.

## Prerequisites

- Node.js **24.x**, npm **11.x** (`.nvmrc` is supplied).
- Docker Engine/Desktop with Docker Compose v2 supporting `--wait`. Start Docker Desktop first on Windows/macOS. Use Linux containers.
- Free local ports **5173**, **3001**, **5432**.
- Internet for the initial npm, Docker image and Playwright browser downloads. No external account or API credentials are needed.

Run commands in the extracted `grasshoots` directory (or repository root). All npm scripts work from PowerShell, macOS or Linux; no shell-specific environment assignments are required.

## First run

```sh
npm ci
npm run setup
npm run db:up
npm run db:migrate
npm run dev
```

Open **http://127.0.0.1:5173**. The web app, backend API and PostgreSQL cards should all report running/connected. `npm run dev` runs API and Vite together; Ctrl+C stops both. PostgreSQL continues running in Docker until `npm run db:down`.

`npm run setup` copies `.env.example` to `.env` without overwriting an existing configuration. `.env` is ignored by git. The Docker volume persists data across restarts. `npm run db:down` does not delete it.

## Validate Phase 0

With PostgreSQL running and migrated:

```sh
npm run check
npx playwright install chromium
npm run test:e2e
```

On a minimal Linux host, use `npx playwright install --with-deps chromium` to install browser system dependencies (may require administrator privileges). Playwright starts API/Vite automatically or reuses servers already running on the standard ports. Tests run at desktop and mobile sizes. The live readiness and recovery tests **require real PostgreSQL**; there is no fake-success mode.

To exercise the compiled output:

```sh
npm run build
npm run start:api
```

In a second terminal:

```sh
npm run preview
```

Open **http://127.0.0.1:4173**. Preview proxies `/api` to the same API, for local build validation only. Vite preview is not a production hosting server.

## Commands

| Command                             | Purpose                                                         |
| ----------------------------------- | --------------------------------------------------------------- |
| `npm run dev`                       | Watch API and serve Vite, with shared package source resolution |
| `npm run check`                     | Formatting, lint, strict TypeScript, Vitest, production builds  |
| `npm test` / `npm run test:watch`   | Deterministic tests without PostgreSQL or network               |
| `npm run test:e2e`                  | Browser smoke tests including real API/database readiness       |
| `npm run test:e2e:ui`               | Interactive Playwright runner                                   |
| `npm run build`                     | Compile shared packages, API and web in dependency order        |
| `npm run format`                    | Format implementation; preserves supplied specs/theme           |
| `npm run db:up` / `npm run db:down` | Start and await PostgreSQL / stop without removing data         |
| `npm run db:logs`                   | PostgreSQL container logs                                       |
| `npm run db:migrate`                | Apply pending migrations transactionally; safe to repeat        |
| `npm run db:rollback`               | Undo the latest migration; local disposable databases only      |

Rollback removes the foundation metadata table; readiness will return 503 until migrations are reapplied. Never edit an applied migration: add a new numbered migration instead. The runner serialises migrations with a PostgreSQL advisory lock and records applied migrations.

## Health and configuration

- `GET /api/health/live`: process liveness, always 200 when the server is serving.
- `GET /api/health`: 200 only after a real PostgreSQL query verifies the foundation schema marker; otherwise 503 with `database: down`.
- `GET /api/platform-config`: explicit allowlist of public brand/contact settings. Never returns the database URL or secrets.

The UI checks every 30 seconds and offers manual retry. It distinguishes an unavailable API from a reachable API with an unavailable or unmigrated database. Status text accompanies colours. Health responses are not cached; API logs are structured JSON with server-generated request IDs.

All settings are documented in `.env.example`. Shell environment takes precedence. The backend loads the root `.env`; Vite reads only `API_PROXY_TARGET` for its server-side proxy. Do not add database or private settings with a `VITE_` prefix, which exposes values to the browser.

Change `CONTACT_SUPPORT_EMAIL` centrally when the domain mailbox is ready. The temporary Gmail is configured but not displayed in the shell. Restart the API after changing settings; the browser reloads public configuration within 30 seconds. Brand defaults have one typed home in `packages/contracts`. No customer configuration UI is introduced.

## Troubleshooting

- **Docker not found / daemon unavailable:** install/start Docker Desktop or Engine; run `docker compose version` and `docker info`.
- **Port 5432 occupied:** set `POSTGRES_PORT` and the port in `DATABASE_URL` to the same unused port, then rerun `db:up`.
- **Database unavailable:** run `db:up`, inspect `db:logs`, then `db:migrate`. A connection without migrations intentionally remains unready.
- **Changed database credentials:** PostgreSQL initialisation variables only apply to a new volume. Changing `.env` does not change an existing database user's password. Use the original credentials or deliberately recreate a disposable volume after backing up anything needed.
- **API unavailable:** check the API terminal, `.env`, `API_PORT` and `API_PROXY_TARGET`. Ports 3001/5173 are fixed in the Playwright configuration; use the documented defaults for E2E.
- **Browser binary missing:** rerun the Playwright install command. The package version and browser binary must match.
- **Tests fail readiness with 503:** this is a genuine acceptance failure; start PostgreSQL and apply migrations, rather than mocking the live test.

## Source and architecture

- [Product specification](docs/product-spec.md): authoritative product/engineering source, unchanged.
- [Design specification](docs/design-spec.md): authoritative UX/brand source, unchanged.
- [Architecture](docs/architecture.md): repository map and module boundaries.
- [Decisions](docs/decisions/): significant Phase 0 choices and interim artwork treatment.
- [Validation](docs/validation.md): acceptance evidence and remaining gates.

The exact supplied MUI theme is in `packages/ui/src/theme.ts`; the original is retained in `docs/assets`. Manrope is bundled locally, with no Google Fonts request. The eyebrow-free wordmark is shown directly from the supplied reference artwork through a CSS viewport. Final vector/icon exports remain pending approved artwork.

The optional GitHub Actions workflow repeats installation, Docker start, migration up/down/up, static checks and Playwright. No cloud credentials are required. It has not been run on a hosted runner as part of this delivery.
