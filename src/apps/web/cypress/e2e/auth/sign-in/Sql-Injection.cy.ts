describe("Advanced SQL Injection Probing", () => {
  const signinUrl = "/auth/sign-in";

  const sqlPayloads = [
    { name: "Classic Tautology", val: "' OR 1=1 --" },
    { name: "Union-Based (Column Discovery)", val: "' UNION SELECT NULL, NULL, NULL --" },
    { name: "Error-Based (Double Quote)", val: '") OR 1=1 --' },
    {
      name: "Blind SQLi (Sleep/Time Delay)",
      val: "admin' AND (SELECT 1 FROM (SELECT(SLEEP(5)))a) --",
    },
    { name: "Stacked Queries", val: "admin'; DROP TABLE users; --" },
    { name: "Comment-based bypass", val: "admin'/*" },
  ];

  sqlPayloads.forEach((payload) => {
    it(`should reject SQLi attempt: ${payload.name}`, () => {
      // Record start time to check for Blind SQLi (Time-based)
      const startTime = Date.now();

      cy.request({
        method: "POST",
        url: signinUrl,
        failOnStatusCode: false,
        body: {
          email: payload.val,
          password: "password123",
        },
      }).then((res) => {
        const duration = Date.now() - startTime;

        // 1. Check Status: Should be client error, not server crash (500)
        expect(res.status).to.be.oneOf([400, 401, 403, 429]);

        // 2. Check for Information Leakage
        const bodyStr = JSON.stringify(res.body).toLowerCase();
        expect(bodyStr).to.not.contain("sql syntax");
        expect(bodyStr).to.not.contain("mysql");
        expect(bodyStr).to.not.contain("postgresql");

        // 3. Blind SQLi Check: If the server took > 4 seconds,
        // it might have actually executed the SLEEP() command.
        expect(duration).to.be.lessThan(4000);
      });
    });
  });
});
