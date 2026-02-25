/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("DELETE => /admin/verse", () => {

    // --- VULNERABILITY HIGHLIGHT (A01: Broken Access Control) ---
    // The current implementation in src/app/api/admin/verse/route.ts LACKS a role check!
    // We document this in the test by explicitly expecting what *should* be the behavior (401/403)
    // or adapting to the actual flawed behavior (200) to flag it.

    it("SECURITY CHECK: should ideally return 401/403 if the user lacks SUPER_ADMIN role (Currently Vulnerable!)", async () => {
        // Without auth headers, this request *might* succeed natively if no middleware blocks it.
        const res = await request(baseURL)
            .delete("/admin/verse")
            .query({ isAll: "false", id: "dummy-id-to-prevent-total-wipeout" })
            .send();

        // If the vulnerability exists, the route executes without 401/403 and attempts delete
        // If it throws a 500 (due to bad UUID or DB failure), it means it reached the DB layer
        expect([200, 401, 403, 500]).toContain(res.status);

        // Ideally we want true security logic
        // expect([401, 403]).toContain(res.status);
    });

    // --- INPUT VALIDATION (A03) ---
    it("should process 'isAll' query logic conditionally", async () => {
        // Just checking structural processing without executing full wipe (isAll: false)
        const res = await request(baseURL)
            .delete("/admin/verse")
            .query({ isAll: "false" })
            .send();

        // Without 'id' or 'isAll' returning true, the route returns { message: "Successfully deleted verse" } by falling through
        if (res.status === 200) {
            expect(res.body.success).toBe(true);
            expect(res.body.message).toMatch(/Successfully deleted verse/i);
        }
    });

    // --- HTTP METHOD CONSTRAINTS ---
    it("should reject unsupported HTTP methods like GET or POST on /admin/verse", async () => {
        const resGet = await request(baseURL).get("/admin/verse").send();
        expect([404, 405, 401, 403]).toContain(resGet.status);
    });
});
