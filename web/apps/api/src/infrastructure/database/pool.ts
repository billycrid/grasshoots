import pg from 'pg';
import type { DatabaseProbe } from '../../modules/health/index.js';
export function createDatabase(connectionString: string) {
  const pool = new pg.Pool({
    connectionString,
    max: 10,
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 30000,
    statement_timeout: 2000,
    query_timeout: 2500,
  });
  const probe: DatabaseProbe = {
    async check() {
      // A real query also proves the Phase 0 migration was applied, not just TCP reachability.
      const result = await pool.query<{ version: number }>(
        'SELECT version FROM platform.schema_version WHERE singleton = true',
      );
      if (result.rows[0]?.version !== 1) throw new Error('Unexpected foundation schema version');
    },
  };
  return { pool, probe };
}
