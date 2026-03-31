/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('unselectable')) {
    return false;
    }
    });

describe("Teste - Login", () => {
    beforeEach(() => {
        //Entra na página de login
            cy.visit("https://www.hml.lector.live/lector_suporte/showcase/2257");
            cy.contains("button", "Entrar").click();
    
        //Faz login
            cy.get('[style="z-index: 26;"] > :nth-child(1) > :nth-child(1) > .popup > :nth-child(1) > .ng-pristine').type("qualidade@lectortec.com.br");
            cy.get("#login_password_navbar").type("c8d593QGXOkjRjC");
            cy.get(".popup").contains("button", "Entrar").click();
        });

    context("Criar Trilha", () => {

    it("Criando uma trilha", () => {

    //Criar trilha
    cy.get('[title="Trilhas"] > .sideitem').click();

    //botão de criar trilha
    cy.get(".title-bar > .btn-icon").click(); 
    cy.wait(500); 

    });
  }); 
});
