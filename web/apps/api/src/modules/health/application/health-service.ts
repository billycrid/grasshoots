import type { HealthResponse } from '@grasshoots/contracts';
export interface DatabaseProbe {
  check(): Promise<void>;
}
export async function getHealth(database: DatabaseProbe): Promise<HealthResponse> {
  let connected = false;
  try {
    await database.check();
    connected = true;
  } catch {
    /* dependency unavailable */
  }
  return {
    status: connected ? 'ok' : 'degraded',
    checks: { api: 'up', database: connected ? 'up' : 'down' },
    checkedAt: new Date().toISOString(),
  };
}
