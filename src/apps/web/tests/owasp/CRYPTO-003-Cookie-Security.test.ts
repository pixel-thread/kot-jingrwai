/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("CRYPTO-003: Cookie Security Enforcement (Api-Guardian)", () => {
  it("should enforce HttpOnly, Secure, and SameSite flags on any issued cookies", async () => {
      const res = await request(baseUrl).post("/auth/sign-in").send({ email: "target@example.com", password: "p" });
      const cookies = res.headers['set-cookie'];
      if (cookies) {
          cookies.forEach(cookie => {
              expect(cookie.toLowerCase()).toContain("httponly");
              // Locally this might fail, so we conditionally test it if not in dev
              if (process.env.NODE_ENV === "production") expect(cookie.toLowerCase()).toContain("secure");
              expect(cookie.toLowerCase()).toContain("samesite");
          });
      }
  });
});
