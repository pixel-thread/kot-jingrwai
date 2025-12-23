import { faker } from "@faker-js/faker";

describe("POST /analytic/users", () => {
  it("accepts valid payload", () => {
    if (Cypress.env("skipMutations")) {
      cy.log("Skipping POST /analytic/users to avoid mutating remote data");
      return;
    }
    const payload = {
      userId: faker.string.uuid(),
      appVersion: faker.system.semver(),
    };
    cy.request({
      method: "POST",
      url: "/analytic/users",
      body: payload,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("data");
    });
  });
});
