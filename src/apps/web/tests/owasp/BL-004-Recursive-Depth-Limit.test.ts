/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("BL-004: Resource Exhaustion via Depth (OWASP API4:2023)", () => {
  it("should prevent deep relational queries from crashing the API (N+1 / Depth)", async () => {
    const res = await request(baseUrl).get("/songs?include[artist][songs][artist][songs]=true");
    expect([400, 200, 404]).toContain(res.status); 
    // If 200, the implementation should have ignored the deep nesting
  });
});
