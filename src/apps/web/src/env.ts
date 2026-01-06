import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url("DATABASE_URL"),
    CLERK_SECRET_KEY: z.string("CLERK_SECRET_KEY"),
    SUPABASE_SECRET_KEY: z.string("SUPABASE_KEY"),
    SUPABASE_BUCKET: z.string("SUPABASE_BUCKET"),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string("NEXT_PUBLIC_BASE_URL").min(1),
    NEXT_PUBLIC_APP_NAME: z.string("NEXT_PUBLIC_APP_NAME").min(1),
    NEXT_PUBLIC_API_URL: z.string("NEXT_PUBLIC_API_URL").min(1),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY").min(1),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
    SUPABASE_BUCKET: process.env.SUPABASE_BUCKET,
  },
});
