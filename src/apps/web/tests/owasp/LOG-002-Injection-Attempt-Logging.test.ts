/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("LOG-002: Injection Attempt Logging (OWASP API10:2023)", () => {
  it("should actively reject completely unauthenticated direct log injections", async () => {
    const res = await request(baseUrl).post("/logs").send({ type: "ERROR", content: "Hacked log" });
    // Strict API Key guard at step 1
    expect([401, 403, 400]).toContain(res.status);
  });
});
