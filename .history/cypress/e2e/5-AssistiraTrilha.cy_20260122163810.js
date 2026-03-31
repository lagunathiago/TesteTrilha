/// <reference types="cypress" />

Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("unselectable")) {
    return false;
  }
});

describe("Teste - Login", () => {
  before(() => {
    //Entra na página de login
    cy.visit("https://www.hml.lector.live/lector_suporte/showcase/2257");
    cy.contains("button", "Entrar").click();

    //Faz login
    cy.get('[style="z-index: 26;"] > :nth-child(1) > :nth-child(1) > .popup > :nth-child(1) > .ng-pristine').type("qualidade@lectortec.com.br");
    cy.get("#login_password_navbar").type("c8d593QGXOkjRjC");
    cy.get(".popup").contains("button", "Entrar").click();
  });
});

describe("Assistir a Trilha Com Todos os Conteúdos/Trilha Já Criada Na Plataforma ", () => {
  context("Assistir Trilha com todos os conteúdos", () => {
    it("Assistir Trilha com todos os conteúdos", () => {
      // Clicando na aba Trilhas
      cy.get('[title="Trilhas"] > .sideitem', { timeout: 60000 })
        .should("be.visible")
        .click();

    });
  }); 
});