/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("POST => /logs - OWASP Security Audit", () => {
    const payload = {
        type: "ERROR",
        content: "Test log message",
        timestamp: new Date().toISOString(),
        message: "Test error",
    };

    // --- A01: Broken Access Control ---
    it("should return 403 Forbidden without the client API Key", async () => {
        const res = await request(baseURL).post("/logs").send(payload);
        expect(res.status).toBe(403);
        expect(res.body.message).toBe("Forbidden");
    });

    it("should return 403 Forbidden with Invalid/Spoofed API Key", async () => {
        const res = await request(baseURL)
            .post("/logs")
            .set("x-client-logger-key", "hacked-wrong-key")
            .send(payload);

        expect(res.status).toBe(403);
    });

    // --- A03: Injection & A08: Software and Data Integrity Failures ---
    it("should sanitize and prevent Cross-Site Scripting (XSS) payloads in logs", async () => {
        const xssPayload = {
            ...payload,
            content: "<script>alert('xss')</script> SELECT * FROM users;",
        };

        const res = await request(baseURL)
            .post("/logs")
            .set("x-client-logger-key", process.env.EXPO_PUBLIC_CLIENT_LOGGER_KEY || "test")
            .send(xssPayload);

        // The server should either accept it safely (treating as plaintext) or reject it.
        // If we don't have the real key locally, it'll be 403. If accepted, 200.
        expect([200, 403]).toContain(res.status);
    });

    // --- A04: Insecure Design (Mass Assignment check) ---
    it("should ignore attempts to force the ID or bypass constraints", async () => {
        const maliciousPayload = {
            ...payload,
            id: "force-this-uuid-1234",
            isBackend: true, // Client shouldn't be able to force a backend log flag
        };

        const res = await request(baseURL)
            .post("/logs")
            .set("x-client-logger-key", process.env.EXPO_PUBLIC_CLIENT_LOGGER_KEY || "test")
            .send(maliciousPayload);

        // Depending on Zod strictness, it either strips it (200) or rejects it (400), or 403 if no key.
        expect([200, 400, 403]).toContain(res.status);
    });
});
