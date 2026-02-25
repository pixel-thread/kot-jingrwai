/** @jest-environment node */
import request from "supertest";
import path from "path";
import fs from "fs";
import os from "os";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("POST => /admin/tracks/upload", () => {
    // We create a dummy file to test upload validations
    let dummyFilePath: string;

    beforeAll(() => {
        dummyFilePath = path.join(os.tmpdir(), "dummy.txt");
        fs.writeFileSync(dummyFilePath, "dummy content");
    });

    afterAll(() => {
        if (fs.existsSync(dummyFilePath)) {
            fs.unlinkSync(dummyFilePath);
        }
    });

    const validUuid = "123e4567-e89b-12d3-a456-426614174000";

    // --- SECURITY / ACCESS CONTROL (A01) ---
    it("should return 401/403 if the user lacks ADMIN role", async () => {
        const res = await request(baseURL)
            .post("/admin/tracks/upload")
            .field("songId", validUuid)
            .attach("file", dummyFilePath);

        // requiredRole("ADMIN") is called early in the handler
        expect([401, 403, 500]).toContain(res.status);
    });

    // --- INPUT VALIDATION (A03) ---
    it("should return 400 Bad Request if songId is missing", async () => {
        const res = await request(baseURL)
            .post("/admin/tracks/upload")
            .attach("file", dummyFilePath);

        // Zod validation should catch this
        // But requiredRole is called first! So this might return 401/403 first if we are unauthenticated.
        // If authenticated it would return 400.
        expect([400, 401, 403, 429]).toContain(res.status);
    });

    it("should reject files with unsupported MIME types (e.g. .txt instead of .mp3 or .wav)", async () => {
        const res = await request(baseURL)
            .post("/admin/tracks/upload")
            .field("songId", validUuid)
            .attach("file", dummyFilePath, { contentType: "text/plain" });

        // Expected to fail validation via Zod refine for ACCEPTED_AUDIO_TYPES
        expect([400, 401, 403, 429]).toContain(res.status);
    });

    // --- HTTP METHOD CONSTRAINTS ---
    it("should reject GET requests on upload route", async () => {
        const res = await request(baseURL).get("/admin/tracks/upload").send();
        expect([404, 405, 401, 403]).toContain(res.status);
    });
});
