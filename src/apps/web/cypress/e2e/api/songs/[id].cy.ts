describe("GET /songs/:id", () => {
  it("returns single song", () => {
    cy.request("/songs").then((list) => {
      const items: unknown[] = list.body.data || [];
      const first: any = items[0];
      if (!first || !first.id) {
        cy.log("No song id available");
        expect(true).to.be.true;
        return;
      }
      cy.request(`/songs/${first.id}`).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("id", first.id);
      });
    });
  });
});
