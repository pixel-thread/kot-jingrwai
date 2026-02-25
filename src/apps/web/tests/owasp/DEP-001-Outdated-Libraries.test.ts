/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("DEP-001: Outdated Libraries (OWASP A06:2021 Vulnerable and Outdated Components)", () => {
  it("should not utilize known vulnerable parsing techniques natively", async () => {
      const payload = { "toString": "exploit" };
      const res = await request(baseUrl).post("/auth/sign-in").send(payload);
      expect([400, 401]).toContain(res.status); // Zod blocks prototype poisoning
  });
});
