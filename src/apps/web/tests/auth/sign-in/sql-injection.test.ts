/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("POST => /auth/sign-in - Advanced SQL Injection", () => {
  const injectionPatterns = [
    { name: "Classic Tautology", email: "' OR '1'='1" },
    { name: "Comment-out rest of query", email: "admin@gmail.com'--" },
    { name: "Union Based", email: "admin@gmail.com' UNION SELECT password FROM User--" },
    { name: "Semicolon Stacking", email: 'admin@gmail.com\'; DROP TABLE "User"--' },
    {
      name: "JSON Injection (PostgreSQL specific)",
      email: "admin@gmail.com' || (SELECT 'a')::text--",
    },
    { name: "Subquery Injection", email: "admin@gmail.com' AND (SELECT 1)=1--" },
  ];

  injectionPatterns.forEach(({ name, email }) => {
    it(`should reject ${name} pattern`, async () => {
      const res = await request(baseURL).post("/auth/sign-in").send({
        email: email,
        password: "ValidPassword@123",
      });

      // Expect 400 (Zod validation failure) or 401 (Prisma found nothing)
      expect([400, 401]).toContain(res.status);
      expect(res.status).not.toBe(500);
    });
  });

  it("should handle NoSQL-style injection if using MongoDB/JSON fields", async () => {
    const res = await request(baseURL)
      .post("/auth/sign-in")
      .send({
        email: { $gt: "" }, // Common MongoDB bypass
        password: "@Password123!",
      });

    // Zod should catch that 'email' is an object, not a string
    expect(res.status).toBe(400);
  });
  // 1. Unicode & Homograph Attacks
  it("should not confuse look-alike unicode characters", async () => {
    // Using a Cyrillic 'а' (U+0430) instead of Latin 'a'
    const homographEmail = "testuser@gmаil.com";
    const res = await request(baseURL).post("/auth/sign-in").send({
      email: homographEmail,
      password: process.env.TEST_PASSWORD,
    });

    // Should be 401/404 because this is technically a different email
    expect([401, 400]).toContain(res.status);
  });

  // 2. Large Payload DOS (Denial of Service)
  it("should reject massive payloads before processing", async () => {
    const massivePayload = {
      email: "test@gmail.com",
      password: "a".repeat(10000), // 10KB password
      extraData: "b".repeat(50000),
    };

    const res = await request(baseURL).post("/auth/sign-in").send(massivePayload);

    // Should be 413 (Payload Too Large) or 400 (Zod validation limit)
    expect([400, 413]).toContain(res.status);
  });

  // 3. Blind Timing Attack (Constant Time comparison)
  it("should take roughly the same time for valid vs invalid users", async () => {
    const startInvalid = Date.now();
    await request(baseURL).post("/auth/sign-in").send({
      email: "non-existent-user-123@gmail.com",
      password: "Password123!",
    });
    const durationInvalid = Date.now() - startInvalid;

    const startValid = Date.now();
    await request(baseURL).post("/auth/sign-in").send({
      email: process.env.TEST_EMAIL,
      password: "WrongPasswordForValidUser123!",
    });
    const durationValid = Date.now() - startValid;

    // The difference should be minimal (e.g., < 100ms)
    // to prevent attackers from guessing which emails exist based on server lag.
    const diff = Math.abs(durationValid - durationInvalid);
    expect(diff).toBeLessThan(150);
  });
});
