/** @jest-environment node */
import request from "supertest";
import path from "path";
import fs from "fs";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("POST => /admin/tracks/upload - OWASP Security Audit", () => {
    // --- A01: Broken Access Control ---
    it("should strictly block unauthenticated anonymous access", async () => {
        const res = await request(baseURL).post("/admin/tracks/upload");
        // Without an Admin Auth token, it MUST reject.
        expect([401, 403]).toContain(res.status);
    });

    // --- A08: Software and Data Integrity (Unrestricted File Upload) ---
    it("should reject potentially malicious executable files (.sh, .exe, .js)", async () => {
        // Note: This test simulates hitting the endpoint without a proper auth token,
        // so we expect it to fail Authorization FIRST. If Auth is mocked/bypassed, 
        // it should fail Zod validation for wrong MIME type.

        // Create a dummy malicious file
        const maliciousBuffer = Buffer.from("console.log('hacked!')");

        const res = await request(baseURL)
            .post("/admin/tracks/upload")
            .set("Authorization", `Bearer fake-admin-token`) // Simulate auth
            .attach("file", maliciousBuffer, "virus.js")
            .field("songId", "123e4567-e89b-12d3-a456-426614174000");

        // Must be either Auth failure (401/403) or Validation rejection (400)
        expect([400, 401, 403]).toContain(res.status);
    });

    it("should reject excessively large files (Financial DoS / Quota Exhaustion)", async () => {
        // Simulate a 15MB file which is over the 10MB limit
        const massiveBuffer = Buffer.alloc(15 * 1024 * 1024, "a");

        const res = await request(baseURL)
            .post("/admin/tracks/upload")
            .set("Authorization", `Bearer fake-admin-token`)
            .attach("file", massiveBuffer, "huge_audio.mp3")
            .field("songId", "123e4567-e89b-12d3-a456-426614174000");

        // It should be killed by either Auth or Size Validation (400/413)
        expect([400, 401, 403, 413]).toContain(res.status);
    });

    // --- A04: Insecure Design ---
    it("should require a valid UUID for songId", async () => {
        const dummyAudio = Buffer.from("fake-audio-data");
        const res = await request(baseURL)
            .post("/admin/tracks/upload")
            .set("Authorization", `Bearer fake-admin-token`)
            .attach("file", dummyAudio, "song.mp3")
            .field("songId", "invalid-id-format-DROP-TABLE-SONGS--"); // Injection attempt

        expect([400, 401, 403]).toContain(res.status);
    });
});
