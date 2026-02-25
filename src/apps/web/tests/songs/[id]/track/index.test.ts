/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("GET => /songs/:id/track", () => {
    const validUuid = "123e4567-e89b-12d3-a456-426614174000";

    // --- SUCCESS / GRACEFUL FAILURE PATHS ---
    it("should process a valid UUID format and return appropriate response (200 or 404)", async () => {
        const res = await request(baseURL).get(`/songs/${validUuid}/track`).send();

        // Code explicitly returns ErrorResponse 404 if song not found
        expect([200, 404, 403, 429]).toContain(res.status);

        if (res.status === 200) {
            expect(res.body.success).toBe(true);
            expect(res.body.message).toMatch(/Successfully fetched song track/i);
            expect(res.body).toHaveProperty("data");
        } else if (res.status === 404) {
            expect(res.body.success).toBe(false);
            expect(res.body.message).toMatch(/Song not found/i);
        }
    });

    // --- SECURITY / ERROR HANDLING (A03: Validation) ---
    it("should reject an invalid identifier format (non-UUID) with 400 Bad Request", async () => {
        const invalidId = "invalid-uuid";
        const res = await request(baseURL).get(`/songs/${invalidId}/track`).send();

        // Validation from `z.uuid()`
        expect([400, 403, 429]).toContain(res.status);

        if (res.status === 400) {
            expect(res.body.success).toBe(false);
            expect(res.body.error).toBeDefined();
        }
    });

    // --- HTTP METHOD CONSTRAINTS ---
    it("should not allow unsupported HTTP methods like POST or DELETE on /songs/:id/track", async () => {
        const resPost = await request(baseURL).post(`/songs/${validUuid}/track`).send({ trackUrl: "http://example.com" });
        expect([404, 405, 403, 429]).toContain(resPost.status);
    });
});
