import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import { defaultPlatformConfig, PlatformConfigSchema } from '@grasshoots/contracts';

// Resolves to repository root in both src/ and dist/; process env takes precedence.
export function loadEnvironment() {
  config({ path: fileURLToPath(new URL('../../../.env', import.meta.url)), quiet: true });
}
const EnvSchema = z.object({
  DATABASE_URL: z
    .url()
    .refine(
      (value) => ['postgres:', 'postgresql:'].includes(new URL(value).protocol),
      'PostgreSQL URL required',
    ),
  API_HOST: z.string().default('127.0.0.1'),
  API_PORT: z.coerce.number().int().min(1).max(65535).default(3001),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
});
export function readConfig(env: NodeJS.ProcessEnv = process.env) {
  const parsed = EnvSchema.safeParse(env);
  if (!parsed.success) {
    // Report names only: never echo connection strings or credentials.
    throw new Error(
      `Invalid environment configuration: ${parsed.error.issues.map((issue) => issue.path.join('.')).join(', ')}. See .env.example.`,
    );
  }
  const defaults = defaultPlatformConfig;
  const platform = PlatformConfigSchema.safeParse({
    brand: {
      name: env.BRAND_NAME ?? defaults.brand.name,
      tagline: env.BRAND_TAGLINE ?? defaults.brand.tagline,
      primaryDomain: env.BRAND_PRIMARY_DOMAIN ?? defaults.brand.primaryDomain,
    },
    contact: {
      supportEmail: env.CONTACT_SUPPORT_EMAIL ?? defaults.contact.supportEmail,
      generalEmail: env.CONTACT_GENERAL_EMAIL ?? defaults.contact.generalEmail,
    },
    social: {
      instagramHandle: env.SOCIAL_INSTAGRAM_HANDLE ?? defaults.social.instagramHandle,
      xHandle: env.SOCIAL_X_HANDLE ?? defaults.social.xHandle,
    },
    urls: {
      marketingSite: env.URL_MARKETING_SITE ?? defaults.urls.marketingSite,
      application: env.URL_APPLICATION ?? defaults.urls.application,
    },
  });
  if (!platform.success)
    throw new Error(
      `Invalid public configuration: ${platform.error.issues.map((issue) => issue.path.join('.')).join(', ')}`,
    );
  return { ...parsed.data, platform: platform.data };
}
