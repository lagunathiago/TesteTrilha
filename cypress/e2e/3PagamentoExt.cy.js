Cypress.on('uncaught:exception', (err) => {
  const msg = err.message || '';

  if (
    msg.includes('Cannot read properties of null') ||
    msg.includes('Cannot read properties of undefined') ||   
    msg.includes("reading 'then'") ||                        
    msg.includes('charAt') ||
    msg.includes('writeText') ||
    msg.includes('Clipboard') ||
    msg.includes('ResizeObserver loop completed with undelivered notifications') ||
    msg.includes('renderCertificateClick is not a function')
  ) {
    return false;
  }
});

// 🔥 função para excluir trilha
function excluirTrilha(nomeTrilha) {

  cy.contains('.card-title', nomeTrilha, { timeout: 60000 })
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });

    cy.wait(4000)

  // Editar
  cy.get('button.btn-icon-accent.icon-edit', { timeout: 60000 })
    .should('be.visible')
    .click({ force: true });

     cy.wait(2000)

  // Excluir
  cy.get('.open-content > .content-box-footer > .content-box-footer-left > .btn-swipe-accent',{timeout: 10000})
    .scrollIntoView()
    .click({ force: true });

    cy.wait(2000)

  // Confirmar exclusão
  cy.get('[switch="modal.removeTrail"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent', { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });

  cy.wait(2000);

}
describe("Teste - Exclusão de Trilhas", () => {

  before(() => {
    cy.visit("https://hml.lector.live/ext/subscribe/login");
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

    cy.get("#btn-entrar", { timeout: 60000 })
      .should("be.visible")
      .click();

    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");
  });

  
  it('Vai até a Categoria', () => {

    cy.get('[title="Trilhas"] > .sideitem')
      .should('be.visible')
      .click({ force: true });

    cy.contains("li.list-group-item", "Teste Automação", { timeout: 20000 })
      .should('be.visible')
      .click({ force: true });

  });

  it('Exclui as 6 trilhas criadas', () => {

    const trilhas = [
      `Pagamento Sicreedi á vista`,
      `Pagamento Sicreedi limite de parcela`,
      `Pagamento Sicreedi á vista com cupom`,
    ];

    trilhas.forEach((nome) => {
      excluirTrilha(nome);
    });

  });

  it('Exclui os cupons', () => {

    cy.get('[title="Cadastros"] > .sideitem') //Clica em Cadastros
      .click({force:true});

        //Clica em cupons
        cy.contains('a', 'Cupons', { timeout: 60000 })
  .should('be.visible')
  .click();

  cy.wait(2000)

  //Clica no cupom
 cy.contains('tr', 'Pagaamento Sicredi', { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .within(() => {
    cy.get('.edit-coupon-btn')
      .scrollIntoView()
      .should('be.visible')
      .click();
  });

    cy.wait(1000)

  //Clica em remover
  cy.get('.end > .btn-swipe-main')
    .should('be.visible')
    .click();

      cy.wait(1000)

    //Clica em remover
    cy.get('[switch="modal.removeCoupon"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent')
    .should('be.visible') 
    .click();

  });


});

