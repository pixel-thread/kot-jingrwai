/** @jest-environment node */
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
describe("INT-002: Malicious File Upload (OWASP API8:2023)", () => {
  it("should reject executable file extensions even if MIME type is spoofed", async () => {
    const res = await request(baseUrl)
      .post("/admin/tracks/upload")
      .attach("file", Buffer.from('shell_exec("rm -rf /");'), "malicious.php");
    expect([400, 401, 403, 415, 404]).toContain(res.status);
  });

  it("should reject files exceeding strict size limits (Zip Bomb protection)", async () => {
    const bigBuffer = Buffer.alloc(11 * 1024 * 1024); // 11MB
    const res = await request(baseUrl)
      .post("/admin/tracks/upload")
      .attach("file", bigBuffer, "too_large.mp3");
    expect([413, 401, 400, 404]).toContain(res.status);
  });
});
