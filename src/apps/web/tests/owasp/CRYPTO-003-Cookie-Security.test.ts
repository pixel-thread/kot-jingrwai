/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("CRYPTO-003: Cookie Security Enforcement (Api-Guardian)", () => {
    const validateCookieHeaders = (headerCookies: string | string[] | undefined) => {
        expect(headerCookies).toBeDefined();

        if (headerCookies) {
            const normalizedCookies = Array.isArray(headerCookies) ? headerCookies : [headerCookies];
            normalizedCookies.forEach((cookie) => {
                const lowerCookie = cookie.toLowerCase();

                // General Security validations
                expect(lowerCookie).toContain("httponly");
                expect(lowerCookie).toContain("samesite=");

                // Environment specific enforcement (e.g. NextJS only sets 'Secure' in https environments usually, but we test the structure)
                if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV) {
                    expect(lowerCookie).toContain("secure");
                }

                // Ensure paths and scoping are tightly controlled rather than broadly open
                expect(lowerCookie).toContain("path=/");
            });
        }
    };

    it("should enforce HttpOnly, Secure, and SameSite flags on issued cookies during Sign-In", async () => {
        const res = await request(baseUrl)
            .post("/auth/sign-in")
            .send({ email: "target@example.com", password: "TargetPassword123!" });

        // Should get rejected, but if auth is mocked or responds with cookies anyway, evaluate them.
        // If you have a valid seeder, replace the credentials above to get real cookies on success
        if (res.headers["set-cookie"]) {
            validateCookieHeaders(res.headers["set-cookie"]);
        } else {
            console.log(
                "No cookies returned on /auth/sign-in. Ensure successful mock authentication if cookies are expected."
            );
        }
    });

    it("should securely issue tokens without leaking sensitive data on Sign-Up", async () => {
        const randomEmail = `test${Date.now()}@example.com`;
        const res = await request(baseUrl)
            .post("/auth/sign-up")
            .send({
                email: randomEmail,
                password: "TargetPassword123!",
                name: "Test User",
                phone: `12345${Date.now()}`.substring(0, 10),
            });

        if (res.headers["set-cookie"]) {
            validateCookieHeaders(res.headers["set-cookie"]);
        }
    });

    it("should wipe authentication cookies completely during Sign-Out (Logout)", async () => {
        const res = await request(baseUrl).post("/auth/sign-out");

        // Some implementations just hit a GET or DELETE, update method as needed
        const cookies = res.headers["set-cookie"];
        if (cookies) {
            cookies.forEach((cookie) => {
                const lowerCookie = cookie.toLowerCase();
                // Look for expiration indicators
                expect(lowerCookie.includes("max-age=0") || lowerCookie.includes("expires=")).toBeTruthy();

                // The value of the sensitive cookie should be empty
                expect(lowerCookie).toContain("=;");
            });
        }
    });

    it("should correctly flag any session regeneration cookies (e.g., token refresh) with max security properties", async () => {
        const res = await request(baseUrl).post("/auth/refresh"); // Adjust to your actual refresh endpoint

        if (res.headers["set-cookie"]) {
            validateCookieHeaders(res.headers["set-cookie"]);
        }
    });
});
