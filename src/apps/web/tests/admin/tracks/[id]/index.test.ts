/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("DELETE => /admin/tracks/:id", () => {
  const validUuid = "73ef6a15-533e-4df1-9b12-0b224c8a5c7d";

  // --- SECURITY / ACCESS CONTROL (A01) ---
  it("should block request if user lacks SUPER_ADMIN role", async () => {
    const res = await request(baseURL).delete(`/admin/tracks/${validUuid}`).send();
    // Zod withValidation runs first, successfully parses UUID.
    // Then requiredRole("SUPER_ADMIN") runs.
    expect([401, 403, 500]).toContain(res.status);
  });

  // --- INPUT VALIDATION (A03) ---
  it("should reject invalid UUID identifiers", async () => {
    const invalidUuid = "not-a-real-uuid";
    const res = await request(baseURL).delete(`/admin/tracks/${invalidUuid}`).send();

    // Zod catches this before auth
    expect([400, 429]).toContain(res.status);
    if (res.status === 400) {
      expect(res.body.success).toBe(false);
    }
  });

  // --- HTTP METHOD CONSTRAINTS ---
  it("should reject methods other than DELETE on this parametric route", async () => {
    const resGet = await request(baseURL).get(`/admin/tracks/${validUuid}`).send();
    expect([404, 405, 401, 403]).toContain(resGet.status);
  });
});
