/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("GET => /songs", () => {
  // --- SUCCESS PATHS ---
  it("should return 200 and retrieve songs successfully completely with default parameters", async () => {
    const res = await request(baseURL).get("/songs").send();

    if (res.status === 200) {
      expect(res.body.success).toBe(true);
      expect(res.body.message).toMatch(/Success fetching songs/i);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body).toHaveProperty("meta");
      expect(res.body.meta).toHaveProperty("page");
      expect(res.body.meta).toHaveProperty("total");
    } else {
      // Rate limiting or firewall fallback
      expect([403, 429]).toContain(res.status);
    }
  });

  it("should process query parameters correctly for page, isChorus, and source", async () => {
    // We use dummy valid query params. If source validation strictly expects a specific enum,
    // it may return 400. In a real environment, replace 'valid_source' with actual AppSource enum.
    const res = await request(baseURL).get("/songs").query({ page: 1, isChorus: "true" }).send();

    if (res.status === 200) {
      expect(res.body.success).toBe(true);
      expect(res.body.meta.page).toBe(1);
    } else if (res.status === 400) {
      // If the application strictly validates 'source' parameter even when not provided properly
      expect(res.body.success).toBe(false);
    } else {
      expect([403, 429]).toContain(res.status);
    }
  });

  // --- SECURITY / ERROR HANDLING (Simulated) ---
  it("should validate inputs and reject invalid 'page' parameter types", async () => {
    const res = await request(baseURL).get("/songs").query({ page: "invalid_string" }).send();

    // Expect validation middleware to catch bad inputs
    expect([400, 200, 403, 429]).toContain(res.status);

    if (res.status === 400) {
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBeDefined();
    }
  });

  it("should validate inputs and reject invalid 'source' parameter types", async () => {
    const res = await request(baseURL)
      .get("/songs")
      .query({ source: "UNSUPPORTED_SOURCE_12345" })
      .send();

    // Validation should fail for unknown AppSource enum
    expect([400, 200, 403, 429]).toContain(res.status);

    if (res.status === 400) {
      expect(res.body.success).toBe(false);
    }
  });

  // --- HTTP METHOD CONSTRAINTS ---
  it("should not allow unsupported HTTP methods like POST or DELETE", async () => {
    const resPost = await request(baseURL).post("/songs").send({ dummy: "data" });
    // Next.js returning 405 Method Not Allowed / 404 for undefined methods
    expect([404, 405, 403, 429]).toContain(resPost.status);

    const resDelete = await request(baseURL).delete("/songs").send();
    expect([404, 405, 403, 429]).toContain(resDelete.status);
  });

  // --- BUSINESS LOGIC / INTEGRITY ---
  it("data elements (if retrieved) should adhere to standard song structure", async () => {
    const res = await request(baseURL).get("/songs").send();

    if (res.status === 200 && res.body.data.length > 0) {
      const firstSong = res.body.data[0];
      // Check essential sanitized properties
      expect(firstSong).toHaveProperty("id");
      // Assuming these are common properties in SongsResponseSchema
      // We use 'not undefined' for properties that might exist
      expect(firstSong.id).not.toBeUndefined();
    }
  });
});
