/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("META-001: Info Leakage via Headers (OWASP API8:2023 Security Misconfiguration)", () => {
  it("should not leak specific architecture headers publicly", async () => {
      const res = await request(baseUrl).get("/songs");
      expect(res.headers).not.toHaveProperty("x-powered-by", "Express");
  });
});
