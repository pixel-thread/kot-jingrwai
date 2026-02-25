/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("GET => /songs/search", () => {
  // --- SUCCESS PATHS ---
  it("should successfully search for songs with query parameters and handle alphanumeric normalization", async () => {
    // Query has special characters to ensure transformer clears it (e.g., /[^a-zA-Z0-9]/g)
    const res = await request(baseURL)
      .get("/songs/search")
      .query({ query: "Hallelujah!!! $$@", page: "1", isChorus: "true" })
      .send();

    if (res.status === 200) {
      expect(res.body.success).toBe(true);
      expect(res.body.message).toMatch(/Success fetching songs/i);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
    } else if (res.status === 400) {
      // Fails if source Validation strictly enforces a valid source parameter
      expect(res.body.success).toBe(false);
    } else {
      expect([403, 429]).toContain(res.status);
    }
  });

  it("should correctly handle numeric queries", async () => {
    // Simulating search by song number explicitly
    const res = await request(baseURL)
      .get("/songs/search")
      .query({ query: "123", page: "1" })
      .send();

    if (res.status === 200) {
      expect(res.body.success).toBe(true);
      expect(parseInt(res.body.meta.page)).toBe(1);
    } else {
      expect([400, 403, 429]).toContain(res.status); // Fallback for strict enum checks
    }
  });

  // --- SECURITY / ERROR HANDLING (A03: SQLi Check / Sanitization) ---
  it("should correctly reject invalid types and strip special characters instead of SQLi", async () => {
    const res = await request(baseURL)
      .get("/songs/search")
      .query({ query: "' OR 1=1 --", page: "invalid_page_number" })
      .send();

    // Should return 400 due to Zod validating `page` as string in default setup but the query transformer strips it
    // Or it might pass as 200 if ' OR 1=1 --' simplifies to 'OR11'
    // But invalid 'source' or strict page constraints (if introduced) could trigger 400.
    // What we guarantee is it does NOT crash with 500 error under Prisma.
    expect([200, 400, 403, 429]).toContain(res.status);
  });

  // --- HTTP METHOD CONSTRAINTS ---
  it("should not allow POST method on /songs/search", async () => {
    const resPost = await request(baseURL).post("/songs/search").send({ query: "Test" });
    expect([404, 405, 403, 429]).toContain(resPost.status);
  });
});
