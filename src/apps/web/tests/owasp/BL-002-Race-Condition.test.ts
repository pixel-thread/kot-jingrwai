/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("BL-002: Race Condition (OWASP API4:2023 Insecure Design)", () => {
  it("should maintain database integrity under highly concurrent identical mutation requests", async () => {
     const endpoint = "/auth/logout";
     const promises = Array.from({length: 10}).map(() => request(baseUrl).post(endpoint).send({ refreshToken: "concurrent" }));
     const results = await Promise.all(promises);
     // Handled safely without DB crash or 500 error cascade
     results.forEach(res => expect(res.status).not.toBe(500));
     
     // Only at most 1 should potentially "succeed" if it were a valid token state modification
     const successes = results.filter(r => r.status === 200).length;
     expect(successes).toBeLessThanOrEqual(1);
  });
});
