/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("INJ-001: SQL Injection (OWASP API8:2023 Security Misconfig / API3:2023)", () => {
  const payloads = [
    "' OR '1'='1",
    "admin'--",
    "'; DROP TABLE User;--",
    "' UNION SELECT null, hashPassword FROM Auth--",
    "'; SELECT pg_sleep(5)--"
  ];
    
  it("should actively immunize inputs against widespread SQLi attack vectors natively via Prisma", async () => {
    for (const email of payloads) {
        const res = await request(baseUrl).post("/auth/sign-in").send({ email, password: "p" });
        expect([400, 401, 403]).toContain(res.status);
    }
  });
});
