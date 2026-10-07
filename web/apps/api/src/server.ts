import { buildApp } from './app.js';
import { loadEnvironment, readConfig } from './config.js';
import { createDatabase } from './infrastructure/database/pool.js';
loadEnvironment();
const configuration = readConfig();
const { pool, probe } = createDatabase(configuration.DATABASE_URL);
const app = buildApp({
  database: probe,
  platform: configuration.platform,
  logLevel: configuration.LOG_LEVEL,
});
pool.on('error', () =>
  app.log.error({ dependency: 'postgresql' }, 'Idle database connection failed'),
);
app.addHook('onClose', async () => pool.end());
let shuttingDown = false;
async function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;
  const timeout = setTimeout(() => process.exit(1), 10000).unref();
  try {
    await app.close();
  } finally {
    clearTimeout(timeout);
  }
}
process.on('SIGTERM', () => void shutdown());
process.on('SIGINT', () => void shutdown());
try {
  await app.listen({ host: configuration.API_HOST, port: configuration.API_PORT });
} catch {
  app.log.error('API startup failed; check host and port configuration.');
  await app.close();
  process.exitCode = 1;
}
