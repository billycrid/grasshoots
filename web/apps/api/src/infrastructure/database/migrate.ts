import { fileURLToPath } from 'node:url';
import { runner } from 'node-pg-migrate';
import { loadEnvironment, readConfig } from '../../config.js';
loadEnvironment();
const direction = process.argv[2];
if (direction !== 'up' && direction !== 'down') throw new Error('Expected up or down');
try {
  const configuration = readConfig();
  await runner({
    databaseUrl: configuration.DATABASE_URL,
    dir: fileURLToPath(new URL('../../../migrations', import.meta.url)),
    direction,
    count: direction === 'down' ? 1 : Infinity,
    migrationsTable: 'schema_migrations',
    checkOrder: true,
    singleTransaction: true,
  });
} catch {
  console.error(
    'Migration failed. Check PostgreSQL, DATABASE_URL and migration SQL. Credentials were not logged.',
  );
  process.exitCode = 1;
}
