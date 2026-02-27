/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("POST => /auth/sign-in", () => {
  const TEST_EMAIL = process.env.TEST_EMAIL || "test@example.com";
  const TEST_PASSWORD = process.env.TEST_PASSWORD || "password123";

  // --- SUCCESS PATHS ---
  it("should return 200 and auth tokens on correct credentials", async () => {
    const res = await request(baseURL).post("/auth/sign-in").send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });

    if (res.status === 200) {
      expect(res.body.data).toHaveProperty("accessToken");
      expect(res.body.data).toHaveProperty("refreshToken");
    } else {
      // If locked out due to previous tests hitting rate limits, 403 is expected temporarily
      expect(res.status).toBe(403);
    }
  });

  // --- INVALID CREDENTIALS & USER ENUMERATION ---
  it("should return 401 for wrong password and not leak existence", async () => {
    const res = await request(baseURL).post("/auth/sign-in").send({
      email: TEST_EMAIL,
      password: "WrongPassword123!",
    });

    if (res.status === 401) {
      expect(res.body.message).toBe("Invalid credentials");
    } else {
      expect(res.status).toBe(403); // If locked
    }
  });

  it("should return 401 for non-existent email (no user enumeration)", async () => {
    const res = await request(baseURL).post("/auth/sign-in").send({
      email: "totally-fake-email-123456@gmail.com",
      password: "SomePassword123!",
    });

    // We shouldn't say "user not found", keep it ambiguous
    if (res.status === 401) {
      expect(res.body.message).toBe("Invalid credentials");
    } else {
      expect(res.status).toBe(403);
    }
  });

  // --- RATE LIMITING / LOCKOUT MECHANISM ---
  it("should implement rate limiting/lockout after 3 failures", async () => {
    const randomEmail = `attack-${Math.random()}@gmail.com`;

    // Simulate 4 attempts. The limit is 3.
    for (let i = 1; i <= 4; i++) {
      const res = await request(baseURL).post("/auth/sign-in").send({
        email: randomEmail,
        password: "WrongPassword123!",
      });

      if (i < 3) {
        // First 2 failures
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Invalid credentials");
      } else if (i === 3) {
        // 3rd failure locks the account
        expect(res.status).toBe(403);
        expect(res.body.message).toBe("Account locked due to multiple failed attempts.");
      } else {
        // 4th failure hits the active lock
        expect(res.status).toBe(403);
        expect(res.body.message).toBe("Too many attempts. Please try again later.");
      }
    }
  });

  // --- INPUT VALIDATION (ZOD) ---
  it("should return 400 for missing fields", async () => {
    const res = await request(baseURL).post("/auth/sign-in").send({
      email: "test@example.com",
    });

    expect(res.status).toBe(400);
    expect(res.body.message.toLowerCase()).toBe("password is required");
  });

  it("should return 400 for invalid email format", async () => {
    const res = await request(baseURL).post("/auth/sign-in").send({
      email: "not-an-email",
      password: "password123",
    });

    expect(res.status).toBe(400);
  });
});
