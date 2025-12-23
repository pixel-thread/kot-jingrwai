import { defineConfig, env } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "src/lib/database/prisma/schema.prisma",
  migrations: {
    path: "src/lib/database/prisma/migrations",
    seed: "tsx src/lib/database/prisma/seed.ts",
  },
  datasource: { url: env("DATABASE_URL") },
});
