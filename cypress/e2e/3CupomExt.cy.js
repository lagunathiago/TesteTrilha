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

    cy.visit("https://www.hml.lector.live/ext/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("qualidade@lectortec.com.br");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("c8d593QGXOkjRjC");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');

  });

 it('Clica na Categoria', () => {

         //Clica no menu Trilhas
        cy.get('[title="Trilhas"] > .sideitem',{timeout:60000})
        .scrollIntoView()
        .click(); 

          //Clica na Categoria
      cy.contains("li.list-group-item", "Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})
        
    });

function excluirTrilha(nomeTrilha) {
  // Clica no menu Trilhas
  cy.get('[title="Trilhas"] > .sideitem', { timeout: 60000 })
    .scrollIntoView()
    .should("be.visible")
    .click({ force: true });

  // Clica na categoria
  cy.contains("li.list-group-item", "Teste Automação", { timeout: 60000 })
    .should("be.visible")
    .click({ force: true });

  cy.wait(2000);

  // Abre a trilha encontrada
  cy.contains(".card-title, .title, td, tr", nomeTrilha, { timeout: 60000 })
    .scrollIntoView()
    .should("be.visible")
    .click({ force: true });

  cy.wait(2000);

  // Clica em editar
  cy.get(".end.ng-scope > .icon-edit", { timeout: 60000 })
    .should("be.visible")
    .click({ force: true });

  cy.wait(4000);

  // Clica em excluir
  cy.get('.open-content > .content-box-footer > .content-box-footer-left > .btn-swipe-accent',{timeout: 20000 })
    .scrollIntoView()
    .should("be.visible")
    .click({ force: true });

  cy.wait(1000);

  // Confirma exclusão
  cy.get('[switch="modal.removeTrail"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent',{ timeout: 20000 })
    .should("be.visible")
    .click({ force: true });

  cy.wait(3000);
}

it("Exclui as 4 trilhas criadas", () => {
  trilhasCriadas.forEach((nomeTrilha) => {
    excluirTrilha(nomeTrilha);
  });
 });

it('Vai até cadastro', () => {
    
  // Garante que está na tela de cupons (opcional, mas seguro)
  cy.get('[title="Cadastros"] > .sideitem', { timeout: 60000 })
    .should("be.visible")
    .click();

  cy.contains('a', 'Cupons', { timeout: 60000 })
    .should('be.visible')
    .click();
})


// Array com os cupons
const cupons = [
  'Automação Trilha%',
  'Automação Trilha R$'
];

// Função para excluir cupom
function excluirCupom(nomeCupom) {

  cy.wait(2000);

  // Pesquisa o cupom
  cy.get('input[placeholder="Pesquisar..."]', { timeout: 20000 })
    .should("be.visible")
    .clear()
    .type(nomeCupom);

  cy.get(".title-bar > .multiselect > .btn", { timeout: 60000 })
    .should("be.visible")
    .click();

  cy.wait(3000);

  // Clica em editar na linha correta
  cy.contains('tr', nomeCupom, { timeout: 60000 })
    .should('be.visible')
    .within(() => {
      cy.get('.edit-coupon-btn')
        .should('be.visible')
        .click();
    });

  // Clica em remover
  cy.contains("button", "Remover", { timeout: 20000 })
    .should("be.visible")
    .click();

  // Confirma exclusão
  cy.get('[switch="modal.removeCoupon"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent', {
    timeout: 60000,
  })
    .should("be.visible")
    .click();

  cy.wait(2000);
}

it('Exclui os cupons', () => {
  excluirCupom(cupons[0]);
  excluirCupom(cupons[1]);
 });

});






