/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("AUTHZ-002: Function Level Auth (OWASP API5:2023 Broken Function Level Auth)", () => {
  it("should strictly block non-admins from all admin routes", async () => {
     const routes = ["/admin/songs", "/admin/tracks", "/admin/tracks/upload", "/admin/users/app-users"];
     for (const route of routes) {
        const res = await request(baseUrl).get(route);
        expect([401, 403, 404]).toContain(res.status);
     }
  });

  it("should reject HTTP verb tampering (e.g. bypassing GET with POST/OPTIONS on restricted data)", async () => {
     const resOptions = await request(baseUrl).options("/admin/users/app-users");
     const resPost = await request(baseUrl).post("/admin/users/app-users").send({});
     expect([401, 403, 404, 405]).toContain(resOptions.status);
     expect([401, 403, 404, 405]).toContain(resPost.status);
  });
});
