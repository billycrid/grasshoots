# Phase 0 validation report

Validated 7 October 2026. **Phase 0 is not signed off.** Implementation is present, but Docker/PostgreSQL acceptance remains blocked in the execution environment.

## Acceptance results

| #   | Acceptance criterion                 | Result and evidence                                                                                                                                                            |
| --- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Clean dependency installation        | **Pass.** A separate source copy without node_modules, dist or .env ran `npm ci` successfully using the lockfile (371 packages).                                               |
| 2   | PostgreSQL starts via Docker         | **Blocked.** `npm run db:up` fails with `docker: not found`. No Docker socket/daemon or container capabilities are available.                                                  |
| 3   | Migrations execute successfully      | **Blocked.** The migration entry point executes, but connection to 127.0.0.1:5432 is refused. No successful migration is claimed.                                              |
| 4   | Backend starts                       | **Pass.** Development API starts; compiled API also starts and serves real HTTP requests.                                                                                      |
| 5   | React/Vite starts                    | **Pass.** Vite starts and serves HTML/TSX; the React application renders in Chromium.                                                                                          |
| 6   | Frontend communicates with API       | **Pass.** Real Vite proxy requests reach liveness, readiness and public configuration endpoints; browser displays API Connected.                                               |
| 7   | API verifies PostgreSQL connectivity | **Partial.** Real failure is detected as 503/down; success path is unit-tested through the port, but real successful PostgreSQL connectivity is unverified.                    |
| 8   | Supplied theme/design foundations    | **Pass.** Theme and source documents preserved byte-for-byte. Desktop/mobile screenshots inspected; approved eyebrow-free wordmark, Manrope and supplied colour tokens used.   |
| 9   | Unit tests                           | **Pass.** 8/8 Vitest tests across 3 files, including health success/failure, configuration and response validation.                                                            |
| 10  | Playwright smoke tests               | **Not passed.** Alternate Chromium execution: 4 passed, 4 failed. See details below.                                                                                           |
| 11  | README reproduces setup              | **Partial.** Clean install, setup, static checks, tests, builds and servers exercised. Docker/migration/full smoke sequence still needs execution on a Docker-capable machine. |
| 12  | Architecture/decisions documented    | **Pass.** Repository, runtime boundaries, deferred modules and 3 decision records included.                                                                                    |
| 13  | No Phase 1+ functionality            | **Pass.** No accounts, club tables, sports data, integrations, billing, AI generation or publishing implemented.                                                               |

`npm run check` passed in the clean source copy: formatting, ESLint, strict TypeScript, 8 unit tests, shared-package compilation, API compilation and Vite build. The final small style corrections were rebuilt and visually rechecked. `npm audit --omit=dev` reported zero vulnerabilities at the time of the check; this is a point-in-time result, not a future guarantee.

## Browser evidence

Standard Playwright browser installation returned invalid ZIP archives for both the initially resolved browser and pinned Playwright 1.58.2 browser. The normal test command initially failed to launch Chromium.

For additional verification only, a Chromium 143 binary from `@sparticuz/chromium` was installed outside the deliverable and used with a temporary Playwright launch override. That temporary configuration, binary and dependency are **not** part of the repository.

Results using the actual committed tests:

- API-unavailable state: passed on desktop and mobile.
- Keyboard skip navigation and unknown routes: passed on desktop and mobile.
- Live PostgreSQL readiness: failed on desktop and mobile (expected HTTP 200, received 503).
- Database failure then recovery: failure state assertions passed, but recovery failed on desktop and mobile because the real database remained unavailable.

The failure tests were not rewritten to fake successful database acceptance. The normal Playwright configuration remains portable and expects its standard installed browser.

Additional real-browser inspection used the live API with PostgreSQL unavailable. There were no page errors and no horizontal overflow at 390px. Screenshots are in `docs/assets/phase0-desktop.png` and `docs/assets/phase0-mobile.png`; both intentionally show the truthful database-unavailable state.

## Remaining sign-off commands

On a clean local checkout with Node 24, npm 11 and a running Docker daemon:

```sh
npm ci
npm run setup
npm run db:up
npm run db:migrate
npm run db:migrate
npm run check
npx playwright install chromium
npm run test:e2e
npm run dev
```

Confirm all three system cards are connected/running. The repeated migration should be a no-op. The optional CI workflow additionally tests rollback/up against its disposable database.

Review the interim raster wordmark treatment and the architecture decisions before moving on. Final optimised brand vectors/icons remain future design assets. The current Vite build reports one approximately 536 kB minified JavaScript bundle (approximately 165 kB gzip); route-based splitting can be considered when actual product routes exist. Do not treat this report as production deployment approval or advance to Phase 1 before resolving the remaining gates.
