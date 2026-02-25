/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("SAFE-001: Unsafe Redirection (OWASP API4:2023 Insecure Routing)", () => {
  it("should enforce strict boundaries rejecting arbitrary HTTP egress redirections", async () => {
     const res = await request(baseUrl).get("/?redirect=http://evil.com");
     expect(res.headers.location).not.toBe("http://evil.com");
  });
});
