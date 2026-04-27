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
    cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.viewport(1920, 1080);

    cy.contains("button", "Entrar")
      .should('be.visible')
      .click({ force: true });

   cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("thiagosuporte@uorak.com"); 

   cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

     // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");
  });

 it('Vai até a Categoria', () => {
    
    // =============================
    // 🔹 Acessa Treinamentos
    // =============================
    cy.get('[title="Trilhas"] > .sideitem')
    .should('be.visible')
    .click({ force: true });

      //Clica na Categoria
      cy.contains("li.list-group-item", "Teste Automação",{timeout: 20000})
      .should('be.visible')
      .click({force: true})

      cy.wait(2000)

  });

   //Função para excluir Trilhas
function excluirTreinamento(nome) {

  //Clica no Treinamento
  cy.contains('.card-title', nome, { timeout: 60000 })
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });

  //Clica em editar
  cy.get('.end.ng-scope > .icon-edit', { timeout: 60000 })
    .should('be.visible')
    .click();

  //Clica em Excluir
  cy.get('[name="SaveCourseForm"] > .content-box-footer > .content-box-footer-left > .icon-discard', { timeout: 20000 })
    .scrollIntoView()
    .click();

  //Confirma exclusão
  cy.get('[switch="modal.removeCourse"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent', { timeout: 20000 })
    .click();

  //Valida que foi removido
  cy.contains('.card-title', nome).should('not.exist');
}

//Teste completo
it('Exclui todos os Treinamentos', () => {

  const treinamentos = [
    'Primeiro Cenário Trilha',
    'Segundo Cenário Trilha',
    'Terceiro Cenário Trilha',
    'Quarto Cenário Trilha',
    'Quinto Cenário Trilha',
    'Quinto Cenário Trilha - Segunda Trilha'
  ];

  treinamentos.forEach((nome) => {
    excluirTreinamento(nome);

     });

  });

    it('Exclui o campo criado', () => {

      cy.get('[title="Configurações"] > .sideitem')
      .click({force:true});

    cy.wait(2000);

    cy.get('[ui-sref="accessLink.content.configurations.account-subscription.custom-fields"]')
    .click()

   cy.contains('td', 'LECTOR10', { timeout: 60000 })
  .parents('tr')
  .within(() => {
    cy.get('button[ng-click*="showRemoveCustomField"]')
      .scrollIntoView()
      .should('be.visible')
      .click();
  });

  cy.get('.open-content > [ui-view=""] > .modal-overlay > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent')
  .click()

  cy.wait(1000)

  //Salvar
  cy.get('.open-content > .content-box-footer > .btn-swipe-accent')
  .click()

  });

});

