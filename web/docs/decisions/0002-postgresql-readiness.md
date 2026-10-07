# ADR 0002 — PostgreSQL readiness and explicit migrations

Status: accepted; Docker execution acceptance pending in this environment.

Use PostgreSQL 17 via Docker Compose, `pg` for database access and node-pg-migrate for versioned, transactional, locked migrations. Avoid choosing a domain ORM before domain entities exist. The API composition root injects a PostgreSQL probe into the health service, preserving the persistence boundary.

The initial migration creates only a singleton foundation marker in a platform schema. Readiness requires querying that marker successfully; HTTP process liveness is separate. A database that accepts connections but lacks migrations must not show as ready. Failures produce 503 with no connection details, and query/pool timeouts bound waiting.

Migrations run explicitly before application startup, not opportunistically on every HTTP process. Repeated up is a no-op. Rollback is available for disposable local development and is intentionally not automatic. Later domain repositories should own their SQL and tenant filtering.

Local credentials in `.env.example` are development defaults. Docker publishes PostgreSQL on loopback only; production credentials and hosting are outside this phase.
