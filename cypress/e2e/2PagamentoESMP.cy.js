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


// 🔥 função para gerar data
function gerarDataAtual() {
  const agora = new Date();

  return `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;
}


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
    cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.viewport(1920, 1080);

    cy.contains("button", "Entrar")
      .should('be.visible')
      .click({ force: true });

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("samos@mailto.plus");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

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

    const data = gerarDataAtual();

    const trilhas = [
      `Á vista com aprovação - Automação ${data}`,
      `Á vista sem aprovação - Automação ${data}`,
      `Recorrente 2x com aprovação - Automação ${data}`,
      `Recorrente 2x sem aprovação - Automação ${data}`,
      `Recorrente 5x com aprovação - Automação ${data}`,
      `Recorrente 5x sem aprovação - Automação ${data}`,
    ];

    trilhas.forEach((nome) => {
      excluirTrilha(nome);
    });

  });

});