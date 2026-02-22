describe("NoSQL Injection Probing", () => {
  const signinUrl = "/auth/sign-in";

  // 1. Regex Injection (Bypassing patterns)
  it("should reject Regex Injection attempts in email field", () => {
    cy.request({
      method: "POST",
      url: signinUrl,
      failOnStatusCode: false,
      body: {
        // This regex attempts to match any email starting with 'a'
        email: { $regex: "^a.*" },
        password: { $gt: "" },
      },
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 401]);
    });
  });

  // 2. The $where Clause (JavaScript Injection)
  it("should prevent JavaScript Injection via $where operator", () => {
    cy.request({
      method: "POST",
      url: signinUrl,
      failOnStatusCode: false,
      body: {
        // If the backend uses $where, this could return all users
        $where: "function() { return true; }",
        email: "admin@test.com",
        password: "password",
      },
    }).then((res) => {
      // Modern MongoDB drivers often disable $where by default,
      // but the API should still return an error if it hits the DB.
      expect(res.status).to.be.oneOf([400, 401]);
    });
  });

  // 3. Array Injection (Bypassing password checks)
  it("should reject array-based login bypass", () => {
    cy.request({
      method: "POST",
      url: signinUrl,
      failOnStatusCode: false,
      body: {
        email: "admin@test.com",
        // Trying to match the password against an array of common passwords
        password: { $in: ["password123", "123456", "admin"] },
      },
    }).then((res) => {
      expect(res.status).to.oneOf([400, 401]);
    });
  });

  // 4. Schema Discovery via $exists
  it("should not leak info via $exists operator", () => {
    cy.request({
      method: "POST",
      url: signinUrl,
      failOnStatusCode: false,
      body: {
        // Probing for hidden fields like 'resetToken'
        email: "admin@test.com",
        resetToken: { $exists: true },
        password: "wrong",
      },
    }).then((res) => {
      // The response should be a generic 401, not a 500 or 200
      expect(res.status).to.eq(400);
    });
  });

  // 5. Parameter Pollution with NoSQL Objects
  it("should handle mixed string and object types for the same key", () => {
    cy.request({
      method: "POST",
      url: signinUrl,
      failOnStatusCode: false,
      body: {
        // Some parsers take the last value; if that's an object, it's dangerous.
        email: "admin@test.com",
        // @ts-expect-error
        email: { $ne: "hacker" },
        password: "password",
      },
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 401]);
    });
  });
});
