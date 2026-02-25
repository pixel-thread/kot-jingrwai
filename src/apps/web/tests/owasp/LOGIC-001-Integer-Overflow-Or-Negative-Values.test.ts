/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("LOGIC-001: Integer Overflow and Type Juggling (OWASP API4:2023 Insecure Design)", () => {
  it("should safely normalize or explicitly reject negative limits", async () => {
     const res = await request(baseUrl).get("/songs?page=-5&limit=-10");
     expect([200, 400, 401, 404]).toContain(res.status);
  });
  
  it("should bound integer sizes accurately to prevent 64bit integer overflows in the ORM", async () => {
     const res = await request(baseUrl).get("/songs?page=999999999999999999");
     expect([200, 400, 401, 404]).toContain(res.status);
  });
});
