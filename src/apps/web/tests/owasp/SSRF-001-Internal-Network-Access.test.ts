/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("SSRF-001: Server-Side Request Forgery Internal Network (OWASP A10:2021 SSRF)", () => {
  it("should firewall API egress access to standard internal IP mappings (AWS metadata IP check)", async () => {
     const res = await request(baseUrl).post("/webhook/eas").send({ url: "http://169.254.169.254/latest/meta-data/" });
     expect([400, 401, 403, 404]).toContain(res.status);
  });
  
  it("should block loopback interface SSRF probing (127.0.0.1)", async () => {
     const res = await request(baseUrl).post("/webhook/eas").send({ url: "http://127.0.0.1:5432" }); // probing postgres
     expect([400, 401, 403, 404]).toContain(res.status);
  });
});
