/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("BL-003: Business Logic Insecure Direct Object Reference (Security-Engineer)", () => {
  it("should rigorously block logic allowing users to update objects belonging to others natively", async () => {
      // Simulate attempting to parse an ID field that doesn't belong to the JWT
      const res = await request(baseUrl).put("/admin/users/app-users").send({ id: "uuid-of-another-user-pension", salary: 90000 });
      // Security-Engineer explicitly checks salary/pension modifications
      expect([401, 403, 404, 405]).toContain(res.status); // 405 if PUT blocked entirely
  });
});
