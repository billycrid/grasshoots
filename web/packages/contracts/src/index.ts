import { z } from 'zod';
export const HealthResponseSchema = z.object({
  status: z.enum(['ok', 'degraded']),
  checks: z.object({ api: z.literal('up'), database: z.enum(['up', 'down']) }),
  checkedAt: z.iso.datetime(),
});
export type HealthResponse = z.infer<typeof HealthResponseSchema>;
export const PlatformConfigSchema = z.object({
  brand: z.object({
    name: z.string().min(1),
    tagline: z.string().min(1),
    primaryDomain: z.string().min(1),
  }),
  contact: z.object({ supportEmail: z.email(), generalEmail: z.email() }),
  social: z.object({ instagramHandle: z.string().min(1), xHandle: z.string().min(1) }),
  urls: z.object({ marketingSite: z.url(), application: z.url() }),
});
export type PlatformConfig = z.infer<typeof PlatformConfigSchema>;
export const defaultPlatformConfig: PlatformConfig = {
  brand: {
    name: 'Grasshoots',
    tagline: 'Making noise for grassroots sport',
    primaryDomain: 'grasshoots.co.uk',
  },
  contact: {
    supportEmail: 'grasshootssupport@gmail.com',
    generalEmail: 'grasshootssupport@gmail.com',
  },
  social: { instagramHandle: 'grasshootsuk', xHandle: 'grasshoots' },
  urls: { marketingSite: 'https://grasshoots.co.uk', application: 'http://localhost:5173' },
};
