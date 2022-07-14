describe("load webpage", () => {
  it("passes", () => {
    cy.visit("https://itpt-d53e0.web.app/");
  });
});

describe("homepage", () => {
  beforeEach(() => {
    cy.visit("https://itpt-d53e0.web.app/");
    cy.wait(500);
  });

  describe("toolbar", () => {
    it("toolbar is visible", () => {
      cy.get("nav").should("be.visible");
    });

    it("page buttons are visible", () => {
      cy.get("#brand_link").should("be.visible");
      cy.get("#home_link").should("be.visible");
      cy.get("#cal_link").should("be.visible");
      cy.get("#rewards_link").should("be.visible");
      cy.get("#signin").should("be.visible");
    });

    it("able to access other pages", () => {
      describe("brand link working", () => {
        cy.get("#brand_link").click();
        cy.get(".home").should("be.visible");
      });

      describe("home link working", () => {
        cy.get("#home_link").click();
        cy.get(".home").should("be.visible");
      });

      describe("calculator link working", () => {
        cy.get("#cal_link").click();
        cy.get(".cal").should("be.visible");
      });

      describe("rewards link working", () => {
        cy.get("#rewards_link").click();
        cy.get(".rewards").should("be.visible");
      });
    });
  });

  it("calendar is visible", () => {
    cy.get("#calendar").should("be.visible");
  });

  it("calendar instructions are visible", () => {
    cy.get(".fc-howToUse-button").click();
    cy.get("#instructions_modal").should("be.visible");
  });
});

describe("calculator", () => {
  beforeEach(() => {
    cy.visit("https://itpt-d53e0.web.app/");
    cy.wait(500);
    cy.get("#cal_link").click();
  });

  it("calculator form is visible", () => {
    cy.get("#cal_form").should("be.visible");
  });

  it("calculator is working", () => {
    cy.get("input[name='age']").type(20);
    cy.get("input[name='pushups']").type(20);
    cy.get("input[name='situps']").type(20);
    cy.get("input[name='run_min']").type(20);
    cy.get("input[name='run_sec']").type(20);
    cy.get("input[type='submit'").click();
    cy.get("#result").should("be.visible");
  });

  it("calculator calculates correctly (using specific example)", () => {
    cy.get("input[name='age']").type(18);
    cy.get("input[name='pushups']").type(60);
    cy.get("input[name='situps']").type(60);
    cy.get("input[name='run_min']").type(9);
    cy.get("input[name='run_sec']").type(0);
    cy.get("input[type='submit'").click();
    cy.get("#points").should("have.text", "97 POINTS");
    cy.get("#gold").should("be.visible");
  });
});
