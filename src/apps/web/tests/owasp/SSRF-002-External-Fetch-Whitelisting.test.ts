/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("SSRF-002: External Fetch Validation (Api-Guardian)", () => {
  it("should actively block localized protocol handlers during webhook triggers automatically", async () => {
     const res = await request(baseUrl).post("/webhook/eas").send({ url: "file:///etc/passwd" });
     // Security-Engineer ruleset demands checking SSRF unvalidated URLs
     expect([400, 401, 403, 404, 500]).toContain(res.status); 
  });
});
