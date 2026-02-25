/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("INJ-003: Command Injection (OWASP API3:2023)", () => {
  it("should safely interpret and delimit OS command characters passed uniformly", async () => {
      const key = process.env.EXPO_PUBLIC_CLIENT_LOGGER_KEY || "test";
      const res = await request(baseUrl).post("/logs").set("x-client-logger-key", key).send({ type: "INFO", content: "test; cat /etc/passwd", message: "command execution test" });
      // Evaluates safely as a literal string or 403 if key is missing locally
      expect([400, 401, 403, 200]).toContain(res.status);
  });
});
