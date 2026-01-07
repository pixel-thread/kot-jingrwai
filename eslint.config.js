// eslint.config.js (root)
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  /* ---------------------------------------------
   * Global ignores (monorepo-safe)
   * --------------------------------------------- */
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.expo/**',
      '**/.expo-shared/**',
      '**/android/**',
      '**/ios/**',
      '**/turbo/**',
      '**/.next/**',
      '**/build/**',
      '**/coverage/**',
      '**/*.generated.*',
      '**/scripts/**',
      '**/**/metro.config.js',
    ],
  },

  /* ---------------------------------------------
   * Base JavaScript rules (lightweight)
   * --------------------------------------------- */
  js.configs.recommended,

  /* ---------------------------------------------
   * TypeScript defaults (safe)
   * --------------------------------------------- */
  ...tseslint.configs.recommended,

  /* ---------------------------------------------
   * Monorepo source rules
   * --------------------------------------------- */
  {
    files: ['src/apps/**/*.{ts,tsx,js,jsx}', 'src/packages/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      /* style */
      semi: ['error', 'always'],
      quotes: ['error', 'double'],

      /* hygiene */
      'no-console': 'warn',

      /* TypeScript pragmatism */
      '@typescript-eslint/no-explicit-any': 'off', // ✅ allow any
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'unused-imports/no-unused-imports': 'off', // if using eslint-plugin-unused-imports
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
];
