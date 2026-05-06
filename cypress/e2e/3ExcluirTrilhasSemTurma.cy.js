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
    cy.visit("https://hml.lector.live/philips/subscribe/login");
    cy.viewport(1920, 1080);

    cy.contains("button", "Entrar")
      .should('be.visible')
      .click({ force: true });

   cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("qualidade2@lectortec.com.br");

   cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("2006lrnrgr");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

     // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");
  });
  
  it('Vai até a Categoria', () => {
    
    // ==========================================
    // 🔹 Acessa Trilhas
    // ==========================================
    cy.get('[title="Trilhas de Aprendizagem"] > .sideitem')
    .should('be.visible')
    .click()

    cy.wait(4000)

      //Clica na Categoria
      cy.contains("li.list-group-item", "0000TesteAutomação",{timeout: 20000})
      .should('be.visible')
      .click({force: true})

      cy.wait(2000)

  });

  it('Excluir a Primeira Trilha', () => {
    
    //clica no icone da editar da trilha
cy.contains('tr', 'Trilha Importada Sem Turma Automação', { timeout: 60000 })
  .should('be.visible')
  .within(() => {
    cy.get('.edit-trail')
      .should('be.visible')
      .click();
  });

  //Clica em Excluir
  cy.get('.open-content > .content-box-footer > .content-box-footer-left > .btn-swipe-accent')
  .should('be.visible')
  .click(); 

  //Clica em Excluir novamente
  cy.get('[switch="modal.removeTrail"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent')
  .should('be.visible')
  .click(); 

  cy.wait(5000)

 });

  it('Excluir a Segunda Trilhas', () => {
    
    //clica no icone da editar da trilha
cy.contains('tr', 'Trilha Sem Turma Automação', { timeout: 60000 })
  .should('be.visible')
  .within(() => {
    cy.get('.edit-trail')
      .should('be.visible')
      .click();
  });

  //Clica em Excluir
  cy.get('.open-content > .content-box-footer > .content-box-footer-left > .btn-swipe-accent')
  .should('be.visible')
  .click(); 

  //Clica em Excluir novamente
  cy.get('[switch="modal.removeTrail"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent')
  .should('be.visible')
  .click(); 

  cy.wait(5000)

 });

});