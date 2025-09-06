import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/db/drizzle/migrations',
  schema: './src/db/drizzle/schema.ts',
  dialect: 'sqlite',
  driver: 'expo',
});
