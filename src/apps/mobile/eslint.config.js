/* eslint-env node */
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", "node_modules/*", ".expo"],
  },
  {
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
        },
      },
    },
  },
  {
    rules: {
      "react/display-name": "off",
      "import/no-unresolved": "off",
      "no-unused-vars": "warn",
      "no-unused-expressions": "warn",
      "react-hooks/rules-of-hooks": "warn",
    },
  },
]);
