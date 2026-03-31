/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('unselectable')) {
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
        cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');
  });


  context("Filtros", () => {
    
    it("Pesquisar Trilhas", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Trilhas"] > .sideitem', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Pesquisa
        cy.get('input[placeholder="Pesquisar trilhas"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('Teste', { delay: 50 });

  cy.wait(1000)
cy.get('.multiselect.ng-dirty > .btn').click()

    });

    it("Filtro Ordenação AZ/ZA", () => {
      
        
        //Clica em nome A/Z
        cy.get('[ng-model="$parent.order"]').click()
        cy.wait(1000)
        
        //Z á A
        cy.get('.open > .ui-select-choices > :nth-child(2)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });
        cy.wait(3000)

      //Clica em nome A/Z
        cy.get('[ng-model="$parent.order"]').click()
        cy.wait(1000)

        //A á Z
cy.get('.open > .ui-select-choices > :nth-child(1)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

    });
     it("Filtro Mais Recente/Mias Antigo", () => {
        
        //Clica em nome A/Z
        cy.get('[ng-model="$parent.order"]').click()
        cy.wait(1000)
        
        //Mais recente
        cy.get('.open > .ui-select-choices > :nth-child(3)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });
        cy.wait(3000)

      //Clica em nome A/z
        cy.get('[ng-model="$parent.order"]').click()
        cy.wait(1000)

        //Mais antigo
cy.get('.open > .ui-select-choices > :nth-child(4)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });
});

 it("Filtro Card", () => {
        
        //Clica em Cards
        cy.get('.title-bar > .filter').click()
        cy.wait(1000)
        
        //Miniaturas
        cy.get('.open > .ui-select-choices > :nth-child(3)', { timeout: 60000 })
  .should('be.visible')
  .click();
        cy.wait(12000)

      //Clica em Cards
        cy.get('.title-bar > .filter').click()
        cy.wait(2000)

        //somente capa
        cy.get('.open > .ui-select-choices > :nth-child(2)', { timeout: 60000 })
  .should('be.visible')
  .click();
        cy.wait(12000)

        //Clica em Cards
        cy.get('.title-bar > .filter').click()
        cy.wait(2000)

        //cartoes
        cy.get('.open > .ui-select-choices > :nth-child(1)', { timeout: 60000 })
  .should('be.visible')
  .click();
        cy.wait(12000)
        
      
        //Clica em Cards
        cy.get('.title-bar > .filter').click()
        cy.wait(2000)

        //cartoes
        cy.get('.open > .ui-select-choices > :nth-child(4)', { timeout: 60000 })
  .should('be.visible')
  .click();
        cy.wait(60000)

   });
  });
});
