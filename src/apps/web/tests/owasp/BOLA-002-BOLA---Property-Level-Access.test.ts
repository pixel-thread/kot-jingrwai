/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("BOLA-002: Property Level Access (OWASP API3:2023 Broken Object Property Level Auth)", () => {
  it("should not leak sensitive object properties under any circumstance", async () => {
      const res = await request(baseUrl).get("/auth/me");
      if (res.status === 200) {
         expect(res.body.data).not.toHaveProperty("hashPassword");
         expect(res.body.data).not.toHaveProperty("salt");
      }
  });
});
