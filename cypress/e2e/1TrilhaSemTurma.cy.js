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
 
   it('Trilha Sem Turma', () => {
        
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
            .type('Trilha Sem Turma Automação', { delay: 50 })
            .should('have.value', 'Trilha Sem Turma Automação')

            //Tradicional
      cy.get('label.thumb-placeholder[aspect="cover"] input[type="file"]').selectFile("cypress/fixtures/technology-scaled.jpg", { force: true });
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

    // =====================================================
    // 🔹 Adicona conteudo do tipo Documento 
    // =====================================================

        //Clica em etapas
        cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]')
        .click();

        //Nova estapa
        cy.get('.pt-20 > .flex > .btn-swipe-accent')
        .click()

        //Novo conteúdo
        cy.get('[colspan="5"] > .btn-swipe-accent')
        .click()

        //Seleciona o tipo de conteudo
        cy.get('.pv-5 > .w-100')
        .click()

        //Clica em documento
        cy.get('.open > .ui-select-choices > :nth-child(3)')
        .click()

        cy.get('[model="currentContent.document"] > .multiselect > .border > .ui-select-match > .btn-default')
        .click()

                cy.wait(1000)
               
cy.get('.ui-select-search:visible', { timeout: 60000 })
  .should('be.visible')
  .type('Minha');

cy.contains('.ui-select-choices-row:visible', 'Minha área.pdf', { timeout: 60000 })
  .click();

      //Clcia em adicionar
      cy.get('.start > .btn-swipe-accent')
      .click()

      cy.wait(2000)

    // =========================================
    // 🔹 Adicona conteudo do tipo Treinamento
    // =========================================

        //Clica em etapas
        cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]')
        .click();

        //Nova estapa
        cy.get('.pt-20 > .flex > .btn-swipe-accent')
        .click()

        //Novo conteúdo
      cy.contains('tr', 'Etapa 2')
  .within(() => {
    cy.contains('button', 'Novo conteúdo')
      .click();
  })

  //Clica pra escrevre o nome do treinamento
  cy.get(':nth-child(7) > :nth-child(2) > .content-info-container > [model="currentContent.course"] > .multiselect > .border > .ui-select-match > .btn-default')
  .click();

  cy.wait(1000)

  cy.get('.ui-select-search:visible', { timeout: 60000 })
  .should('be.visible')
  .type('treinamento para automação');

            cy.wait(1000);

            // Selecionar o treinamento no dropdown
            cy.contains('.ui-select-choices-row', 'treinamento para automação', { timeout: 20000 })
                .should('be.visible')
                .click();

            cy.wait(1000);

            //Clcia em adicionar
     cy.get(':nth-child(7) > :nth-child(8) > .start > .btn-swipe-accent')
     .click()

            cy.wait(2000);

    // ==============================================================
    // 🔹 Adicona conteudo do tipo Avaliação(Todas na mesma pagina)
    // ==============================================================

        //Clica em etapas
        cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]')
        .click();

        //Nova estapa
        cy.get('.pt-20 > .flex > .btn-swipe-accent')
        .click()

             //Novo conteúdo
      cy.contains('tr', 'Etapa 3')
  .within(() => {
    cy.contains('button', 'Novo conteúdo')
      .click();
  })

  cy.wait(1000)

  //abre selection
cy.get('.pv-5 > .w-100', { timeout: 15000 })
                .filter(':visible')
                .first()
                .click();

        cy.wait(1000)

        //Clica em avaliação
        cy.get('.open > .ui-select-choices > :nth-child(2)')
        .click()

        //Clica pra escrever a avaliação
        cy.get(':nth-child(11) > :nth-child(2) > .content-info-container > [types="0,1"] > .multiselect > .border > .ui-select-match > .btn-default')
        .click();

         //Escreve a avaliação
cy.get('input.ui-select-search:visible', { timeout: 10000 })
  .first()
  .type('Avaliação todas na página', { force: true });

            cy.wait(1000);

            // Selecionar a avaliação no dropdown
            cy.contains('.ui-select-choices-row', 'Avaliação todas na página', { timeout: 15000 })
                .should('be.visible')
                .click();

            cy.wait(1000);

               //Clcia em adicionar
     cy.get(':nth-child(11) > :nth-child(8) > .start > .btn-swipe-accent')
     .click()

            cy.wait(2000);

    // ======================================================
    // 🔹 Adicona conteudo do tipo Avaliação(uma por pagina)
    // ======================================================

          cy.contains('Etapa 3')
  .parent()
  .within(() => {
    cy.contains('button', 'Novo conteúdo')
      .click();
  });

    //abre selection
