import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    specPattern: "cypress/e2e/**/*.cy.ts",
    excludeSpecPattern: ["**/[[]*[]].cy.ts"],
  },
  video: false,
  chromeWebSecurity: false,
});
