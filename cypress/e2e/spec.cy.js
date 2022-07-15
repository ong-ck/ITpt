// ensure webpage loads
describe("load webpage", () => {
  it("passes", () => {
    cy.visit("https://itpt-d53e0.web.app/");
  });
});

// testing homepage components
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
    cy.get("#insert_tablink").click();
    cy.get("#insert_activity").should("be.visible");
    cy.get("#reschedule_tablink").click();
    cy.get("#reschedule_activity").should("be.visible");
    cy.get("#delete_tablink").click();
    cy.get("#delete_activity").should("be.visible");
  });

  it("calendar can resize on mobile", () => {
    cy.viewport("iphone-x");
    cy.get("#calendar").should('have.css', 'font-size', '8px'); // manual test shows font-size as 8px
  });
});

// testing calculator page components
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

// testing rewards page components
describe("rewards", () => {
  beforeEach(() => {
    cy.visit("https://itpt-d53e0.web.app/");
    cy.wait(500);
    cy.get("#rewards_link").click();
  });

  it("rewards game is visible", () => {
    cy.get(".rewards_game").should("be.visible");
  });

  it("get avatar button is visible", () => {
    cy.get("#rewards_button").should("be.visible");
  });
});