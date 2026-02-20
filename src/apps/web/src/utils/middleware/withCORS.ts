import { NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./stackMiddleware";

const allowedOrigins = ["https://localhost:3001"];

export const withCORS: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next) => {
    const origin = request.headers.get("origin") ?? "";
    const isAllowedOrigin = allowedOrigins.includes(origin);

    // 1. Handle Preflight (OPTIONS) requests
    if (request.method === "OPTIONS") {
      const response = new NextResponse(null, { status: 204 });

      if (isAllowedOrigin) {
        response.headers.set("Access-Control-Allow-Origin", origin);
      }

      response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, x-api-key"
      );
      response.headers.set("Access-Control-Max-Age", "86400"); // 24 hours cache

      return response;
    }

    // 2. Handle Actual Request
    const response = await next(request, _next);

    // Add CORS headers to the response coming back up the chain
    if (isAllowedOrigin) {
      response?.headers.set("Access-Control-Allow-Origin", origin);
    }

    // Always good to vary by origin if you have multiple allowed
    response?.headers.set("Vary", "Origin");

    return response;
  };
};
