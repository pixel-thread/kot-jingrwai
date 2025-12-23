describe("GET /songs/featured", () => {
  it("returns list with meta", () => {
    cy.request("/songs/featured").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("data");
      expect(Array.isArray(res.body.data)).to.be.true;
      expect(res.body).to.have.property("meta");
    });
  });
});
