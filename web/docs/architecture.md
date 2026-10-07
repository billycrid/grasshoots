# Phase 0 architecture

## Scope and authority

Product spec → design spec → supplied MUI theme is the authority order. The source specs and theme are preserved verbatim. This implementation establishes infrastructure only; broad MVP requirements for fake AI, synthetic sports data, tenancy and imports are deliberately deferred under the user's Phase 0 instruction.

## Repository

```text
grasshoots/
  apps/
    web/                      React, Vite, React Router, MUI shell
      public/                 Supplied brand reference used for the wordmark
      src/                    Routes, health UI, validated HTTP client
    api/
      migrations/             Versioned PostgreSQL migrations
      src/
        modules/health/       Application service and DatabaseProbe port
        infrastructure/database/  pg implementation and migration entry point
        app.ts                HTTP composition; injectable for unit tests
        server.ts             Runtime wiring, logging, graceful shutdown
        config.ts             Validated private/public configuration
  packages/
    contracts/                Browser-safe public schemas/types and brand defaults
    ui/                       Unmodified supplied MUI theme
  tests/e2e/                  Desktop/mobile Playwright acceptance tests
  scripts/                    Portable, non-destructive environment setup
  docs/
    product-spec.md
    design-spec.md
    architecture.md
    validation.md
    assets/                   Original artwork and supplied theme
    decisions/                Architecture/design decision records
  .github/workflows/          Optional repeatable Docker-based CI gate
  compose.yaml                Local PostgreSQL only
  package-lock.json           Reproducible npm workspace install
```

## Runtime and dependencies

The browser makes same-origin requests to `/api` through Vite's local proxy. Fastify handles HTTP and passes readiness checks to the health application service. That service depends on a `DatabaseProbe` port. The composition root injects the PostgreSQL implementation; only infrastructure imports `pg` and owns SQL. The database is local Docker PostgreSQL 17, bound to loopback with a persistent named volume.

Readiness queries the singleton `platform.schema_version` row. This proves a successful database query and the Phase 0 migration, not merely an open socket. The initial marker is infrastructure metadata, not a placeholder club table. Future domain migrations must not repurpose this marker as a general schema version counter. `public.schema_migrations` is managed by node-pg-migrate for migration history.

`GET /api/health/live` intentionally remains healthy when PostgreSQL is down. `GET /api/health` returns 503 on failed dependency checks. Connection acquisition, statements and queries are time-bounded. A bounded pool is closed during SIGINT/SIGTERM shutdown. Logs and generic HTTP errors avoid returning database details. Each request gets a new UUID and `x-request-id` response header; inbound identifiers are not blindly trusted.

Shared contracts have Zod schemas and inferred TypeScript types. They contain no backend/domain implementation. Both server configuration and client responses are validated. The UI never imports API code. ESLint protects browser and application-layer imports; broader module import rules should be extended as real modules are added.

Workspaces export source under the `development` condition, and built JavaScript by default. Development and migrations use Node's `--import tsx` loader. Builds compile shared packages before the API/web. NodeNext governs server/package builds; Vite uses Bundler resolution for the browser. Strict TypeScript includes unchecked-index and exact-optional checks.

## Boundaries reserved for later phases

| Boundary                          | Future responsibility                                | Must not absorb                                           |
| --------------------------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| Auth/users                        | Identity and sessions                                | Club membership or billing ownership                      |
| Clubs/seasons                     | Tenant-owned organisation data                       | Provider-specific ingestion formats                       |
| Ingestion/integrations            | Source acquisition and validation                    | Media orchestration or authoritative sporting conclusions |
| Sports adapters                   | Canonical sport meaning and normalisation            | Provider payment logic                                    |
| Facts                             | Deterministic results, totals, milestones            | LLM-derived authoritative facts                           |
| Content/media                     | Sport-independent planning and presentation          | Play-Cricket JSON or raw provider SDK calls               |
| AI infrastructure                 | Replaceable text-generation providers                | Facts, unrestricted database access                       |
| Billing / payments / entitlements | Separate commercial, transaction and access concerns | Plan-name checks scattered across the application         |
| Publishing/jobs                   | Background, idempotent delivery                      | Long-running work tied to HTTP request lifetime           |

These are documented boundaries, not empty modules/interfaces. Add modules only when implementing their behaviour. Future module code should expose a small public entry point; orchestration goes through application APIs/ports rather than another module's repositories or tables. Business entities will use repositories; health is a probe, not a pretend domain repository. No service locator, generic universal repository, queue, ORM or provider framework is introduced speculatively.

Before any club-owned data is added, define tenant context and backend authorisation enforcement, including negative isolation tests. Phase 0's public endpoints contain infrastructure status and platform branding only; no tenant or personal data exists.

## UI and branding

The UI package preserves every supplied token and override. MUI provides the base components, with Ink/Chalk hierarchy, restrained Hoot Green, normal-case buttons and local Manrope fonts. Status is conveyed through text and icons as well as colour. Mobile stacks the sidebar and cards without introducing a second navigation menu. Keyboard support includes a skip link and visible focus; React Router provides navigation and a 404 page.

The image's smaller eyebrowed owl marks conflict with the design spec. The supplied primary wordmark is eyebrow-free, so the shell uses that original geometry via a CSS viewport. It does not recreate the owl. The reference board's raster size is an acknowledged interim asset cost; replace it with an approved optimised vector later. No mock marketing claims, club navigation or non-functional product buttons were copied from the board.

Public brand/contact configuration lives centrally and can be overridden at API startup. The frontend initially uses shared defaults, then retrieves current public settings; failures display a notice and retain the last available configuration. The Gmail address is not presented as a public contact link in the shell.

## Operations and limitations

Local development requires Node, Docker and initial package/browser/image downloads only. No production deployment is included. Vite preview is a local preview, not production hosting. Deployment must separately address HTTPS, reverse-proxy routing, database credentials/TLS, backups and supported hosting.

CI and README commands cover the real database path. Unit tests inject ports and HTTP responses, while live browser tests require actual PostgreSQL. See validation.md for the distinction between implemented behaviour and verified acceptance.
