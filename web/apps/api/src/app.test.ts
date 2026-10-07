import { describe, it, expect, afterEach } from 'vitest';
import { defaultPlatformConfig, HealthResponseSchema } from '@grasshoots/contracts';
import { buildApp } from './app.js';
const instances: ReturnType<typeof buildApp>[] = [];
afterEach(async () => {
  await Promise.all(instances.splice(0).map((app) => app.close()));
});
function appWith(check: () => Promise<void>) {
  const app = buildApp({
    database: { check },
    platform: defaultPlatformConfig,
    logLevel: 'silent',
  });
  instances.push(app);
  return app;
}
describe('health HTTP contract', () => {
  it('reports ready only after the database check succeeds', async () => {
    let queried = false;
    const app = appWith(async () => {
      queried = true;
    });
    const result = await app.inject('/api/health');
    expect(queried).toBe(true);
    expect(result.statusCode).toBe(200);
    expect(HealthResponseSchema.parse(result.json()).checks.database).toBe('up');
    expect(result.headers['cache-control']).toBe('no-store');
    expect(result.headers['x-request-id']).toMatch(/^[0-9a-f-]{36}$/);
  });
  it('returns 503 without exposing credentials or driver details', async () => {
    const app = appWith(async () => {
      throw new Error('postgres://secret:password@private-host');
    });
    const result = await app.inject('/api/health');
    expect(result.statusCode).toBe(503);
    expect(HealthResponseSchema.parse(result.json()).checks.database).toBe('down');
    expect(result.body).not.toContain('secret');
    expect(result.body).not.toContain('private-host');
    expect((await app.inject('/api/health/live')).statusCode).toBe(200);
  });
  it('provides only public platform configuration and generates independent request IDs', async () => {
    const app = appWith(async () => {});
    const a = await app.inject({
      url: '/api/platform-config',
      headers: { 'x-request-id': 'untrusted' },
    });
    const b = await app.inject('/api/platform-config');
    expect(a.json()).toEqual(defaultPlatformConfig);
    expect(a.headers['x-request-id']).not.toBe('untrusted');
    expect(a.headers['x-request-id']).not.toBe(b.headers['x-request-id']);
  });
});
