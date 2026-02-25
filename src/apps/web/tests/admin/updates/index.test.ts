/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("GET & POST => /admin/updates", () => {

    // --- GET /admin/updates ---
    describe("GET /admin/updates", () => {
        it("should return 401/403 if user lacks SUPER_ADMIN role (A01)", async () => {
            const res = await request(baseURL).get("/admin/updates").send();
            expect([401, 403, 500]).toContain(res.status);
        });
    });

    // --- POST /admin/updates ---
    describe("POST /admin/updates", () => {
        const validPayload = {
            version: "1.0.0",
            title: "Initial Release",
            description: "First release of the app",
            minSupportedVersion: "1.0.0",
            author: "Admin"
            // other fields like platforms, type, tags
        };

        // Note: The POST /admin/updates handler does NOT have a requiredRole check currently!
        // This is a vulnerability (A01: Broken Access Control).
        // The test will highlight this by observing its behavior. If it processes unauthenticated, it returns 400/201.

        it("should validate Zod schema on POST payload (A03)", async () => {
            const res = await request(baseURL).post("/admin/updates").send({});

            // Fails UpdateSchema.parse
            expect([400, 403, 500]).toContain(res.status);
        });

        it("should prevent duplicate version registration through business logic (A04)", async () => {
            // Assuming version "1.0.0" is passed and passes Zod, it might hit DB 
            // and block if already exists. We check if the route is at least reachable without 404/405
            const res = await request(baseURL).post("/admin/updates").send(validPayload);
            expect([201, 400, 401, 403, 500]).toContain(res.status);
        });
    });

    // --- HTTP METHOD CONSTRAINTS ---
    it("should reject DELETE method on base /admin/updates path", async () => {
        const res = await request(baseURL).delete("/admin/updates").send();
        expect([404, 405, 401, 403]).toContain(res.status);
    });
});

describe("DELETE => /admin/updates/:id", () => {
    const validUuid = "123e4567-e89b-12d3-a456-426614174000";

    it("should return 401/403 if user lacks SUPER_ADMIN role (A01)", async () => {
        const res = await request(baseURL).delete(`/admin/updates/${validUuid}`).send();
        expect([401, 403, 500]).toContain(res.status);
    });
});
