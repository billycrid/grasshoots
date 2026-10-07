import { randomUUID } from 'node:crypto';
import Fastify from 'fastify';
import helmet from '@fastify/helmet';
import type { PlatformConfig } from '@grasshoots/contracts';
import { getHealth, type DatabaseProbe } from './modules/health/index.js';
interface Dependencies {
  database: DatabaseProbe;
  platform: PlatformConfig;
  logLevel?: string;
}
export function buildApp({ database, platform, logLevel = 'info' }: Dependencies) {
  const app = Fastify({
    logger:
      logLevel === 'silent'
        ? false
        : {
            level: logLevel,
            redact: [
              'req.headers.authorization',
              'req.headers.cookie',
              'res.headers["set-cookie"]',
            ],
          },
    requestIdHeader: false,
    genReqId: () => randomUUID(),
    bodyLimit: 1_048_576,
  });
  void app.register(helmet);
  app.addHook('onRequest', async (request, reply) => {
    reply.header('x-request-id', request.id);
  });
  app.get('/api/health/live', async () => ({ status: 'ok' }));
  app.get('/api/health', async (request, reply) => {
    const health = await getHealth(database);
    reply.header('cache-control', 'no-store');
    if (health.status === 'degraded')
      request.log.warn({ dependency: 'postgresql' }, 'Database readiness check failed');
    return reply.code(health.status === 'ok' ? 200 : 503).send(health);
  });
  app.get('/api/platform-config', async (_request, reply) =>
    reply.header('cache-control', 'no-store').send(platform),
  );
  app.setErrorHandler((_error, request, reply) => {
    request.log.error('Request failed');
    void reply.code(500).send({ error: 'Internal server error', requestId: request.id });
  });
  return app;
}
