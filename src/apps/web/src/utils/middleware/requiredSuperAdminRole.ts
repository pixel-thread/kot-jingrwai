import { NextRequest } from "next/server";
import { requireAuth } from "./requireAuth";
import { UnauthorizedError } from "@/utils/errors/unAuthError";

export async function requiredSuperAdminRole(req: NextRequest) {
  const user = await requireAuth(req);

  if (user?.role !== "SUPER_ADMIN") {
    throw new UnauthorizedError("Unauthorized");
  }

  return user;
}
