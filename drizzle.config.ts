import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/libs/db/drizzle/schema.ts',
  out: './src/libs/db/drizzle/migrations',
  dialect: 'sqlite',
  driver: 'expo', // <--- very important
});
