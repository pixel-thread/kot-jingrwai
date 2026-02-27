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

  it("should actively drop malformed empty string payloads avoiding internal crashes", async () => {
    const res = await request(baseUrl)
      .post("/auth/sign-in")
      .set("Content-Type", "application/json")
      .send(""); // Sending empty body with JSON content-type

    expect([400, 415]).toContain(res.status); // Should reject cleanly
  });

  it("should block structurally invalid JSON streams (A08) without 500 crashes", async () => {
    const res = await request(baseUrl)
      .post("/auth/sign-in")
      .set("Content-Type", "application/json")
      .send("{ \"email\": \"test@example.com\", \"password\": \"p\", "); // Cut off abruptly

    // Next.js body parser should safely throw a 400 Bad Request, not a 500 SyntaxError exception
    expect(res.status).toBe(400);
  });

  it("should actively reject unsupported MimeTypes rigorously (e.g., text/plain spoofing)", async () => {
    const res = await request(baseUrl)
      .post("/auth/sign-in")
      .set("Content-Type", "text/plain")
      .send('{"email": "test@example.com", "password": "p"}');

    // The API should strictly expect application/json and drop text/plain (OWASP A04/A08 protection against simple CSRF)
    expect([415, 400]).toContain(res.status);
  });

  it("should actively reject dangerous serialization formats (YAML) if unexpectedly sent", async () => {
    const res = await request(baseUrl)
      .post("/auth/sign-in")
      .set("Content-Type", "application/x-yaml") // Some old parsers automatically converted YAML
      .send("email: test@example.com\npassword: p");

    expect([415, 400]).toContain(res.status);
  });

  it("should actively reject dangerous content types (x-www-form-urlencoded) if the endpoint explicitly expects JSON", async () => {
    const res = await request(baseUrl)
      .post("/auth/sign-in")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send("email=test@example.com&password=p");

    expect([415, 400]).toContain(res.status);
  });
});
