/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("POST => /auth/refresh - OWASP Security Audit", () => {
    // --- A04: Insecure Design & A07: Identification and Authentication Failures ---
    it("should return 400 if refresh token is entirely missing", async () => {
        const res = await request(baseURL).post("/auth/refresh").send({});
        expect(res.status).toBe(400);
        expect(res.body.message).toContain("validation");
    });

    // --- A02: Cryptographic Failures ---
    it("should fail authentication gracefully when a completely fake token is sent", async () => {
        const res = await request(baseURL).post("/auth/refresh").send({
            refreshToken: "fake-jwt-token-that-doesnt-exist",
        });
        // The server should hash this fake token, not find it, and reject.
        expect(res.status).toBe(401);
    });

    // --- A03: Injection ---
    it("should defend against basic SQL/NoSQL injection in the token body", async () => {
        const res = await request(baseURL).post("/auth/refresh").send({
            refreshToken: { "$gt": "" }, // MongoDB style NoSQL injection
        });
        // Zod should catch that it's an object instead of a string, or backend rejects it
        expect([400, 401]).toContain(res.status);
    });

    it("should prevent excessively long payload Denial of Service (DoS)", async () => {
        const res = await request(baseURL).post("/auth/refresh").send({
            refreshToken: "A".repeat(10000), // Massive string to choke the hasher
        });
        expect([400, 413, 401]).toContain(res.status);
    });
});
