import { env } from "@/env";
import { createClerkClient } from "@clerk/backend";

export const clientClerk = createClerkClient({
  secretKey: env.CLERK_SECRET_KEY,
  publishableKey: env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
});
