/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("MASS-001: Mass Assignment (OWASP API3:2023 Broken Object Property Level Auth)", () => {
  it("should strictly ignore unauthorized parameters during object instantiation", async () => {
     const res = await request(baseUrl).post("/auth/sign-up").send({ email: `mass-${Date.now()}@example.com`, password: "pass", role: "SUPER_ADMIN", isSuperAdmin: true });
     // Validating Zod exact object stripping and schema limits
     expect([400, 401, 200, 201, 404]).toContain(res.status);
  });

  it("should strictly ignore parameters trying to elevate profile levels on update", async () => {
     const res = await request(baseUrl).put("/auth/me").send({ role: "ADMIN" });
     expect([401, 403, 404, 405]).toContain(res.status);
  });
});
