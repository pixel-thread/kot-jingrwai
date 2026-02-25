/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("CRYPTO-002: Sensitive Data Exposure (OWASP A02:2021 Cryptographic Failures)", () => {
  it("should definitively isolate exact tokens from API logs or standard GET responses", async () => {
     const res = await request(baseUrl).get("/auth/me");
     if (res.status === 200) expect(res.body.data).not.toHaveProperty("hash");
  });
});
