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
    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
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
    
    // =============================
    // 🔹 Acessa TTrilhas
    // =============================

    cy.get('[title="Trilhas"] > .sideitem')
    .should('be.visible')
    .click()

      //Clica na Categoria
      cy.contains("li.list-group-item", "00000Teste Automação",{timeout: 20000})
      .should('be.visible')
      .click({force: true})

      cy.wait(2000)

  });
  
   it('Trilha Completa', () => {

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
            .type('Impedir Conclusão Automação', { delay: 50 })
            .should('have.value', 'Impedir Conclusão Automação')

            //Tradicional
      cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile("cypress/fixtures/teste10.jpg", { force: true });
      cy.log("AJUSTE A IMAGEM MANUALMENTE");
      cy.wait(6000); // Aguarda alguns segudos para ajustar a imagem
      cy.get('button[ng-click="cropper.save()"]').click(); // Confirma em confirmar para salvar a imagem
      cy.wait(1000);

      //Escreve 40 em aproveitamento minimo
      cy.get('input[ng-model="currentTrail.minimumGradeToApprove"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('20')
  .should('have.value', '20');

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

  cy.wait(2000)

  //Clica na Fleg Impedir matrículas de serem concluídas
  cy.get('[block-finish-subscriptions=""] > .checkbox > .icon-checkbox')
  .click()

  cy.wait(2000)

    // =======================================
    // 🔹 Adicona conteudo do tipo Documento 
    // =======================================

        //Clica em etapas
        cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]')
        .click();

        //Nova estapa
        cy.get('.pt-20 > .flex > .btn-swipe-accent')
        .click()

        //Novo conteúdo
        cy.get('[colspan="6"] > .btn-swipe-accent')
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

    // =============================
    // 🔹 Adicona conteudo do tipo Treinamento
    // =============================

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
  .type('Treinamento pra Trilha Automação 1');

            cy.wait(1000);

            // Selecionar o treinamento no dropdown
            cy.contains('.ui-select-choices-row', 'Treinamento pra Trilha Automação 1', { timeout: 20000 })
                .should('be.visible')
                .click();

            cy.wait(1000);

            //Clcia em adicionar
     cy.get(':nth-child(7) > :nth-child(8) > .start > .btn-swipe-accent')
     .click()

            cy.wait(2000);

    // =============================
    // 🔹 Adicona conteudo do tipo Avaliação(Todas na mesma pagina)
    // =============================

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
  .type('todas na mesma', { force: true });

            cy.wait(1000);

            // Selecionar a avaliação no dropdown
            cy.contains('.ui-select-choices-row', 'todas na mesma', { timeout: 15000 })
                .should('be.visible')
                .click();

            cy.wait(1000);

               //Clcia em adicionar
     cy.get(':nth-child(11) > :nth-child(8) > .start > .btn-swipe-accent')
     .click()

            cy.wait(2000);

    // =============================
    // 🔹 Adicona conteudo do tipo Avaliação(uma por pagina)
    // =============================

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
  .type('uma por pagina Thiago', { force: true });

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

     // =============================
    // 🔹 Adicona conteudo do tipo Avaliação Reação(uma por pagina)
    // =============================

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
  .type('Reação uma por página Thiago', { force: true });

            cy.wait(1000);

  // Selecionar a avaliação no dropdown
  cy.contains('.ui-select-choices-row', 'Reação uma por página Thiago', { timeout: 15000 })
                .should('be.visible')
                .click();

  cy.wait(1000)

   //Clcia em adicionar
     cy.get(':nth-child(11) > :nth-child(8) > .start > .btn-swipe-accent')
     .click()

     cy.wait(2000);


      // =============================
    // 🔹 Adicona conteudo do tipo Avaliação Reação(todas na mesma)
    // =============================

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
  .type('Reação todas em uma', { force: true });

            cy.wait(1000);

  // Selecionar a avaliação no dropdown
  cy.contains('.ui-select-choices-row', 'Reação todas em uma ', { timeout: 15000 })
                .should('be.visible')
                .click();

  cy.wait(1000)

   //Clcia em adicionar
     cy.get(':nth-child(11) > :nth-child(8) > .start > .btn-swipe-accent')
     .click()

     cy.wait(2000);

    // =============================
    // 🔹 Adicona conteudo do tipo Scorm
    // =============================

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
  .type('Simbologia');

            cy.wait(1000);

            // Selecionar o treinamento no dropdown
            cy.contains('.ui-select-choices-row', 'Simbologia', { timeout: 20000 })
                .should('be.visible')
                .click();

            cy.wait(1000);

            //Clcia em adicionar
     cy.get(':nth-child(18) > :nth-child(8) > .start > .btn-swipe-accent')
     .click()

            cy.wait(7000);

    // =========================================================================================================
    // 🔹 Criação da truma Gratuita
    // =========================================================================================================

        //adcicionar turma
        cy.get('[trails=""] > .tabs > .ng-scope')
        .scrollIntoView()
        .click();

        cy.get('.gap > .btn-swipe-accent')
        .click();
        
        // NOME DA TURMA (re-get após digitar para evitar re-render do Angular)
        cy.get('input[placeholder="Informe um nome para a turma"]', { timeout: 20000 })
            .filter(':visible')
            .first()
            .should('be.enabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('Turma Gratuita', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma Gratuita');

            // PREÇO (máscara monetária: 391 => 3,91)
        cy.get('#currentClassPrice', { timeout: 60000 })
            .should('be.visible')
            .and('not.be.disabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('1.00', { delay: 50, force: true })
            .blur()

             cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo

       cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Aluno")

cy.contains('.ui-select-choices-row', 'Aluno', {timeout:60000})
  .first()
  .click()

  cy.wait(1000)

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

       // SALVAR TURMA
        cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent').click();

        //salvar trilha
        cy.get('.content-box-footer > .flex > .btn-swipe-accent').click();


    });

    it('Duplica turma paga, cria turma paga e adiciona certificado', () => {
      
         //Clica no Treinamento
  cy.contains('.card-title', 'Impedir Conclusão Automação', {timeout: 60000})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

  cy.wait(4000)

    //Clica em editar
  cy.get('.end.ng-scope > .icon-edit',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(1000)

  //Clica na turma
  cy.get('[trails=""] > .tabs > .ng-scope')
  .click()

//Clica em editar da turma
  cy.get('.center > .icon-edit')
  .click()

  cy.wait(2000)

  //Flega como gratuita
  cy.get('.class-price > :nth-child(1) > .icon-checkbox')
  .click()

  cy.wait(1000)

  //Clica em salvar
cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
.scrollIntoView()
.click()

cy.wait(1000)

//Clica em duplicar
cy.get('.center > .icon-copy')
.click()

// PREÇO (máscara monetária: 391 => 3,91)
        cy.get('#currentClassPrice', { timeout: 60000 })
            .should('be.visible')
            .and('not.be.disabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('1.00', { delay: 50, force: true })
            .blur();

            cy.wait(1000)

            //Salvar Truma
        cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
        .click();

        //Salvar Trilha
        cy.get('.content-box-footer > .flex > .btn-swipe-accent')
        .click();

        cy.wait(5000)

        //=======================================CRIA TURMA================================================//
        
        //Clica no Treinamento
  cy.contains('.card-title', 'Impedir Conclusão Automação', {timeout: 60000})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

  cy.wait(4000)

    //Clica em editar
  cy.get('.end.ng-scope > .icon-edit',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(1000)

  //Clica na Turma
  cy.get('[trails=""] > .tabs > .ng-scope')
  .click()

  //Clica em Nova turma
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
            .type('Turma Paga', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma Paga');

            //Flega como gratuita
  cy.get('.class-price > :nth-child(1) > .icon-checkbox')
  .click()

  cy.wait(1000)
            
             cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo

       cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Aluno")

cy.contains('.ui-select-choices-row', 'Aluno', {timeout:60000})
  .first()
  .click()

  cy.wait(1000)

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

       //Salvar Turma
        cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent').click();

        //Salvar Trilha
        cy.get('.content-box-footer > .flex > .btn-swipe-accent').click();

        cy.wait(5000);

        //=========================CRIA TRILHA PAGA======================//

        //Clica na trilha
  cy.contains('.card-title', 'Impedir Conclusão Automação', {timeout: 60000})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

  cy.wait(4000)

    //Clica em editar
  cy.get('.end.ng-scope > .icon-edit',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(1000)

  //Clica na Turma
  cy.get('[trails=""] > .tabs > .ng-scope')
  .click()

  cy.contains('tr', 'Turma Paga', { timeout: 60000 })
  .should('be.visible')
  .within(() => {
    cy.get('button.icon-edit')
      .should('be.visible')
      .click({ force: true });
  });

  //Tira a fleg de Gratuito
  cy.get('.class-price > :nth-child(1) > .icon-checkbox')
  .click()

// PREÇO (máscara monetária: 100 => 1,00)
        cy.get('#currentClassPrice', { timeout: 60000 })
            .should('be.visible')
            .and('not.be.disabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('1.00', { delay: 50, force: true })
            .blur();

            cy.wait(1000)

       //Salvar Turma
        cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent').click();

        //Salvar Trilha
        cy.get('.content-box-footer > .flex > .btn-swipe-accent').click();

        cy.wait(7000);

//===========================Duplica a turma paga============================//

//Clica na trilha
  cy.contains('.card-title', 'Impedir Conclusão Automação', {timeout: 60000})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

  cy.wait(4000)

    //Clica em editar
  cy.get('.end.ng-scope > .icon-edit',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(1000)

  //Clica na Turma
  cy.get('[trails=""] > .tabs > .ng-scope')
  .click()

  //Clica em duplicar
  cy.contains('tr', 'Turma Paga', { timeout: 60000 })
  .should('be.visible')
  .within(() => {
    cy.get('.icon-copy')
      .should('be.visible')
      .click({ force: true });
  });

  //Flega como gratuita
  cy.get('.class-price > :nth-child(1) > .icon-checkbox')
  .click()

 //Salvar Turma
        cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
        .click();

        //Adiciona certificado
         cy.get('[ui-sref="accessLink.content.trails.edit.id.version.certificate"]', { timeout: 15000 })
                    .should('be.visible')
                    .click();

                    //Clica em escolher Certificado
                    cy.get('.p-20 > .box > .btn-swipe-accent')
                    .click()

                cy.wait(1000);

                // ========== PASSO 7: CLICAR EM ESCOLHER CERTIFICADO ==========
                cy.get('[name="TrailCertificateSelect"] > .ui-select-match > .btn-default')
                    .should('be.visible')
                    .click();

                    // Depois digita no input de busca que aparece
                cy.get('[name="TrailCertificateSelect"] input[placeholder="Escolha um certificado"]', { timeout: 15000 })
                    .should('be.visible')
                    .type('Certificado da Trilha');

                cy.wait(2000); //Espera os resultados carregarem

                // Seleciona o certificado no dropdown
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
