/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("INJ-004: XSS in API Output (OWASP API3:2023)", () => {
  it("should neutralize active Script execution attempts dynamically", async () => {
     const res = await request(baseUrl).post("/auth/sign-in").send({ email: "<script>alert('XSS')</script>", password: "p" });
     expect([400, 401]).toContain(res.status);
  });
  
  it("should enforce strict MIME types in API returns preventing script rendering", async () => {
     const res = await request(baseUrl).get("/songs");
     expect(res.headers["content-type"]).toContain("application/json"); 
  });
});
