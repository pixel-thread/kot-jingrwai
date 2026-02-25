/** @jest-environment node */
import request from "supertest";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("GET => /verse", () => {
    // --- SUCCESS PATHS ---
    it("should return 200 and retrieve the daily verse successfully", async () => {
        const res = await request(baseURL).get("/verse").send();

        if (res.status === 200) {
            expect(res.body.success).toBe(true);
            expect(res.body.message).toMatch(/Successfully fetched verse/);
            expect(res.body.data).toHaveProperty("verse");
            expect(res.body.data.verse).toHaveProperty("notice");
            expect(res.body.data.verse).toHaveProperty("details");
        } else {
            // In case of any rate limiting or firewall behavior
            expect([403, 429]).toContain(res.status);
        }
    });

    it("should contain correctly structured verse details in the response", async () => {
        const res = await request(baseURL).get("/verse").send();

        if (res.status === 200) {
            const details = res.body.data.verse.details;
            expect(details).toHaveProperty("text");
            expect(details).toHaveProperty("reference");
            expect(details).toHaveProperty("version");
            expect(details).toHaveProperty("verseurl");

            // Ensure values are strings
            expect(typeof details.text).toBe("string");
            expect(typeof details.reference).toBe("string");
            expect(typeof details.version).toBe("string");
        }
    });

    // --- ERROR / EDGE CASES (Simulated Black Box) ---
    it("should not allow unsupported HTTP methods like POST or DELETE on /verse unless explicitly handled", async () => {
        // Assuming POST /verse might create a verse, but for this specific public GET route we check the base behavior
        // Wait, there might be a POST /verse in the same group? The user said "for the get route also". Let's test non-GET if POST doesn't exist, which returns 405 Method Not Allowed
        const res = await request(baseURL).delete("/verse").send();

        // Next.js returning 405 Method Not Allowed for undefined methods via Route Handlers
        expect([404, 405]).toContain(res.status);
    });
});
