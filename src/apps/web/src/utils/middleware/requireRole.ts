import { NextRequest } from "next/server";
import { requireAuth } from "./requireAuth";
import { UnauthorizedError } from "../errors/unAuthError";

const ROLE_HIERARCHY = {
  USER: 1,
  ADMIN: 2,
  SUPER_ADMIN: 3,
} as const;

type Role = keyof typeof ROLE_HIERARCHY;

export async function requiredRole(req: NextRequest, requiredRole: Role) {
  const auth = await requireAuth(req);

  // Get the numeric weight of the user's current role and the required role
  const userRoleValue = ROLE_HIERARCHY[auth.role as Role] || 0;
  const requiredRoleValue = ROLE_HIERARCHY[requiredRole];

  // Logic: "Is the user's rank high enough?"
  if (userRoleValue < requiredRoleValue) {
    throw new UnauthorizedError(`Access denied. This action requires ${requiredRole} or higher.`);
  }

  return auth;
}
