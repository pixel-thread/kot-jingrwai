import { NextRequest } from "next/server";
import { UnauthorizedError } from "@/utils/errors/unAuthError";
import { requireAuth } from "./requireAuth";

export async function requiredAdmin(req: NextRequest) {
  const auth = await requireAuth(req);

  if (auth.role !== "SUPER_ADMIN" && auth.role !== "ADMIN") {
    throw new UnauthorizedError("Unauthorized");
  }

  return auth;
}
