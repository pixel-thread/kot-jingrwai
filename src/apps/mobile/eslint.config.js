/* eslint-env node */
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

import { config } from '@repo/eslint-config/react-native';

module.exports = defineConfig([
  expoConfig,
  ...config,
  {
    ignores: ['dist/*', 'node_modules/*', '.expo'],
  },
  {
    rules: {
      'react/display-name': 'off',
    },
  },
]);
