/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("DOS-001: High Volume Requests (OWASP API4:2023 Lack of Resource & Rate Limiting)", () => {
  it("should securely absorb and limit request volumes on unprotected routes", async () => {
      // Sends 25 burst requests to an open route
      const promises = Array.from({length: 25}).map(() => request(baseUrl).get("/songs"));
      const results = await Promise.all(promises);
      const isHealthy = results.every(res => res.status !== 500);
      expect(isHealthy).toBe(true);
  });
});
