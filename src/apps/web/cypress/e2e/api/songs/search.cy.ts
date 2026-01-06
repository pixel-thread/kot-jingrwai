describe("GET /songs/search", () => {
  it("returns filtered list", () => {
    cy.request({ url: "/songs/search", qs: { query: "love", page: "1" } }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("data");
      expect(Array.isArray(res.body.data)).to.be.true;
      expect(res.body).to.have.property("meta");
    });
  });
});
