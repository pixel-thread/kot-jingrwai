/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("CONF-001: Debug Mode Exposure (OWASP API8:2023 Security Misconfiguration)", () => {
  it("should safely mask server stack traces on predictable 500/error triggers", async () => {
     const res = await request(baseUrl).post("/auth/sign-in").send({ email: null, password: null });
     // Validating that Zod catches it and raw errors aren't dumped
     expect(res.text).not.toContain("Error:");
     expect(res.text).not.toContain("node_modules");
     expect(res.text).not.toContain("PrismaClientKnownRequestError");
  });
});
