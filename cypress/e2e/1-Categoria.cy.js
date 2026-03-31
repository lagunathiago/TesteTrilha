
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

  context("Teste Categoria", () => {

    it("Nova categoria", () => {

      //Abrir menu de trilhas
      cy.get('[title="Trilhas"] > .sideitem', { timeout: 60000 })
        .should('be.visible')
        .click();

      // Clicar em adicionar categoria
      cy.get('.node-selected > .tree-icons > .icon-add', { timeout: 60000 })
  .should('be.visible')
  .click();

      // Preencher nome da categoria
      cy.get('input[placeholder="Nova categoria"]', { timeout: 60000 })
        .filter(':visible')
        .first()
        .should('not.be.disabled')
        .focus()
        .clear({ force: true })
        .type('Nova Categoria 05/01/26', { delay: 30, force: true })
        .should('have.value', 'Nova Categoria 05/01/26');

      // Salvar categoria
      cy.get('[switch="modal.createCategory"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent').click();
      cy.wait(5000); //espera para salvar a categoria

    });

    it("Nova Subcategoria", () => {

      cy.get('[title="Trilhas"] > .sideitem').click();

      //Selecionar categoria criada
      cy.contains('Nova Categoria 05/01/26', { timeout: 60000 })
        .filter(':visible')
        .first()
        .scrollIntoView()
        .should('be.visible')
        .parents('li') // sobe até o nó da árvore
        .click();

      // Clicar em adicionar subcategoria
      cy.get('.node-selected > .tree-icons > .icon-add').click();

      // Preencher nome da subcategoria
      cy.get('input[placeholder="Nova categoria"]', { timeout: 60000 })
        .filter(':visible')
        .first()
        .should('not.be.disabled')
        .focus()
        .clear({ force: true })
        .type('Subcategoria 22/01', { delay: 30, force: true })
        .should('have.value', 'Subcategoria 22/01');

      // Salvar subcategoria
      cy.get('[switch="modal.createCategory"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent').click();
      cy.wait(5000); //espera para salvar a subcategoria

      // Validar criação da subcategoria
      cy.contains('Subcategoria 22/01').should('be.visible');

    });

  });

});
