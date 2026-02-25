/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("AUTH-002: JWT Tampering (OWASP API2:2023 Broken Authentication)", () => {
  const TARGET_ENDPOINT = "/auth/me";

  it("should reject tampered token signatures instantly", async () => {
    const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString('base64');
    const payload = Buffer.from(JSON.stringify({ userId: "123", role: "SUPER_ADMIN" })).toString('base64');
    const fakeToken = `${header}.${payload}.faketamsignature123`;
    const res = await request(baseUrl).get(TARGET_ENDPOINT).set("Authorization", `Bearer ${fakeToken}`);
    expect([401, 403]).toContain(res.status);
  });

  it("should mitigate 'alg: none' vulnerability", async () => {
     const header = Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" })).toString('base64');
     const payload = Buffer.from(JSON.stringify({ userId: "123" })).toString('base64');
     const fakeToken = `${header}.${payload}.`;
     const res = await request(baseUrl).get(TARGET_ENDPOINT).set("Authorization", `Bearer ${fakeToken}`);
     expect([401, 403]).toContain(res.status);
  });
  
  it("should safely reject entirely malformed (e.g. non-JWT) tokens", async () => {
     const res = await request(baseUrl).get(TARGET_ENDPOINT).set("Authorization", `Bearer definitely-not-a-jwt`);
     expect([401, 403]).toContain(res.status);
  });
});
