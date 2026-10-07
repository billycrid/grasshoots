# ADR 0001 — npm workspaces and a Fastify modular monolith

Status: accepted for Phase 0.

The product requires a React frontend, Node backend, shared platform foundations and modular monolith. Use one npm workspace repository with `apps/web`, `apps/api`, `packages/contracts` and `packages/ui`. Fastify supplies structured logging, lifecycle hooks and in-process HTTP testing without an additional server framework layer.

Public schemas cross HTTP boundaries; backend implementation never enters browser dependencies. Infrastructure is composed at startup and depends on application ports. Future modules follow the product's separate ingestion, sport, facts, media, billing, payments and entitlement responsibilities. They are documented, not implemented prematurely.

Use plain workspace scripts and a lockfile instead of introducing Nx/Turborepo or microservices for four small packages. Node 24 and a single Vite 8 dependency line avoid incompatible plugin/test-tool Vite types. MUI remains on the compatible 7.x line for the supplied theme.
