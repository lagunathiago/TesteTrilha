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

    context("Trilha > Cupom ", () => {

    it("Cupom - Trilha", () => {

    cy.get('[title="Cadastros"] > .sideitem').click(); //Clica em Cadastros
    cy.get(':nth-child(14) > a > .w-100').click(); //Clica em cupons
    cy.get('#\\32 47').click(); //Clica no cupom criado
    cy.get('#coupon_code').should('have.value', 'Teste1');


    
    });
  }); 
});