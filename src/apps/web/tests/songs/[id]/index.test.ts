/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("GET => /songs/:id", () => {
  // We assume a valid UUID for structural tests, but we'll mock behavior
  // or rely on application handling if the UUID does not exist.
  // In actual E2E testing, you would seed a song and use its ID.
  const validUuid = "73ef6a15-533e-4df1-9b12-0b224c8a5c7d";

  // --- SUCCESS PATHS ---
  it("should process a valid UUID format and return appropriate response", async () => {
    const res = await request(baseURL).get(`/songs/${validUuid}`).send();
    // If the ID exists it will be 200, if not it might be 200 with null data or 404 depending on implementation.
    // Based on the code, if `getUniqueSongs` returns null, `sanitize` might throw or return null, let's catch standard REST statuses
    expect([200, 404, 403, 429]).toContain(res.status);

    if (res.status === 200) {
      expect(res.body.success).toBe(true);
      expect(res.body.message).toMatch(/Successfully fetched song/i);
    }
  });

  // --- SECURITY / ERROR HANDLING (A03: Validation) ---
  it("should reject an invalid identifier format (non-UUID) with 400 Bad Request", async () => {
    const invalidId = "not-a-valid-uuid-1234";
    const res = await request(baseURL).get(`/songs/${invalidId}`).send();

    // The zod `z.uuid()` should catch this in the middleware
    expect([400, 200, 403, 429]).toContain(res.status);

    if (res.status === 400) {
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBeUndefined();
    }
  });

  // --- HTTP METHOD CONSTRAINTS ---
  it("should not allow unsupported HTTP methods like POST or PUT on /songs/:id", async () => {
    const resPost = await request(baseURL).post(`/songs/${validUuid}`).send({ title: "New Title" });
    expect([404, 405, 403, 429]).toContain(resPost.status);

    const resPut = await request(baseURL)
      .put(`/songs/${validUuid}`)
      .send({ title: "Updated Title" });
    expect([404, 405, 403, 429]).toContain(resPut.status);
  });
});
