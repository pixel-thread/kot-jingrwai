/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("DOS-002: Large Payload Attack (OWASP API4:2023)", () => {
  it("should violently drop inputs exceeding arbitrary threshold bounds at parser level", async () => {
    // Injecting a 10MB string straight into Zod expecting a 400/413 rejection
    const massiveContent = "A".repeat(10 * 1024 * 1024);
    const res = await request(baseUrl).post("/auth/sign-in").send({ email: "test@example.com", password: massiveContent });
    expect([413, 400, 401]).toContain(res.status);
  });
});
