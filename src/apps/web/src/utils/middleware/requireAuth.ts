import { NextRequest } from "next/server";
import { UnauthorizedError } from "../errors/unAuthError";
import { JWT } from "@libs/auth/jwt";
import { AuthServices } from "@src/services/auth";

export async function requireAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const accessToken = authHeader?.split(" ")[1];

  if (!accessToken) {
    throw new UnauthorizedError("Unauthorized");
  }

  const claims = await JWT.verifyAccessToken(accessToken);

  if (!claims) {
    throw new UnauthorizedError("Unauthorized");
  }

  // Try to find user
  const auth = await AuthServices.getUnique({
    where: { userId: claims.userId },
  });

  if (!auth) {
    throw new UnauthorizedError("Unauthorized");
  }

  return auth;
}
