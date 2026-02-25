/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("CONF-002: CORS Policy (OWASP API8:2023 Security Misconfiguration)", () => {
  it("should systematically reject unauthorized wildcard Origins", async () => {
      const res = await request(baseUrl).options("/songs").set("Origin", "http://evil-attacker.com");
      expect(res.headers["access-control-allow-origin"]).not.toBe("*");
  });
  
  it("should not reflect back unauthorized Origins securely", async () => {
      const res = await request(baseUrl).options("/songs").set("Origin", "http://evil-attacker.com");
      expect(res.headers["access-control-allow-origin"]).not.toBe("http://evil-attacker.com");
  });
});
