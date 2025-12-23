describe("GET /auth", () => {
  it("returns 401 without token", () => {
    cy.request({
      url: "/auth",
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body).to.have.property("message");
    });
  });
});
