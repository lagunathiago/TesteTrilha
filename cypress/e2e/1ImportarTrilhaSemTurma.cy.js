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

      //Clica na Categoria
      cy.contains("li.list-group-item", "0000TesteAutomação",{timeout: 20000})
      .should('be.visible')
      .click({force: true})

      cy.wait(2000)
 
   });

    it('Trilha Importada Sem Turma', () => {

         //Clica no botão de adicionar nova trilha
        cy.get('.title-bar > .btn-icon',{timeout:60000})
        .click(); 
        
      //preenche o campo de nome da trilha
        cy.get('input[placeholder="Informe o nome"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('Trilha Importada Sem Turma Automação', { delay: 50 })
            .should('have.value', 'Trilha Importada Sem Turma Automação')

            //Tradicional
      cy.get('label.thumb-placeholder[aspect="cover"] input[type="file"]').selectFile("cypress/fixtures/imagem.jpg", { force: true });
      cy.log("AJUSTE A IMAGEM MANUALMENTE");
      cy.wait(6000); // Aguarda alguns segudos para ajustar a imagem
      cy.get('button[ng-click="cropper.save()"]').click(); // Confirma em confirmar para salvar a imagem
      cy.wait(1000);

      //Escreve 40 em aproveitamento minimo
      cy.get('input[ng-model="currentTrail.minimumGradeToApprove"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('10')
  .should('have.value', '10');

  cy.get('iframe.cke_wysiwyg_frame', { timeout: 60000 })
  .should('be.visible')
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then((body) => {
    cy.wrap(body)
      .click()
      .clear()
      .type('Descrição preenchida via Cypress');

  });

   //Clica em etapas
        cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]')
        .click();

  // ---- Ir para aba Etapas e importar etapa ----
            cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]', { timeout: 15000 })
                .scrollIntoView()
                .click();

            cy.wait(1000);

            // Clicar em "Importar etapa"
            cy.get('.pt-20 > .flex > .btn-swipe-main', { timeout: 15000 })
                .should('be.visible')
                .click();

            cy.wait(1000);

            // Buscar a trilha para importar
            cy.get('.modal-body > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default', { timeout: 30000 })
                .should('be.visible')
                .type('Trilha Sem Turma Automação')

            cy.wait(3000);

            // Selecionar a trilha no dropdown
            cy.contains('.ui-select-choices-row', 'Trilha Sem Turma Automação', { timeout: 30000 })
                .should('be.visible')
                .click();

            cy.wait(1000);

            // Confirmar importação
            cy.get('ui-view.ng-scope > .modal-overlay > .modal > .end > .btn-swipe-accent', { timeout: 15000 })
                .should('be.visible')
                .click();

            cy.wait(5000);

            //Clica para excluir uma avaliação
            cy.get(':nth-child(12) > [style="padding-right: var(--default-gap);"] > .trail-stage-action-buttons > .icon-discard')
                .should('be.visible')
                .click();

               cy.wait(3000)

            //Clica para excluir uma avaliação
             cy.get(':nth-child(12) > [style="padding-right: var(--default-gap);"] > .trail-stage-action-buttons > .icon-discard')
                .should('be.visible')
                .click();

               cy.wait(3000)

     // =============================
    // 🔹 Adicona conteudo do tipo documento
    // =============================

        //Nova estapa
        cy.get('.pt-20 > .flex > .btn-swipe-accent')
        .click()

        //Novo conteúdo
      cy.contains('tr', 'Etapa 5')
  .within(() => {
    cy.contains('button', 'Novo conteúdo')
      .click();
  })

  //abre selection
cy.get('.pv-5 > .w-100', { timeout: 15000 })
                .filter(':visible')
                .first()
                .click();

                //Clica em documento
        cy.get('.open > .ui-select-choices > :nth-child(3)')
        .click()

  cy.wait(1000)

  //Clica pra escrever
  cy.get(':nth-child(20) > :nth-child(2) > .content-info-container > [model="currentContent.document"] > .multiselect > .border > .ui-select-match > .btn-default')
        .click()

                cy.wait(1000)
               
cy.get('.ui-select-search:visible', { timeout: 60000 })
  .should('be.visible')
  .type('ESPEC');

cy.contains('.ui-select-choices-row:visible', 'ESPEC', { timeout: 60000 })
  .click();

      //Clcia em adicionar
      cy.get('.start > .btn-swipe-accent')
      cy.get(':nth-child(20) > :nth-child(7) > .start > .btn-swipe-accent')
      .click()

      cy.wait(5000)

       // ==============================================================
    // 🔹 Adicona conteudo do tipo Certificado
    // ==============================================================   

            //Clica em Certificado
         cy.get('[ui-sref="accessLink.content.trails.edit.id.version.certificate"]', { timeout: 15000 })
                    .should('be.visible')
                    .click();

                    //Clica em escolher Certificado
                    cy.get('.p-20 > .box > .btn-swipe-accent')
                    .click()

                cy.wait(1000);

                //Clica em escolher certificado
                cy.get('[name="TrailCertificateSelect"] > .ui-select-match > .btn-default')
                    .should('be.visible')
                    .click();

                    //Digita no certificado
                cy.get('[name="TrailCertificateSelect"] input[placeholder="Escolha um certificado"]', { timeout: 15000 })
                    .should('be.visible')
                    .type('Certificado de trilha - Academy');

                cy.wait(2000); //Espera os resultados carregarem

                //Seleciona o certificado 
                cy.get('.ui-select-highlight', { timeout: 15000 })
                    .first()
                    .should('be.visible')
                    .click();

                cy.wait(2000);

                 //Salvar Trilha
        cy.get('.content-box-footer > .flex > .btn-swipe-accent')
        .click();

        cy.wait(7000)

        cy.log('✅ Automação da Criação da trilha completa concluída com sucesso');


   });

});
