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
  
   it('Trilha Importada', () => {

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
            .type('Trilha Importada Automação', { delay: 50 })
            .should('have.value', 'Trilha Importada Automação')

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
                .type('Trilha Completa Automação')

            cy.wait(3000);

            // Selecionar a trilha no dropdown
            cy.contains('.ui-select-choices-row', 'Trilha Completa Automação', { timeout: 30000 })
                .should('be.visible')
                .click();

            cy.wait(1000);

            // Confirmar importação
            cy.get('ui-view.ng-scope > .modal-overlay > .modal > .end > .btn-swipe-accent', { timeout: 15000 })
                .should('be.visible')
                .click();

            cy.wait(5000);

    // ================================================
    // 🔹 Adicona conteudo do tipo Treinamento
    // ================================================

        //Clica em etapas
        cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]')
        .click();

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
  .type('agendamentos automação (não mexer)');

            cy.wait(1000);

            // Selecionar o treinamento no dropdown
            cy.contains('.ui-select-choices-row', 'agendamentos automação (não mexer)', { timeout: 20000 })
                .should('be.visible')
                .click();

            cy.wait(1000);

            //Clcia em adicionar
     cy.get(':nth-child(7) > :nth-child(8) > .start > .btn-swipe-accent')
     .click()

            cy.wait(5000);

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

             cy.get('.navigation-controls > .ml-20').click()//botao proximo
             
             cy.log('AGENDE OS CONTEÚDOS')
             cy.pause()
             cy.log('AGENDE OS CONTEÚDOS')

             cy.get('.navigation-controls > .ml-20').click()//botao proximo

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

       //Salvar Trilha
        cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent').click();

        //Salvar Trilha
        cy.get('.content-box-footer > .flex > .btn-swipe-accent').click();
               
   });

    it('Duplica turma paga, cria turma paga e adiciona certificado', () => {
      
//===========================Coloca a turma como gratuita

         //Clica no Treinamento
  cy.contains('.card-title', 'Trilha Importada Automação', {timeout: 60000})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

  cy.wait(4000)

    //Clica em editar
  cy.get('.end.ng-scope > .icon-edit',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(3000)

  //Clica na turma
  cy.get('[trails=""] > .tabs > .ng-scope')
  .click()

  cy.wait(4000)

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

//============================Duplica a turma gratuita para paga

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

            cy.get('.navigation-controls > .ml-20').click()//botao proximo
             
             cy.log('AGENDE OS CONTEÚDOS')
             cy.pause()
             cy.log('AGENDE OS CONTEÚDOS')

             cy.get('.navigation-controls > .ml-20').click()//botao proximo

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

            //Salvar Truma
        cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
        .click();

        //Salvar Trilha
        cy.get('.content-box-footer > .flex > .btn-swipe-accent')
        .click();

        cy.wait(5000)

        //=======================================CRIA TURMA PAGA================================================//
        
        //Clica no Treinamento
  cy.contains('.card-title', 'Trilha Importada Automação', {timeout: 60000})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

  cy.wait(4000)

    //Clica em editar
  cy.get('.end.ng-scope > .icon-edit',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(5000)

  //Clica na Turma
  cy.get('[trails=""] > .tabs > .ng-scope')
  .click()

  cy.wait(4000)

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

     cy.get('.navigation-controls > .ml-20').click()//botao proximo
            
             cy.log('AGENDE OS CONTEÚDOS')
             cy.pause()
             cy.log('AGENDE OS CONTEÚDOS')

             cy.get('.navigation-controls > .ml-20').click()//botao proximo

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

        //=========================COLOC A TURMA COMO PAGA======================//

        //Clica na trilha
  cy.contains('.card-title', 'Trilha Importada Automação', {timeout: 60000})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

  cy.wait(4000)

    //Clica em editar
  cy.get('.end.ng-scope > .icon-edit',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(4000)

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

  cy.wait(1000)

  //fleg de Gratuito
  cy.get('.class-price > :nth-child(1) > .icon-checkbox')
  .click()

  cy.wait(1000)

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

            cy.get('.navigation-controls > .ml-20').click()//botao proximo
             
             cy.log('AGENDE OS CONTEÚDOS')
             cy.pause()
             cy.log('AGENDE OS CONTEÚDOS')

             cy.get('.navigation-controls > .ml-20').click()//botao proximo

             cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Aluno")

cy.contains('.ui-select-choices-row', 'Aluno', {timeout:60000})
  .first()
  .click()

  cy.wait(4000)

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(4000)

            //Salvar Truma
        cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
        .click();

        //Salvar Trilha
        cy.get('.content-box-footer > .flex > .btn-swipe-accent')
        .click();

        cy.wait(7000);

    
//===========================Duplica a turma paga============================//

//Clica na trilha
  cy.contains('.card-title', 'Trilha Importada Automação', {timeout: 60000})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

  cy.wait(4000)

    //Clica em editar
  cy.get('.end.ng-scope > .icon-edit',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(4000)

  //Clica na Turma
  cy.get('[trails=""] > .tabs > .ng-scope')
  .click()

  cy.wait(4000)

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

  cy.get('.navigation-controls > .ml-20').click()//botao proximo
             
             cy.log('AGENDE OS CONTEÚDOS')
             cy.pause()
             cy.log('AGENDE OS CONTEÚDOS')

             cy.get('.navigation-controls > .ml-20').click()//botao proximo

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

            //Salvar Truma
        cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
        .click();

        //Salvar Trilha
        cy.get('.content-box-footer > .flex > .btn-swipe-accent')
        .click();

        cy.wait(5000)

//=======================================ADICIONA CERTIFICADO===============//
        
//Clica na trilha
  cy.contains('.card-title', 'Trilha Importada Automação', {timeout: 60000})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

   cy.wait(5000)

  //Clica em editar
  cy.get('.end.ng-scope > .icon-edit',{timeout:60000})
  .should('be.visible')
  .click()

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

        cy.wait(10000)

        cy.log('✅ Automação da Criação da trilha completa concluída com sucesso');



  });

});