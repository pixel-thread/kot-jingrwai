import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config({ path: ".env.cypress" });

export default defineConfig({
  allowCypressEnv: true,
  env: {
    apiUrl: process.env.CYPRESS_API_URL || "http://localhost:3000",
    testEmail: process.env.CYPRESS_TEST_EMAIL,
    testPassword: process.env.CYPRESS_TEST_PASSWORD,
  },
  e2e: {
    baseUrl: "http://localhost:3000/api",

    specPattern: "cypress/e2e/**/*.cy.{js,ts}",

    supportFile: "cypress/support/e2e.ts",

    setupNodeEvents(on, config) {
      // You can add custom tasks here later
      return config;
    },
  },

  video: false, // disable if you don't need UI recordings
  screenshotOnRunFailure: false,

  retries: {
    runMode: 1,
    openMode: 0,
  },

  defaultCommandTimeout: 8000,
  requestTimeout: 10000,
});
