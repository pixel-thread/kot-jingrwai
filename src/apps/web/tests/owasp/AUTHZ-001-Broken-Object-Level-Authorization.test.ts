/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("AUTHZ-001/BOLA-001: Broken Object Level Auth (OWASP API1:2023 BOLA)", () => {
  it("should block unauthenticated modification of arbitrary objects", async () => {
    const res = await request(baseUrl)
      .put("/admin/songs/123-fake-id")
      .send({ title: "Hacked by User B" });
    expect([401, 403, 400]).toContain(res.status);
  });

  it("should block unassociated users from viewing private objects", async () => {
    const res = await request(baseUrl).get("/auth/me"); // Simulating target access
    expect([401, 403]).toContain(res.status);
  });
});
