Cypress.on('uncaught:exception', (err) => {
  const msg = err.message || '';

  // Erros conhecidos do Angular / Front que não devem quebrar o teste
  if (
    msg.includes('Cannot read properties of null') ||
    msg.includes('Cannot read properties of undefined') ||   
    msg.includes("reading 'then'") ||                        
    msg.includes('charAt') ||
    msg.includes('writeText') ||
    msg.includes('Clipboard') ||
    msg.includes('Clipboard') ||
    msg.includes('renderCertificateClick is not a function')
  ) {
    return false;
  }
});

describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080);

    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("thiagosuporte@uorak.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("123");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');

});

context("Filtros", () => {
    it("Pesquisar Trilhas", () => {

        // Clicando na aba Trilhas
        cy.get('[title="Trilhas"] > .sideitem', { timeout: 60000 })
            .should('be.visible')
            .click();

        //Pesquisa
        cy.get('input[placeholder="Pesquisar trilhas"]', { timeout: 60000 })
            .should('be.visible')
            .clear()
            .type('Teste{enter}', { delay: 50 });

        cy.wait(1000)

        cy.get('.multiselect.ng-dirty > .btn').click()

    });

    it("Filtro Ordenação AZ/ZA", () => {
        
        //Clica em nome Z/A
        cy.get('[ng-model="$parent.order"]').click()
        cy.wait(1000)
        
        cy.get('.open > .ui-select-choices > :nth-child(2)', { timeout: 60000 })
            .should('be.visible')
            .click({ force: true });
        cy.wait(3000)

        //Clica em nome A/Z
        cy.get('[ng-model="$parent.order"]').click()
        cy.wait(1000)

        cy.get('.open > .ui-select-choices > :nth-child(1)', { timeout: 60000 })
            .should('be.visible')
            .click({ force: true });

    });

    it("Filtro Mais Recente/Mais Antigo", () => {

        cy.get('[ng-model="$parent.order"]').click()
        cy.wait(1000)
        
        //Mais recente
        cy.get('.open > .ui-select-choices > :nth-child(3)', { timeout: 60000 })
            .should('be.visible')
            .click({ force: true });
        cy.wait(3000)

        cy.get('[ng-model="$parent.order"]').click()
        cy.wait(1000)

        //Mais antigo
        cy.get('.open > .ui-select-choices > :nth-child(4)', { timeout: 60000 })
            .should('be.visible')
            .click({ force: true });
});

    it("Filtro Card", () => {

        //Clica em Cartoes
        cy.get('.visible-xl')
        .click()

        cy.wait(1000)
        
        //Capa
        cy.get('.open > .ui-select-choices > :nth-child(1)')
        .click()

        cy.wait(1000)

         //Clica em Cartoes
        cy.get('.visible-xl').click()
       
        //Miniaturas 
        cy.get('.open > .ui-select-choices > :nth-child(3)')
        .click()

           cy.wait(1000)

         //Clica em Cartoes
        cy.get('.visible-xl').click()

                     cy.wait(1000)
        
        //Capa
        cy.get('.open > .ui-select-choices > :nth-child(1)')
        .click()

        cy.wait(1000)

        //Clica em Cartoes
        cy.get('.visible-xl').click()

        cy.wait(1000)

        //Lista
        cy.get('.open > .ui-select-choices > :nth-child(4)')
        .click()

           cy.wait(1000)

        //Clica em Cartoes
        cy.get('.visible-xl').click()
        
        cy.wait(1000)

        //Cartoes
        cy.get('.open > .ui-select-choices > :nth-child(1)')
        .click()
        

        });
    });
});
