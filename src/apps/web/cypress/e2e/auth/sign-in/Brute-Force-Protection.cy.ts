describe("Brute Force Protection", () => {
  const signinUrl = "/auth/sign-in";
  it("should trigger rate limiting after multiple failed attempts", () => {
    const maxAttempts = 3; // Adjust this based on your actual server policy

    for (let i = 0; i < 10; i++) {
      cy.request({
        method: "POST",
        url: signinUrl,
        failOnStatusCode: false,
        body: {
          email: Cypress.env("testEmail"),
          password: "1@Awrong-password-attempt-" + i,
        },
      }).then((res) => {
        if (i <= maxAttempts) {
          // Initial attempts should fail normally
          expect(res.status).to.oneOf([403, 429]);
        } else {
          // Subsequent attempts should be throttled/blocked
          // Your server might return 429 (Rate Limit) or 403 (Lockout)
          expect(res.status).to.be.oneOf([429, 403, 401]);
          expect(res.body.message).to.match(/too many|locked|try again/i);
        }
      });
    }
  });

  it("should NOT be bypassed by X-Forwarded-For header spoofing", () => {
    for (let i = 0; i < 10; i++) {
      cy.request({
        method: "POST",
        url: signinUrl,
        failOnStatusCode: false,
        headers: {
          "X-Forwarded-For": `192.168.1.${i}`, // Attempting to fake a new IP
        },
        body: {
          email: "aa@aa.com",
          password: "wrong-password",
        },
      }).then((res) => {
        if (i > 5) {
          // If the server is secure, it uses the real connection IP, not the header
          expect(res.status).to.eq(429);
        }
      });
    }
  });
});
