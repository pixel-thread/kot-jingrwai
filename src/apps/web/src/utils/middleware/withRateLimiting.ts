import { NextRequest, NextResponse } from "next/server";
import { logger } from "../logger";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@src/env";
import { ErrorResponse } from "../next-response";
import { MiddlewareFactory } from "./stackMiddleware";

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

// Create a new ratelimiter that allows 1 request per 5 seconds
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(1, "5 s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export const withRateLimiting: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next) => {
    // 1. Resolve the Real IP (Prioritize platform-verified IP)
    const realIp = request.headers.get("x-real-ip") ?? "127.0.0.1";

    // 2. Anti-Spoofing Check
    const forwardedFor = request.headers.get("x-forwarded-for");

    if (forwardedFor) {
      const clientIp = forwardedFor.split(",")[0].trim();

      // If the header IP doesn't match the connection IP, it's likely a manual spoof
      // We still rate limit based on the REAL IP to prevent bypass.
      if (clientIp !== realIp && realIp !== "127.0.0.1") {
        logger.warn(`IP Spoofing Attempt: Header reported ${clientIp} but connection is ${realIp}`);
      }
    }

    // 3. Apply Rate Limit using the verified identifier
    const result = await ratelimit.limit(realIp);

    if (!result.success) {
      logger.warn(`Rate limit exceeded for IP: ${realIp}`);

      const res = ErrorResponse({
        message: "Too many requests. Please try again later.",
        status: 429,
      });

      // Standard Rate Limit Headers
      res.headers.set("X-RateLimit-Limit", String(result.limit));
      res.headers.set("X-RateLimit-Remaining", String(result.remaining));
      res.headers.set("X-RateLimit-Reset", String(result.reset));
      res.headers.set("Retry-After", "5");

      return res;
    }

    // 4. Continue the middleware chain
    const response = await next(request, _next);

    // 5. Inject rate limit metadata into the successful response
    if (response instanceof NextResponse) {
      response.headers.set("X-RateLimit-Limit", String(result.limit));
      response.headers.set("X-RateLimit-Remaining", String(result.remaining));
      response.headers.set("X-RateLimit-Reset", String(result.reset));
    }

    return response;
  };
};
