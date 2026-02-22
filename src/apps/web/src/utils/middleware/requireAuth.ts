import { NextRequest } from "next/server";
import { UnauthorizedError } from "../errors/unAuthError";
import { JWT } from "@libs/auth/jwt";
import { AuthServices } from "@src/services/auth";
import { AccountLockServices } from "@/services/auth/lock";

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

  const now = new Date();
  //  Check if account is currently locked
  // lockedUntil >= now means user is still locked
  const lockedAccount = await AccountLockServices.findFirst({
    where: { email: auth?.email, lockedUntil: { gte: now } },
  });

  if (lockedAccount) {
    throw new UnauthorizedError("Account temporarily locked. Please try again later.");
  }

  if (!auth) {
    throw new UnauthorizedError("Unauthorized");
  }

  return auth.user;
}
