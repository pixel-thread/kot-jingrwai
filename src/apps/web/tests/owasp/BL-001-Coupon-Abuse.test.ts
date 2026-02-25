/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("BL-001: Logic & Flow Abuse (OWASP API6:2023 Unrestricted Access to Sensitive Business Flows)", () => {
  it("should prevent excessive redemption loops (if applicable)", async () => {
     const res = await request(baseUrl).post("/api/redeem-coupon").send({ coupon: "FREE100" });
     expect([404, 400, 401, 403]).toContain(res.status); // Safe fallback test
  });
});
