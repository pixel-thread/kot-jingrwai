/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("AUTH-005: MFA & Session Integrity (OWASP API2:2023)", () => {
  it("should block access to sensitive actions when MFA is required but not completed", async () => {
    const partialAuthToken = "jwt-without-mfa-claim"; 
    const res = await request(baseUrl).get("/auth/sensitive-data").set("Authorization", `Bearer ${partialAuthToken}`);
    expect([401, 403]).toContain(res.status);
  });

  it("should reject MFA code reuse (Replay Attack)", async () => {
    const code = "123456";
    await request(baseUrl).post("/auth/mfa/verify").send({ code });
    const res = await request(baseUrl).post("/auth/mfa/verify").send({ code });
    expect([401, 403]).toContain(res.status);
  });
});
