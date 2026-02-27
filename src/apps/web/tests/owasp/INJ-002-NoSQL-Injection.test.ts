/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("INJ-002: NoSQL Injection (OWASP API3:2023 Injection)", () => {
  // Common NoSQL query injection payloads, usually targeting document-based setups (Mongo)
  const payloads = [
    { $gt: "" },
    { $gt: 0 },
    { $gte: "" },
    { $lt: "" },
    { $ne: null },
    { $ne: 1 },
    { $ne: "unknown" },
    { $in: ["admin"] },
    { $in: [null, ""] },
    { $nin: ["unknown"] },
    { $regex: ".*" },
    { $regex: "^a" },
    { $where: "function() { return true; }" },
    { $where: "sleep(5000)" },
    { $exists: true },
    { $type: 2 }, // String type checks occasionally bypass validation
    { $or: [{}, {}] },

    // Testing array pollutions if the implementation blindly consumes arrays
    ["$gt", ""],
    ["$ne", null],
  ];

  it("should strictly type-enforce email property dropping NoSQL Object bypass payloads via Zod during Sign-In", async () => {
    for (const payload of payloads) {
      const res = await request(baseUrl)
        .post("/auth/sign-in")
        .send({ email: payload, password: "p" });

      // Expected to fail validation (Zod throws 400s usually for mis-types, but 401/403 represents execution failure safely)
      expect([400, 401, 403]).toContain(res.status);
    }
  }, 10000);

  it("should strictly type-enforce password property dropping NoSQL Object bypass payloads via Zod during Sign-In", async () => {
    for (const payload of payloads) {
      const res = await request(baseUrl)
        .post("/auth/sign-in")
        .send({ email: "test@example.com", password: payload });
      expect([400, 401, 403]).toContain(res.status);
    }
  }, 10000);

  it("should block NoSQL object payloads injected into broader inputs during Sign-Up", async () => {
    for (const payload of payloads) {
      const res = await request(baseUrl).post("/auth/sign-up").send({
        email: payload,
        password: "ValidPassword123!",
        name: payload,
        phone: payload,
      });
      // 409 means the query executed successfully but triggered conflict, indicating bypass success logic. We want 400s.
      expect([400, 401, 403]).toContain(res.status);
    }
  }, 10000);
});
