describe("POST /webhook/eas", () => {
  it("returns 401 without signature", () => {
    cy.request({
      method: "POST",
      url: "/webhook/eas",
      body: { test: true },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401);
    });
  });
});
