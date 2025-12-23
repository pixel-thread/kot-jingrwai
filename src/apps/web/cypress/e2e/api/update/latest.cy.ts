describe("GET /update/latest", () => {
  it("returns object", () => {
    cy.request("/update/latest").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("data");
    });
  });
});
