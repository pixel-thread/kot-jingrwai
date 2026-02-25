/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("POST => /auth/logout - OWASP Security Audit", () => {
    // --- A07: Identification and Authentication Failures ---
    it("should block logout attempts missing a token", async () => {
        const res = await request(baseURL).post("/auth/logout").send({});
        expect(res.status).toBe(400);
    });

    it("should safely reject invalid tokens without crashing", async () => {
        const res = await request(baseURL).post("/auth/logout").send({
            refreshToken: "invalid-token",
        });
        expect(res.status).toBe(401);
    });

    // --- A04: Insecure Design ---
    it("should not expose server stack traces on malformed requests", async () => {
        const res = await request(baseURL).post("/auth/logout").send({
            refreshToken: null,
        });
        expect(res.status).toBe(400);
        // Ensure the raw Error stack is not exposed to the client
        expect(res.text).not.toContain("Error:");
        expect(res.text).not.toContain("node_modules");
    });
});
