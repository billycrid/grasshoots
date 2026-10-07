import { expect, it } from 'vitest';
import { readConfig } from './config.js';
const env = { DATABASE_URL: 'postgresql://local:local@localhost:5432/grasshoots' };
it('allows central public contact configuration without leaking private settings', () => {
  const config = readConfig({ ...env, CONTACT_SUPPORT_EMAIL: 'support@grasshoots.co.uk' });
  expect(config.platform.contact.supportEmail).toBe('support@grasshoots.co.uk');
  expect(config.platform).not.toHaveProperty('DATABASE_URL');
});
it('fails fast on missing, invalid or out-of-range server settings', () => {
  expect(() => readConfig({})).toThrow('DATABASE_URL');
  expect(() => readConfig({ ...env, API_PORT: '70000' })).toThrow('API_PORT');
  expect(() => readConfig({ ...env, DATABASE_URL: 'https://example.com' })).toThrow('DATABASE_URL');
  expect(() => readConfig({ ...env, CONTACT_SUPPORT_EMAIL: 'bad' })).toThrow(
    'contact.supportEmail',
  );
});