cy.get('.pv-5 > .w-100', { timeout: 15000 })
                .filter(':visible')
                .first()
                .click();

                //Clica em avaliação
        cy.get('.open > .ui-select-choices > :nth-child(2)')
        .click()

        //Clica pra escrever a avaliação
        cy.get(':nth-child(11) > :nth-child(2) > .content-info-container > [types="0,1"] > .multiselect > .border > .ui-select-match > .btn-default')
        .click();

         //Escreve a avaliação
cy.get('input.ui-select-search:visible', { timeout: 10000 })
  .first()
  .type('Avaliação uma por página', { force: true });

            cy.wait(1000);

  // Selecionar a avaliação no dropdown
           cy.get('.ui-select-choices-row:visible', { timeout: 15000 })
  .eq(1) // segunda posição (0 = primeira)
  .click({ force: true });

  cy.wait(1000)

   //Clcia em adicionar
     cy.get(':nth-child(11) > :nth-child(8) > .start > .btn-swipe-accent')
     .click()

     cy.wait(2000);

     // ==============================================================
    // 🔹 Adicona conteudo do tipo Avaliação Reação(uma por pagina)
    // ===============================================================

          cy.contains('Etapa 3')
  .parent()
  .within(() => {
    cy.contains('button', 'Novo conteúdo')
      .click();
  });

    //abre selection
cy.get('.pv-5 > .w-100', { timeout: 15000 })
                .filter(':visible')
                .first()
                .click();

                //Clica em avaliação
        cy.get('.open > .ui-select-choices > :nth-child(2)')
        .click()

        //Clica pra escrever a avaliação
        cy.get(':nth-child(11) > :nth-child(2) > .content-info-container > [types="0,1"] > .multiselect > .border > .ui-select-match > .btn-default')
        .click();

         //Escreve a avaliação
cy.get('input.ui-select-search:visible', { timeout: 10000 })
  .first()
  .type('Reação uma por pagina', { force: true });

            cy.wait(1000);

  // Selecionar a avaliação no dropdown
  cy.contains('.ui-select-choices-row', 'Reação uma por pagina', { timeout: 15000 })
                .should('be.visible')
                .click();

  cy.wait(1000)

   //Clcia em adicionar
     cy.get(':nth-child(11) > :nth-child(8) > .start > .btn-swipe-accent')
     .click()

     cy.wait(2000);

    // ===============================================================
    // 🔹 Adicona conteudo do tipo Avaliação Reação(todas na mesma)
    // ===============================================================

          cy.contains('Etapa 3')
  .parent()
  .within(() => {
    cy.contains('button', 'Novo conteúdo')
      .click();
  });

    //abre selection
cy.get('.pv-5 > .w-100', { timeout: 15000 })
                .filter(':visible')
                .first()
                .click();

                //Clica em avaliação
        cy.get('.open > .ui-select-choices > :nth-child(2)')
        .click()

        //Clica pra escrever a avaliação
        cy.get(':nth-child(11) > :nth-child(2) > .content-info-container > [types="0,1"] > .multiselect > .border > .ui-select-match > .btn-default')
        .click();

         //Escreve a avaliação
cy.get('input.ui-select-search:visible', { timeout: 10000 })
  .first()
  .type('Reação todas na mesma pagina', { force: true });

            cy.wait(1000);

  // Selecionar a avaliação no dropdown
  cy.contains('.ui-select-choices-row', 'Reação todas na mesma pagina', { timeout: 15000 })
                .should('be.visible')
                .click();

  cy.wait(1000)

   //Clcia em adicionar
     cy.get(':nth-child(11) > :nth-child(8) > .start > .btn-swipe-accent')
     .click()

     cy.wait(2000);

    // ==============================================
    // 🔹 Adicona conteudo do tipo Scorm
    // ==============================================

        //Nova estapa
        cy.get('.pt-20 > .flex > .btn-swipe-accent')
        .click()

        //Novo conteúdo
      cy.contains('tr', 'Etapa 4')
  .within(() => {
    cy.contains('button', 'Novo conteúdo')
      .click();
  })

  //abre selection
cy.get('.pv-5 > .w-100', { timeout: 15000 })
                .filter(':visible')
                .first()
                .click();

                //Clica em Scorm
        cy.get('.open > .ui-select-choices > :nth-child(4)')
        .click()

  cy.wait(1000)

  //clica pra escrever
cy.get('[ng-if="currentContent.type == \'SCORM\'"]')
  .last()
  .find('.ui-select-toggle, .btn-default')
  .click({ force: true });

  cy.get('.ui-select-search:visible', { timeout: 60000 })
  .should('be.visible')
  .type('scorm');

            cy.wait(1000);

            // Selecionar o treinamento no dropdown
            cy.contains('.ui-select-choices-row', 'scorm', { timeout: 20000 })
                .should('be.visible')
                .click();

            cy.wait(1000);

            //Clcia em adicionar
     cy.get(':nth-child(18) > :nth-child(8) > .start > .btn-swipe-accent')
     .click()

            cy.wait(7000);

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