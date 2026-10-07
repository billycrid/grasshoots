import { HealthResponseSchema, PlatformConfigSchema } from '@grasshoots/contracts';
export async function fetchHealth() {
  const response = await fetch('/api/health', {
    signal: AbortSignal.timeout(5000),
    cache: 'no-store',
  });
  if (response.status !== 200 && response.status !== 503) throw new Error('API unavailable');
  const health = HealthResponseSchema.parse(await response.json());
  if (
    (response.status === 200) !== (health.status === 'ok') ||
    (health.status === 'ok') !== (health.checks.database === 'up')
  )
    throw new Error('Inconsistent health response');
  return health;
}
export async function fetchPlatformConfig() {
  const response = await fetch('/api/platform-config', {
    signal: AbortSignal.timeout(5000),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Platform settings unavailable');
  return PlatformConfigSchema.parse(await response.json());
}
