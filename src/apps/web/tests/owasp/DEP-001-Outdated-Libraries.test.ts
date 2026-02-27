/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("DEP-001: Outdated Libraries (OWASP A06:2021 Vulnerable and Outdated Components)", () => {
  const prototypePollutionPayloads: Record<string, any>[] = [
    { "__proto__": { "admin": true } },
    { "constructor": { "prototype": { "admin": true } } },
    { "toString": "exploit" },
    { "valueOf": "exploit" }
  ];

  it("should not be vulnerable to common Prototype Pollution techniques (A06:2021) impacting parsers", async () => {
    for (const payload of prototypePollutionPayloads) {
      const res = await request(baseUrl)
        .post("/auth/sign-in")
        .send({ email: "test@example.com", password: "p", ...payload });

      // Zod or the framework body parser should either strictly strip/ignore these or throw a 400.
      // Usually, authentication fails with 401 anyway.
      expect([400, 401]).toContain(res.status);
    }
  });

  it("should safely handle extremely deeply nested JSON objects without crashing the Node event loop (A06:2021)", async () => {
    // Some outdated body-parsers crash or cause CPU spikes on deep nesting
    let deepObject: any = {};
    let currentLevel = deepObject;
    for (let i = 0; i < 500; i++) {
      currentLevel[`level${i}`] = {};
      currentLevel = currentLevel[`level${i}`];
    }

    // Test the payload
    const res = await request(baseUrl)
      .post("/auth/sign-up")
      .send({ email: "deep@example.com", password: "p", data: deepObject });

    // Should get rejected, either due to 400 payload too large/validation, or 401/403 normal rejects. 
    // We strictly want to avoid a 500 server crash or hanging forever.
    expect([400, 401, 403, 413]).toContain(res.status);
  });

  it("should safely handle massive arrays without memory exhaustion errors (A06:2021)", async () => {
    // Older library versions occasionally crashed allocating massive arrays in JSON
    const largeArray = new Array(50000).fill("A");

    const res = await request(baseUrl)
      .post("/auth/sign-up")
      .send({ email: "large@example.com", password: "p", tags: largeArray });

    expect([400, 401, 403, 413]).toContain(res.status);
  });
});
