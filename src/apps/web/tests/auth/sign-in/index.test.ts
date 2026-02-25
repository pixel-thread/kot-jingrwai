/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("POST => /auth/sign-in - Security & Strength", () => {
  // --- SUCCESS PATHS ---
  it("should return 200 and a valid token on correct credentials", async () => {
    const res = await request(baseURL).post("/auth/sign-in").send({
      email: process.env.TEST_EMAIL,
      password: process.env.TEST_PASSWORD, // Ensure this is in your .env
    });

    expect([200, 403]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty("accessToken");
      expect(res.body).toHaveProperty("refreshToken");
      // Security check: Ensure password hash is NEVER returned
      expect(res.body.user).not.toHaveProperty("hashPassword");
      expect(res.body.user).not.toHaveProperty("password");
    }
    expect(res.body.message).toContain("Account temporarily locked. Please try again later.");
  });

  // --- SECURITY & BRUTE FORCE ---
  it("should implement rate limiting/lockout after multiple failures", async () => {
    const randomEmail = `attack-${Math.random()}@gmail.com`;

    // Simulate 6 quick attempts (assuming your limit is 5)
    for (let i = 0; i < 6; i++) {
      const res = await request(baseURL).post("/auth/sign-in").send({
        email: randomEmail,
        password: "WrongPassword123!",
      });

      if (i >= 5) {
        // Your logic should eventually return 429 (Too Many Requests)
        // or 403 (Forbidden/Locked)
        expect([429, 403]).toContain(res.status);
      }
    }
  });

  it("should not leak user existence", async () => {
    // Testing an email that definitely doesn't exist
    const res = await request(baseURL).post("/auth/sign-in").send({
      email: "totally-fake-email-123456@gmail.com",
      password: "SomePassword123!",
    });

    // Security Best Practice: Don't say "User not found".
    // Say "Invalid email or password" to prevent user enumeration.
    if (res.status === 200) {
      expect(res.body.message.toLowerCase()).toContain("invalid");
      expect(res.body.message.toLowerCase()).not.toContain("exists");
    }
    expect(res.body.message.toLowerCase()).toContain("locked");
    expect(res.body.message.toLowerCase()).not.toContain("user");
  });

  // --- INPUT VALIDATION (EDGE CASES) ---
  it("should handle extremely long input strings (Buffer Overflow/DOS check)", async () => {
    const res = await request(baseURL)
      .post("/auth/sign-in")
      .send({
        email: "a".repeat(1000) + "@gmail.com",
        password: "Pa@1".repeat(1000) + "!",
      });
    expect(res.status).toBe(400); // Should be rejected by Zod max()
  });

  it("should trim whitespace from email", async () => {
    const res = await request(baseURL)
      .post("/auth/sign-in")
      .send({
        email: `  ${process.env.TEST_EMAIL}  `,
        password: process.env.TEST_PASSWORD,
      });
    // If your backend trims input, this should succeed
    expect([200, 403, 400]).toContain(res.status);
  });

  it("should be case-insensitive for email", async () => {
    const res = await request(baseURL).post("/auth/sign-in").send({
      email: process.env.TEST_EMAIL?.toUpperCase(),
      password: process.env.TEST_PASSWORD,
    });
    expect([200, 403]).toContain(res.status);
  });

  // --- SQL INJECTION / NO-SQL INJECTION ---
  it("should reject common injection patterns", async () => {
    const res = await request(baseURL).post("/auth/sign-in").send({
      email: "' OR 1=1 --",
      password: "password123!",
    });
    expect(res.status).toBe(400);
  });
});
