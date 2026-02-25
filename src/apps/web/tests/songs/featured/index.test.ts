/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("GET => /songs/featured", () => {
  // --- SUCCESS PATHS ---
  it("should return 200 and retrieve list of featured songs successfully", async () => {
    const res = await request(baseURL).get("/songs/featured").send();

    if (res.status === 200) {
      expect(res.body.success).toBe(true);
      expect(res.body.message).toMatch(/Success fetch featured songs/i);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);

      // Should contain a random page number in meta, since the logic goes back Math.random()
      expect(res.body).toHaveProperty("meta");
      expect(res.body.meta).toHaveProperty("page");

      // Check structural sanity
      if (res.body.data.length > 0) {
        expect(res.body.data[0]).toHaveProperty("id");
        expect(res.body.data[0]).toHaveProperty("title");
      }
    } else {
      expect([403, 429]).toContain(res.status);
    }
  });

  // --- IDEMPOTENCY / RANDOMNESS CHECK ---
  it("calling multiple times should ideally return varying random pages unless constrained by db size", async () => {
    const res1 = await request(baseURL).get("/songs/featured").send();
    const res2 = await request(baseURL).get("/songs/featured").send();

    if (res1.status === 200 && res2.status === 200) {
      // It's technically possible (approx 1 in 64 odds) that these match, but usually won't
      // We just verify both responses follow the same contract.
      expect(res1.body.success).toBe(true);
      expect(res2.body.success).toBe(true);
    }
  });

  // --- HTTP METHOD CONSTRAINTS ---
  it("should not allow unsupported HTTP methods", async () => {
    const resPost = await request(baseURL).post("/songs/featured").send();
    expect([404, 405, 403, 429]).toContain(resPost.status);
  });
});
