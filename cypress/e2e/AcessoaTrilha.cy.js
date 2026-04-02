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

    cy.visit("https://www.hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("thiagosuporte2@uorak.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("123");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');

});

  context("Validações gerais do fluxo de e-mails", () => {
    
    /*
     it("Vai até Vitrine", () => {
        
        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(1000)

         //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(2)', { timeout: 60000 })
        .should('be.visible')
        .click();

            });

      it('Incrição na trilha Gratuita sem aprovação', () => {

        //Ver Tudo
       cy.get('.show-all', { timeout: 60000 })
  .eq(1) // índice começa em 0 → 1 = segundo
  .should('be.visible')
  .click();

        //Clica na Trilha
        cy.contains('.showcase-card-title', 'Acesso a Trilha', { timeout: 15000 })
             .scrollIntoView()
            .should('be.visible')
            .click();

        cy.wait(5000);

        //Fazer incrição
        cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent', { timeout: 15000 })
        .click()

      });

      it('Clica no acessar do treinamento', () => {

        cy.wait(3000)

        //Clica em acessar
            cy.get('.pv-5 > .btn-swipe-accent',{timeout:60000})
           .click()

            cy.contains('Aula Presencial', { timeout: 20000 })
  .should('be.visible');

  //Clica em proximo (Será redirecionado para a webconferencia)
    cy.get('#nextResourceArrow > i.icon-pointer-right')
    .scrollIntoView()
    .click()

    cy.wait(5000)

    //Verifica se está na webconferencia
cy.contains('.course-info-section-title','Web Teste',{timeout:10000})
.scrollIntoView()
.should('be.visible');

    cy.wait(2000)

       //Clica em voltar
    cy.get("#hideResource", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true })

      cy.wait(3000)

        });
*/
        it('Volta pro Perfil aluno e valida os Relatórios de compras', () => {

    cy.visit("https://www.hml.lector.live/lector_suporte/subscribe/login");
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

      it("Vai até categoria", () => {

   //Clica em Trilhas
        cy.get('[title="Trilhas"] > .sideitem', {timeout: 60000})
        .click(); 

        cy.wait(3000)

        //Clica na Categoria
      cy.contains('li.list-group-item', /^00Teste$/, { timeout: 60000 })
  .should('be.visible')
  .click()

       });

       it('Abre a Trilha', () => {

           //Clica na Trilha
      cy.contains('Acesso a Trilha', { timeout: 60000 })
  .scrollIntoView()
  .click({ force: true })

    // Clicar no botão "Gerenciar"
    cy.contains('span', 'Gerenciar', { timeout: 15000 })
        .should('be.visible')
        .click();

         //Clica na Lista de Presença (Aulas presenciais)
      cy.contains('a', 'Lista de Presença (Aulas presenciais)', { timeout: 20000 })
  .click({force: true})


       });
       
    });
});
















