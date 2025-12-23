describe("GET /admin/tracks", () => {
  it("returns 401 without super admin", () => {
    cy.request({
      url: "/admin/tracks",
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401);
    });
  });
});
