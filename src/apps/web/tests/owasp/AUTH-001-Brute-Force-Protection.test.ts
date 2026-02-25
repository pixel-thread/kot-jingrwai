/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("AUTH-001: Brute Force Protection (OWASP API2:2023 & API4:2023)", () => {
  const TARGET_ENDPOINT = "/auth/sign-in";

  it("should enforce account lockout after exactly 3 failed login attempts", async () => {
    const targetEmail = `bruteforce-target-${Date.now()}@example.com`;
    const wrongPassword = "IncorrectPassword123!";
    for (let i = 1; i <= 4; i++) {
        const res = await request(baseUrl).post(TARGET_ENDPOINT).send({ email: targetEmail, password: wrongPassword });
        if (i < 3) expect(res.status).toBe(401);
        else if (i === 3) expect([401, 403, 429]).toContain(res.status);
        else expect(res.status).toBe(403);
    }
  });

  it("should mitigate brute force enumeration via standardized response times (Timing Attack)", async () => {
    const startInvalid = Date.now();
    await request(baseUrl).post(TARGET_ENDPOINT).send({ email: `non-existent-${Date.now()}@example.com`, password: "p" });
    const durationInvalid = Date.now() - startInvalid;

    const startValid = Date.now();
    await request(baseUrl).post(TARGET_ENDPOINT).send({ email: process.env.TEST_EMAIL || "testuser@example.com", password: "wrong" });
    const durationValid = Date.now() - startValid;

    expect(Math.abs(durationValid - durationInvalid)).toBeLessThan(250); 
  });

  it("should prevent massive parallel requests (Race Condition Brute Force Bypass)", async () => {
    const targetEmail = `parallel-brute-${Date.now()}@example.com`;
    const promises = Array.from({ length: 15 }).map(() => request(baseUrl).post(TARGET_ENDPOINT).send({ email: targetEmail, password: "wrong" }));
    const results = await Promise.all(promises);
    const normalFailures = results.filter(r => r.status === 401).length;
    expect(normalFailures).toBeLessThan(15); 
    expect(results.some(r => r.status === 403 || r.status === 429)).toBeTruthy();
  });
});
