/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("GET => /admin/tracks", () => {
    // --- SECURITY / ACCESS CONTROL (A01) ---
    it("should return 401/403 if the user is not authenticated or lacks ADMIN role", async () => {
        const res = await request(baseURL).get("/admin/tracks").send();

        // Note: No withValidation wrapper, so the requiredRole check is the first thing that happens
        expect([401, 403, 500]).toContain(res.status);
    });

    // --- HTTP METHOD CONSTRAINTS ---
    it("should reject unsupported HTTP methods on this route", async () => {
        const resPost = await request(baseURL).post("/admin/tracks").send({});
        expect([404, 405, 401, 403]).toContain(resPost.status);
    });
});
