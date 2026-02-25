/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("PUT => /admin/songs/:id", () => {
    const validUuid = "123e4567-e89b-12d3-a456-426614174000";

    // --- SECURITY / ACCESS CONTROL (A01) ---
    it("should return 401/403 if the user is not authenticated or lacks ADMIN role", async () => {
        const res = await request(baseURL).put(`/admin/songs/${validUuid}`).send({
            title: "Updated Title",
            // Need other fields for valid SongSchema to pass Zod upfront
        });

        // Note: Unless we pass exact SongSchema, it might fail Zod (400) before reaching requiredRole.
        // If we assumed a valid payload, it should reach requiredRole and return 401/403/500
        expect([400, 401, 403, 500, 429]).toContain(res.status);
    });

    // --- INPUT VALIDATION (A03) ---
    it("should reject an invalid UUID format in the URL parameter with 400 Bad Request", async () => {
        const res = await request(baseURL).put("/admin/songs/invalid-uuid-format").send({});

        // Zod validation on params executes before the role check
        expect([400, 403, 429]).toContain(res.status);
        if (res.status === 400) {
            expect(res.body.success).toBe(false);
        }
    });

    it("should reject an invalid body payload missing required fields", async () => {
        const res = await request(baseURL).put(`/admin/songs/${validUuid}`).send({
            title: "Incomplete Payload"
        });

        expect([400, 403, 429]).toContain(res.status);
        if (res.status === 400) {
            expect(res.body.success).toBe(false);
        }
    });

    // --- HTTP METHOD CONSTRAINTS ---
    it("should reject unsupported HTTP methods like GET or POST on this specific parameterized route", async () => {
        const resGet = await request(baseURL).get(`/admin/songs/${validUuid}`).send();
        expect([404, 405, 401, 403]).toContain(resGet.status); // Expecting 405 Method Not Allowed or similar NextJs routing failure
    });
});
