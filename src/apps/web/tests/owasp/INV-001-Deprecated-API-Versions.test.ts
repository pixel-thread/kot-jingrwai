/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("INV-001: Deprecated API Versions (OWASP API9:2023 Improper Inventory Management)", () => {
  it("should securely gate unmanaged legacy paths (simulated)", async () => {
      const res = await request(baseUrl).get("/v1/users");
      expect([404, 401, 403]).toContain(res.status);
  });
});
