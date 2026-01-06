export default [
  {
    files: [
      "src/apps/**/*.{ts,tsx,js,jsx}",
      "src/packages/**/*.{ts,tsx,js,jsx}",
    ],
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
];
