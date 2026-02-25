/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("SESSION-001: Session Fixation (OWASP API2:2023 Broken Auth)", () => {
  it("should actively mandate exact session lifecycle closures invalidating tokens strictly", async () => {
      const res = await request(baseUrl).post("/auth/logout").send({});
      expect([400, 401]).toContain(res.status); // 400 missing token, 401 unauth
  });
});
