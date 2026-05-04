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
      .type("samos@mailto.plus");

   cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

     // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");
  });
  
  it('Vai até a Categoria', () => {
    
    // =============================
    // 🔹 Acessa TTrilhas
    // =============================
    cy.get('[title="Trilhas"] > .sideitem')
    .should('be.visible')
    .click()

      //Clica na Categoria
      cy.contains("li.list-group-item", "Teste Automação",{timeout: 20000})
      .should('be.visible')
      .click({force: true})

      cy.wait(2000)

  });
})