import { NextRequest } from "next/server";
import { ErrorResponse } from "../next-response";
import { logger } from "../logger";
import { MiddlewareFactory } from "./stackMiddleware";
import { JWT } from "@/lib/auth/jwt";

const routeWithOutAuth = ["/api/auth/**"];

// check if /auth/** return true for all the route
const checkIsPublicRoute = (path: string) => {
  return routeWithOutAuth.some((pattern) => {
    if (pattern.endsWith("/**")) {
      const base = pattern.replace("/**", "");
      return path === base || path.startsWith(base + "/");
    }
    return path === pattern;
  });
};

export const withApiAuth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next) => {
    const path = request.nextUrl.pathname;
    const isRefreshRoute = path === "/api/auth/refresh";

    const isPublicRoute = checkIsPublicRoute(path);

    if (isPublicRoute || isRefreshRoute) {
      return next(request, _next);
    }

    const header = request.headers.get("Authorization");

    const token = header?.split(" ")[1];

    if (!token) {
      logger.log("withAuthApi: No token found");
      return ErrorResponse({
        message: "Unauthorized",
        status: 401,
      });
    }

    try {
      await JWT.verifyAccessToken(token);
    } catch (error) {
      logger.log("withAuthApi: Invalid token", error);
      return ErrorResponse({
        message: "Unauthorized: Invalid token",
        status: 401,
      });
    }

    return next(request, _next);
  };
};
