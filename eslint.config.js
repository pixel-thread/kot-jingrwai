export default [
  // Match all JS/TS files in apps and packages
  {
    files: [
      "src/apps/**/*.{ts,tsx,js,jsx}",
      "src/packages/**/*.{ts,tsx,js,jsx}",
    ],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
  },
];
