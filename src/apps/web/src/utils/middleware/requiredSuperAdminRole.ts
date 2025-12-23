import { NextRequest } from "next/server";
import { requiredAuthToken } from "./requiredAuthToken";
import { UnauthorizedError } from "@/utils/errors/unAuthError";

export async function requiredSuperAdminRole(req: NextRequest) {
  const user = await requiredAuthToken(req);

  if (user?.role !== "SUPER_ADMIN") {
    throw new UnauthorizedError("Unauthorized");
  }

  return user;
}
