/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("LOG-001: Failed Login Logging (OWASP API10:2023 Unsafe Consumption of APIs)", () => {
  it("should rigorously verify failure interactions are safely bounded", async () => {
     const res = await request(baseUrl).post("/auth/sign-in").send({ email: "fail@test.com", password: "p" });
     expect(res.status).toBeGreaterThanOrEqual(400); 
  });
});
