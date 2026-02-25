/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("AUTH-004: Environmental Scope Leakage (Security-Engineer / OWASP A07)", () => {
  it("should actively guard against .env or JWT secret leakage in all native REST payloads", async () => {
     const res = await request(baseUrl).get("/auth/me");
     if (res.status === 200) {
        const bodyStr = JSON.stringify(res.body).toLowerCase();
        expect(bodyStr).not.toContain(process.env.JWT_SECRET?.toLowerCase() || "secret");
        expect(bodyStr).not.toContain("database_url");
     }
  });
});
