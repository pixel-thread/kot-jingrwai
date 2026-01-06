export default {
  "**/*.{js,jsx,ts,tsx}": ["pnpm exec eslint --fix"],
  "**/*.{json,md,yml,yaml}": ["pnpm exec prettier --write"],
};
