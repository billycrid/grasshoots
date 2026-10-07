import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import hooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';
export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      'docs/assets/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
  { files: ['**/*.cjs'], languageOptions: { globals: { exports: 'writable' } } },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    files: ['apps/web/src/**/*.{ts,tsx}'],
    plugins: { 'react-hooks': hooks },
    rules: {
      ...hooks.configs.recommended.rules,
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/apps/api/**', '**/infrastructure/**', 'pg', 'fastify'],
              message: 'The browser consumes public contracts, never API or infrastructure code.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['packages/contracts/src/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@grasshoots/ui', '**/apps/**', 'pg', 'fastify', 'react', '@mui/*'],
              message: 'Contracts must remain platform-neutral.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['apps/api/src/modules/**/application/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['pg', 'fastify', '**/infrastructure/**'],
              message: 'Application logic depends on ports, not infrastructure.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.mjs'],
    languageOptions: { globals: { console: 'readonly', process: 'readonly', URL: 'readonly' } },
  },
  prettier,
);
