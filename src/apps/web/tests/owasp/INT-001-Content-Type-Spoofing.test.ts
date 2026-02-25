/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("INT-001: Unsafe Deserialization & Content-Type Spoofing (OWASP A08)", () => {
  it("should actively drop malformed payloads avoiding native JS deserialization faults natively", async () => {
      // Sending raw XML while declaring JSON
      const res = await request(baseUrl)
        .post("/auth/sign-in")
        .set("Content-Type", "application/json")
        .send("<xml><email>test@example.com</email></xml>");
        
      expect(res.status).toBe(400); // Express/Next parser should safely 400 without crashing
  });
  
  it("should actively reject unsupported MimeTypes rigorously", async () => {
     const res = await request(baseUrl)
        .post("/auth/sign-in")
        .set("Content-Type", "application/xml")
        .send("<xml></xml>");
        
     expect([415, 400]).toContain(res.status);
  });
});
