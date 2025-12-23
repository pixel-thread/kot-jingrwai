describe("GET /songs", () => {
  it("returns list with meta", () => {
    cy.request("/songs").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("data");
      expect(Array.isArray(res.body.data)).to.be.true;
      expect(res.body).to.have.property("meta");
      expect(res.body.meta).to.have.property("page");
    });
  });
});
