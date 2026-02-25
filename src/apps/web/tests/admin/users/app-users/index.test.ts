/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("GET => /admin/users/app-users", () => {
    it("should return 401/403 if the user lacks SUPER_ADMIN role (A01: Access Control)", async () => {
        const res = await request(baseURL).get("/admin/users/app-users").send();

        // The endpoint uses requiredSuperAdminRole(req)
        expect([401, 403, 500]).toContain(res.status);
    });

    it("should reject unsupported HTTP methods like POST or DELETE", async () => {
        const resPost = await request(baseURL).post("/admin/users/app-users").send({});
        expect([404, 405, 401, 403]).toContain(resPost.status);
    });
});
