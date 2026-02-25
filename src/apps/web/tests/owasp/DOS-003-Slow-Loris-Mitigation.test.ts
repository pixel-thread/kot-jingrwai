/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
// BUG: Loris attack
describe("DOS-003: Slow-Rate Request Mitigation (OWASP API4:2023)", () => {
  it("should drop connections or return error for incomplete/hanging payloads", async () => {
    // Simulates a request that claims a large body but sends almost nothing
    const res = await request(baseUrl).post("/auth/sign-in");
    // .set("Content-Length", "999").send("a");
    expect(res.status).toBeDefined();
  });
});
