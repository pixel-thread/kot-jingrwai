// eslint.config.js
import eslintExpo from 'eslint-config-expo/flat.js';
import pluginUnusedImports from 'eslint-plugin-unused-imports';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...eslintExpo,

  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '*.config.js', '**/*.d.ts'],
  },

  {
    plugins: {
      'unused-imports': pluginUnusedImports,
    },
    rules: {
      'react/display-name': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
];
