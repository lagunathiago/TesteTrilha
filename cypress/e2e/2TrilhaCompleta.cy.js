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
    msg.includes('ResizeObserver loop completed with undelivered notifications') ||
    msg.includes('renderCertificateClick is not a function')
  ) {
    return false;
  }
});

describe("Teste - Login", () => {

  before(() => {
    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.viewport(1920, 1080);

    cy.contains("button", "Entrar")
      .should('be.visible')
      .click({ force: true });

   cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("teste0812@sharklasers.com");

   cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

     // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

  });

    it("Vai até Vitrine", () => {
        
        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

        //Clica na vitrine Automação
        cy.contains('div.showcase-menu-name', /^teste automoção$/)
  .should('be.visible')
  .scrollIntoView()
  .click();
      
  });

it('Clica na Trilha e Faz Incrição', () => {

    //Ver tudo
    cy.get(':nth-child(3) > .carousel-container > .showcase-title-container > .middle > .show-all')
    .should('be.visible')
    .click()  

    cy.wait(3000)

    //Clica na trilha
    cy.contains('.card-container', 'Trilha Completa Automação', { timeout: 60000 })
    .scrollIntoView()
    .should('be.visible')
    .click();

/*
    //Faz incrição
    cy.get(':nth-child(2) > .mt-10 > .default-gap > div > .btn-swipe-accent')
    .should('be.visible')
    .click();

    cy.wait(6000)
    */

  });

  it('Visualiza o Documento', () => {

    cy.wait(4000)

    //Clica em acessar no documento
    cy.get(':nth-child(2) > .overflow-x > .stage-content-list > tbody > tr.ng-scope > :nth-child(6) > .pv-5 > .btn-swipe-accent')
    .should('be.visible')
    .click()

    cy.wait(4000)

     cy.log('VISUALIZE O DOCUMENTO')
     cy.wait(6000)
     cy.log('VISUALIZE O DOCUMENTO')

     //Clica em voltar
 cy.get('.hide-resource:visible')
  .first()
  .click({ force: true });
  
 });

 it('Visualize os conteúdos do treinamento', () => {

    //Clica em acessar no Treinamento
    cy.get(':nth-child(3) > .overflow-x > .stage-content-list > tbody > tr.ng-scope > :nth-child(6) > .pv-5 > .btn-swipe-accent')
    .should('be.visible')
    .click()

    cy.log('VISUALIZE OS CONTEUDOS DO TREINAMENTO')
    cy.pause(6000)
    cy.log('VISUALIZE OS CONTEUDOS DO TREINAMENTO')

    

  });

});
