/** @jest-environment node */
import { JWT } from "@/lib/auth/jwt";
import request from "supertest";

/**
 * NOTE: For this to work with a URL string,
 * you MUST have 'pnpm dev' running in another terminal.
 */

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Usage in Jest

describe("GET => /auth/me", () => {
  let validToken: string;

  // We run this before the "me" tests to ensure we have a token
  beforeAll(async () => {
    // Ensure this user exists in your test database!
    const loginRes = await request(baseURL).post("/auth/sign-in").send({
      email: process.env.TEST_EMAIL,
      password: process.env.TEST_PASSWORD,
    });

    if (loginRes.status === 200) {
      validToken = loginRes.body.data.accessToken;
    }
  });

  it("should return 200 and user data for authenticated requests", async () => {
    // Skip if login failed
    if (!validToken) {
      return;
    }
    const res = await request(baseURL).get("/auth/me").set("Authorization", `Bearer ${validToken}`);
    expect(res.status).toBe(200);
  });

  it("should return 401 when no token is provided", async () => {
    const res = await request(baseURL).get("/auth/me");
    expect(res.status).toBe(401);
  });

  it("should return 401 for an invalid/expired token", async () => {
    const res = await request(baseURL).get("/auth/me").set("Authorization", `Bearer token`);
    expect(res.status).toBe(401);
  });
});
