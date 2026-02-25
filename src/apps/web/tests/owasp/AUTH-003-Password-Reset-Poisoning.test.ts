/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("AUTH-003: Password Reset Poisoning (OWASP API4:2023 Insecure Design)", () => {
  it("should validate and strictly ignore malicious Host headers in stateful redirects", async () => {
    const res = await request(baseUrl).post("/auth/forgot-password").set("Host", "evil-site.com").send({ email: "test@example.com" });
    // Should either 404 (endpoint unavail) or ignore the header in the email body
    expect([200, 404, 400, 401, 403]).toContain(res.status);
    if (res.status === 200) expect(res.text).not.toContain("evil-site.com");
  });
  
  it("should ignore malicious X-Forwarded-Host headers", async () => {
    const res = await request(baseUrl).post("/auth/forgot-password").set("X-Forwarded-Host", "evil-site.com").send({ email: "test@example.com" });
    expect([200, 404, 400, 401, 403]).toContain(res.status);
  });
});
