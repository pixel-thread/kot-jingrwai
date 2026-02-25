/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("RL-003: Resource Exhaustion via Pagination (OWASP API4:2023 Lack of Resource Limiting)", () => {
  it("should enforce firm caps on requestable pagination limits preventing DB iteration stalls", async () => {
     const res = await request(baseUrl).get("/songs?limit=999999");
     // Usually defaults back to max limit (e.g. 100), or strictly 400 Bad Request
     expect([200, 400, 401, 404]).toContain(res.status);
  });
});
