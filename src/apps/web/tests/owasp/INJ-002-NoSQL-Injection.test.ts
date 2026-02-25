/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("INJ-002: NoSQL Injection (OWASP API3:2023 Injection)", () => {
  it("should strictly type-enforce payload properties dropping Object bypass payloads via Zod", async () => {
      const res = await request(baseUrl).post("/auth/sign-in").send({ email: { "$ne": null }, password: "p" });
      expect([400, 401]).toContain(res.status); // 400 from validation
  });
});
