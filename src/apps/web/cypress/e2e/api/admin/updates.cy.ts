describe("GET /admin/updates", () => {
  it("returns 401 without super admin", () => {
    cy.request({
      url: "/admin/updates",
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401);
    });
  });
});
