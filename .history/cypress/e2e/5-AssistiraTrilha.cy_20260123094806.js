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

    context("Assistir Trilha com todos os conteúdos", () => {

    it("Assistir Trilha", () => {

    //Abrir trilha
    cy.get(':nth-child(2) > .carousel-container > .CARD_THEME3 > .showcase-card-carousel-track-container > [data-page-idx="0"] > :nth-child(1) > .card-container > [ng-init="trail = content.entity"] > a.ng-scope > .showcase-card-container').click();
    cy.wait(10000);  

    //Me inscrevo na trilha
    cy.get('[ng-click="subscribeClass(class);"]').click();
    cy.wait(2000);

    //Acessar a trilha
    cy.get('.classes-actions > .btn-swipe-accent.ng-scope').click();

    cy.get('#nextResourceArrow').click();
    cy.wait(2000);

    });
  }); 
});
