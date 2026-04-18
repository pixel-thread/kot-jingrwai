import { NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./stackMiddleware";
import { env } from "@src/env";
import { logger } from "../logger";

// Base origins combining Dev/Localhost and the Production API Domain securely
const allowedOrigins = [
  "http://localhost:3000",
  env.NEXT_PUBLIC_BASE_URL,
  env.NEXT_PUBLIC_API_URL,
].filter(Boolean); // Filter out any undefined/invalid env mappings securely

export const withCORS: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next) => {
    // 1. Extract Origin. Note: S2S or Mobile Clients often don't send Origin, which standard CORS allows
    const origin = request.headers.get("origin");

    // Only validate if Origin is explicitly present (Browser/Fetch contexts)
    if (origin) {
      const isAllowedOrigin = allowedOrigins.includes(origin);

      if (!isAllowedOrigin) {
        logger.warn(`[CORS] Rejected unauthorized origin boundary crossing: ${origin}`);

        // Fail-closed instantly at the Edge saving Server resources (Security-Engineer Audit Fix)
        return NextResponse.json(
          { error: "Forbidden", message: "Origin not allowed by CORS policy." },
          { status: 403 }
        );
      }
    }

    // 2. Handle Preflight (OPTIONS) requests safely
    if (request.method === "OPTIONS") {
      // If we made it here, origin is either Empty (Allowed) or Validated
      const response = new NextResponse(null, { status: 404 });

      if (origin) {
        response.headers.set("Access-Control-Allow-Origin", origin);
      } else {
        // Fallback for strict wildcard contexts, ideally never triggered if origin checked
        response.headers.set("Access-Control-Allow-Origin", "*");
      }

      response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, x-api-key"
      );
      response.headers.set("Access-Control-Max-Age", "86400"); // 24 hours cache

      return response;
    }

    // 3. Handle Actual Request
    const response = await next(request, _next);

    // 4. Append successful headers returning up the middleware chain
    if (origin) {
      response?.headers.set("Access-Control-Allow-Origin", origin);
    }

    response?.headers.set("Vary", "Origin");

    return response;
  };
};
