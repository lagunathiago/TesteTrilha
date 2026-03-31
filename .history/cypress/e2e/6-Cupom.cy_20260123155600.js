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

    //Editar cupom criado
    cy.get('[title="Cadastros"] > .sideitem').click(); //Clica em Cadastros
    cy.get(':nth-child(14) > a > .w-100').click(); //Clica em cupons
    cy.get('#\\32 47').click(); //Clica no cupom criado

    cy.contains('Quantidade')
    .parents('.w-100')
    .find('input')
    .filter(':visible')
    .first()
    .should('be.enabled')
    .scrollIntoView()
    .focus()
    .clear({ force: true })
    .type('1', { delay: 10, force: true })
    .should('have.value', '1');
    
    cy.get('.btn-success').contains('Salvar').click(); //Clica em salvar


    
    });
  }); 
});