
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

  context("Teste de capa", () => {
    it("Capa/Banner/Tradicional", () => {

      // Clicando na aba Trilhas
      cy.get('[title="Trilhas"] > .sideitem', { timeout: 60000 })
        .should("be.visible")
        .click();

      //Clica na categoria 05/01
      cy.contains("li.list-group-item", "00000Teste")
      .click();

      cy.get('.title-bar > .btn-icon').click()

      cy.wait(1000)

       //preenche o campo de nome da trilha
        cy.get('input[placeholder="Informe o nome"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('Teste Capa', { delay: 50 })

      //Tradicional
      cy.get(
        'label.thumb-placeholder[aspect="square"] input[type="file"]'
      ).selectFile("cypress/fixtures/images6.png", { force: true });
      cy.log("AJUSTE A IMAGEM MANUALMENTE");
      cy.wait(6000); // Aguarda alguns segudos para ajustar a imagem
      cy.get('button[ng-click="cropper.save()"]').click(); // Confirma em confirmar para salvar a imagem
      cy.wait(1000);
      //Capa
      cy.get(
        'label.thumb-placeholder[aspect="cover"] input[type="file"]'
      ).selectFile("cypress/fixtures/capa 3.png", { force: true });
      cy.log("AJUSTE A IMAGEM MANUALMENTE");
      cy.wait(6000); // Aguarda alguns segudos para ajustar a imagem
      cy.get('button[ng-click="cropper.save()"]').click(); // Confirma em confirmar para salvar a imagem
      cy.wait(1000);

      //Baner
      cy.get(
        'label.thumb-placeholder[aspect="banner"] input[type="file"]'
      ).selectFile("cypress/fixtures/210938.jpg", { force: true });
      cy.log("AJUSTE A IMAGEM MANUALMENTE");
      cy.wait(6000); // Aguarda alguns segudos para ajustar a imagem
      cy.get('button[ng-click="cropper.save()"]').click(); // Confirma em confirmar para salvar a imagem
      cy.wait(1000);
    });

    it("Estapas", () => {

      //Estapas
      cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]')
      .scrollIntoView()
      .click()

      cy.wait(1000)

      //Nova estapa
      cy.get('.pt-20 > .flex > .btn-swipe-accent')
      .click()

      cy.wait(1000)

      //Novo conteudo
      cy.get('[colspan="6"] > .btn-swipe-accent')
      .click()

      cy.wait(1000)

      //Clica em treinamento
      cy.get('.pv-5 > .w-100')
      .click()

      cy.wait(1000)

      //Clica em documento
      cy.get('.open > .ui-select-choices > :nth-child(3)')
      .click()

      cy.wait(1000)

      cy.contains(".ui-select-container", "Escolha um documento")
        .should("be.visible")
        .click()
        .within(() => {
          cy.get("input.ui-select-search")
            .should("be.visible")
            .type("Manual Minha");
        });

      cy.contains(".ui-select-choices-row", "Manual Minha", {
        timeout: 30000,
      })
        .should("be.visible")
        .click();

      cy.get('.start > .btn-swipe-accent > ng-transclude > .ng-binding')
      .click()

    });
 
    it('Cria a turma', () => {

      //Vai até turma
    cy.get('[trails=""] > .tabs > .ng-scope')
    .scrollIntoView()
    .click(); 

      //nova turma
      cy.get('.gap > .btn-swipe-accent')
      .click()
     
        // NOME DA TURMA (re-get após digitar para evitar re-render do Angular)
        cy.get('input[placeholder="Informe um nome para a turma"]', { timeout: 20000 })
            .filter(':visible')
            .first()
            .should('be.enabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('Turma teste', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma teste');

        cy.get(".class-price > :nth-child(1) > .icon-checkbox").click(); //selecionar turma gratuita
        cy.get(".column > :nth-child(1) > .icon-checkbox").click(); //aprovação do gestor

        cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
        .click(); //salvar turma
        
        cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
        //Salvar Turma

      cy.wait(5000)

          });
      });
  });

