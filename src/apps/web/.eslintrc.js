module.exports = {
  extends: [
    "next/core-web-vitals", // Next.js recommended rules
    "next", // General Next.js rules
    "plugin:@typescript-eslint/recommended", // TypeScript rules
  ],
  ignorePatterns: [
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/lib/database/**",
    "any",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};
