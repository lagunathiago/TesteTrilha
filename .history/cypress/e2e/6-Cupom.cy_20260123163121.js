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

    //Alterar quantidade do cupom
    cy.get('[model="coupon.quantity"] input[type="number"]')
    .filter(':visible')
    .first()
    .should('be.enabled')
    .scrollIntoView()
    .focus()
    .type('{selectall}{backspace}', { force: true })   // melhor que clear() em number/Angular
    .type('1', { delay: 10, force: true })
    .should('have.value', '1');   

    //Clica em salvar
    cy.get('[switch="modal.coupons"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent').click(); 
    });

    ittros - Cupom", () => {

    //Cadastros > Cupons
    cy.get('[title="Cadastros"] > .sideitem').click(); //Clica em Cadastros
    cy.get(':nth-child(14) > a > .w-100').click(); //Clica em cupons
    
    //Pesquisar cupom 
    cy.get('.title-bar > .multiselect > .ng-pristine').type("CUPOMTESTE{enter}");


    });

    
    });
  }); 