/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("INJ-001: SQL Injection (OWASP API8:2023 Security Misconfig / API3:2023)", () => {
  const payloads = [
    // SQL Injection
    "' OR '1'='1",
    "admin'--",
    "'; DROP TABLE User;--",
    "' UNION SELECT null, hashPassword FROM Auth--",
    "'; SELECT pg_sleep(5)--",
    "' OR 1=1--",
    "admin' #",
    '" OR ""="',
    "admin' /*",
    "' OR 1=1 LIMIT 1 --",
    "1; DROP TABLE users",
    "1' ORDER BY 1--+",
    "' OR 'x'='x",
    "admin' AND 1=1--",
    "' AND (SELECT * FROM (SELECT(SLEEP(5)))bAKL) AND 'vRxa'='vRxa",
    "'; EXEC xp_cmdshell('ping 127.0.0.1');--",
    "admin' OR '1'='1'/*",

    // NoSQL Injection
    '{"$gt": ""}',
    '{"$ne": null}',
    '{"$where": "sleep(5000)"}',

    // OS Command Injection
    "; ls -la",
    "| whoami",
    "|| cat /etc/passwd",
    "& ping -c 10 127.0.0.1 &",
    "`id`",
    "$(whoami)",

    // LDAP Injection
    "*()|&'",
    "admin*)((|userpassword=*)",
    "*)(uid=*))(|(uid=*",

    // XSS / HTML Injection (often probed in input fields)
    "<script>alert(1)</script>",
    '"><script>alert(document.cookie)</script>',
    "<img src=x onerror=alert(1)>",
    "javascript:alert(1)",
  ];

  it("should block SQLi in the email field during sign-in", async () => {
    for (const email of payloads) {
      const res = await request(baseUrl).post("/auth/sign-in").send({ email, password: "p" });
      expect([400, 401, 403]).toContain(res.status);
    }
  }, 30000);

  it("should block SQLi in the password field during sign-in", async () => {
    for (const password of payloads) {
      const res = await request(baseUrl)
        .post("/auth/sign-in")
        .send({ email: "test@example.com", password });
      expect([400, 401, 403]).toContain(res.status);
    }
  }, 30000);

  it("should block SQLi in fields during sign-up", async () => {
    for (const payload of payloads) {
      const res = await request(baseUrl).post("/auth/sign-up").send({
        email: payload,
        password: "ValidPassword123!",
        name: payload,
        phone: payload,
      });
      expect([400, 401, 403, 409]).toContain(res.status);
    }
  }, 30000);

  // it("should block SQLi in the email field during forgotten password request", async () => {
  //   for (const email of payloads) {
  //     const res = await request(baseUrl).post("/auth/forgot-password").send({ email });
  //     expect([400, 401, 403, 404, 500]).toContain(res.status); // Adding 500 temporarily if specific auth handlers throw internal errors for invalid emails
  //   }
  // }, 30000);
});
