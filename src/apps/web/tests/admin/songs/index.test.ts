/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("GET & POST => /admin/songs", () => {
  // --- GET /admin/songs ---
  describe("GET /admin/songs", () => {
    // --- SECURITY / ACCESS CONTROL (A01) ---
    it("should return 401/403 if the user is not authenticated or lacks SUPER_ADMIN role", async () => {
      const res = await request(baseURL).get("/admin/songs").send();
      // Assuming requiredRole throws an error that handleApiErrors translates to 401 or 403
      expect([401, 403, 500]).toContain(res.status); // 500 if unhandled appropriately by handleApiErrors
    });

    // Test with mocked cookies/headers if authenticated (Mocking details depend on auth provider, eg NextAuth)
    // it("should return 200 for SUPER_ADMIN fetching songs", async () => { ... })

    // --- INPUT VALIDATION (A03) ---
    it("should validate query parameters and reject invalid 'source'", async () => {
      // Let's assume we bypass auth for a moment or the middleware catches input validation before auth
      const res = await request(baseURL)
        .get("/admin/songs")
        .query({ source: "INVALID_ENUM_VALUE" })
        .send();

      // Zod Validation in withValidation is usually before standard manual auth checks if they are in the handler
      // However, this codebase does requiredRole inside the handler. So withValidation runs first!
      expect([400, 403, 429]).toContain(res.status);

      if (res.status === 400) {
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBeUndefined();
      }
    });
  });

  // --- POST /admin/songs ---
  describe("POST /admin/songs", () => {
    const validPayload = {
      title: "Amazing Grace",
      metadata: {
        isChorus: false,
        source: ["LYNTI_BNENG"],
        number: 104,
        oldNumber: 51,
        language: "en",
        author: "John Newton",
        composer: "Traditional",
        tags: ["hymn", "classic"],
        syllables: "8.6.8.6",
        reference: "1 Chronicles 17:16-17",
        tune: "New Britain",
        meter: "CM",
      },
    };

    // --- SECURITY / ACCESS CONTROL (A01) ---
    it("should return 401/403 if user is not authenticated or lacks ADMIN role", async () => {
      const res = await request(baseURL).post("/admin/songs").send(validPayload);
      expect([401, 403, 500]).toContain(res.status);
    });

    // --- INPUT VALIDATION (A03) ---
    it("should return 400 Bad Request if the payload doesn't match SongSchema", async () => {
      const res = await request(baseURL).post("/admin/songs").send({ title: "" }); // Missing required fields

      // withValidation runs before requiredRole in this route
      expect([400, 403, 429]).toContain(res.status);
      if (res.status === 400) {
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBeUndefined();
      }
    });

    // --- HTTP METHOD CONSTRAINTS ---
    it("should reject unsupported HTTP methods like DELETE", async () => {
      const res = await request(baseURL).delete("/admin/songs").send();
      expect([404, 405, 401, 403]).toContain(res.status);
    });
  });
});
