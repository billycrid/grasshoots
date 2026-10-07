import { afterEach, expect, it, vi } from 'vitest';
import { fetchHealth } from './api.js';
afterEach(() => vi.unstubAllGlobals());
const healthy = {
  status: 'ok',
  checks: { api: 'up', database: 'up' },
  checkedAt: '2026-10-07T08:00:00.000Z',
};
it('accepts a real readiness response', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(healthy))));
  expect((await fetchHealth()).status).toBe('ok');
});
it('distinguishes a reachable degraded API from an unreachable API', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          ...healthy,
          status: 'degraded',
          checks: { api: 'up', database: 'down' },
        }),
        { status: 503 },
      ),
    ),
  );
  expect((await fetchHealth()).checks.database).toBe('down');
});
it('rejects malformed and inconsistent readiness payloads', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(new Response(JSON.stringify(healthy), { status: 503 })),
  );
  await expect(fetchHealth()).rejects.toThrow('Inconsistent');
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(new Response('<html>Proxy error</html>', { status: 502 })),
  );
  await expect(fetchHealth()).rejects.toThrow('API unavailable');
});
