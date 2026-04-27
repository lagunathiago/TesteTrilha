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
    // 🔹 Acessa Treinamentos
    // =============================
    cy.get('[title="Trilhas"] > .sideitem').click();
    cy.wait(3000);

    cy.get('[data-nodeid="9"]')
    .click({ force: true });

  })

    it('Criando Trilha do Primeiro Cenário', () => {
        
         cy.get('.title-bar .btn-icon', { timeout: 600000 }) 
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });
        
        //preenche o campo de nome da trilha
        cy.get('input[placeholder="Informe o nome"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('Primeiro Cenário Trilha', { delay: 50 })
            .should('have.value', 'Primeiro Cenário Trilha');

        //Preencher o Código
        cy.get('input[ng-model="currentTrail.externalId"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('012025', { delay: 30 })
            .should('have.value', '012025')

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
               
cy.get('.ui-select-search:visible', { timeout: 60000 })
  .should('be.visible')
  .type('Minha');

cy.contains('.ui-select-choices-row:visible', 'Minha Área - Adm.pdf', { timeout: 60000 })
  .click();

      //Clcia em adicionar
      cy.get('.start > .btn-swipe-accent')
      .click()

        //adcicionar turma
        cy.get('[trails=""] > .tabs > .ng-scope').click();
        cy.get('.gap > .btn-swipe-accent').click();
        
        // NOME DA TURMA (re-get após digitar para evitar re-render do Angular)
        cy.get('input[placeholder="Informe um nome para a turma"]', { timeout: 20000 })
            .filter(':visible')
            .first()
            .should('be.enabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('Turma teste 1', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma teste 1');

              // PREÇO (máscara monetária: 391 => 3,91)
        cy.get('#currentClassPrice', { timeout: 60000 })
            .should('be.visible')
            .and('not.be.disabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('3.91', { delay: 50, force: true })
            .blur();

             cy.get('.column > :nth-child(1) > .icon-checkbox') //Clica em requer aprovação
    .click();

            //Deixar em Branco
cy.get(':nth-child(2) > div.mt-20 > .middle > .checkbox > .icon-checkbox')
.click()
        cy.get('.navigation-controls > .ml-20')
        .scrollIntoView()
        .click()//botao prximo

      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Thiago suporte")

cy.contains('.ui-select-choices-row', 'thiago suporte', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

     // =============================
    // 🔹 Campos personalizados   
    // =============================

            cy.get(':nth-child(6) > .dot',{timeout:60000})
            .should('be.visible')
            .click({force:true})

         //Clica em requer aprovação
            cy.get('.mb-20.ng-scope > .checkbox > .icon-checkbox',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

            //Clica em 'Selecionar um campo personalizado"
            cy.get('.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',{timeout:60000})
            .should('be.visible')
            .click({force:true})

             cy.contains('.ui-select-choices-row span.ng-binding','campo 04.12',{ timeout: 60000 })
.should('be.visible')
.click();

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

    // =============================
    // 🔹 Salvar
    // =============================

    cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
    .click()

    cy.get('.content-box-footer > .flex > .btn-swipe-accent')
    .click()

    cy.wait(6000)
    
      });

      
    it('Criando Trilha do Segundo Cenário', () => {
        
         cy.get('.title-bar .btn-icon', { timeout: 600000 }) 
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });
        
        //preenche o campo de nome da trilha
        cy.get('input[placeholder="Informe o nome"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('Segundo Cenário Trilha', { delay: 50 })
            .should('have.value', 'Segundo Cenário Trilha');

        //Preencher o Código
        cy.get('input[ng-model="currentTrail.externalId"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('012025', { delay: 30 })
            .should('have.value', '012025')

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
               
cy.get('.ui-select-search:visible', { timeout: 60000 })
  .should('be.visible')
  .type('Minha');

cy.contains('.ui-select-choices-row:visible', 'Minha Área - Adm.pdf', { timeout: 60000 })
  .click();

      //Clcia em adicionar
      cy.get('.start > .btn-swipe-accent')
      .click()

        //adcicionar turma
        cy.get('[trails=""] > .tabs > .ng-scope').click();
        cy.get('.gap > .btn-swipe-accent').click();
        
        // NOME DA TURMA (re-get após digitar para evitar re-render do Angular)
        cy.get('input[placeholder="Informe um nome para a turma"]', { timeout: 20000 })
            .filter(':visible')
            .first()
            .should('be.enabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('Turma teste 2', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma teste 2');

              // PREÇO (máscara monetária: 391 => 3,91)
        cy.get('#currentClassPrice', { timeout: 60000 })
            .should('be.visible')
            .and('not.be.disabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('3.91', { delay: 50, force: true })
            .blur();

            //Deixar em Branco
cy.get(':nth-child(2) > div.mt-20 > .middle > .checkbox > .icon-checkbox')
.click()

   cy.get('.column > :nth-child(1) > .icon-checkbox') //Clica em requer aprovação
    .click();

        cy.get('.navigation-controls > .ml-20')
        .scrollIntoView()
        .click()//botao prximo

        
      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Thiago suporte")

cy.contains('.ui-select-choices-row', 'thiago suporte', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

 // =============================
    // 🔹 Campos personalizados   
    // =============================

            cy.get(':nth-child(6) > .dot',{timeout:60000})
            .should('be.visible')
            .click({force:true})
            
            //Clica em requer aprovação
            cy.get('.mb-20.ng-scope > .checkbox > .icon-checkbox',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

            //Clica em 'Selecionar um campo personalizado"
            cy.get('.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',{timeout:60000})
            .should('be.visible')
            .click({force:true})

             cy.contains('.ui-select-choices-row span.ng-binding','Novo campo 04.12',{ timeout: 60000 })
.should('be.visible')
.click();

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

            //Clica em 'Selecionar um campo personalizado"
            cy.get('.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',{timeout:60000})
            .should('be.visible')
            .click({force:true})

             cy.contains('.ui-select-choices-row span.ng-binding','NOVO',{ timeout: 60000 })
.should('be.visible')
.click();

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

    // =============================
    // 🔹 Salvar
    // =============================

    cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
    .click()

    cy.get('.content-box-footer > .flex > .btn-swipe-accent')
    .click()

    cy.wait(6000)
    
      });

       it('Criando Trilha do Terceiro Cenário', () => {
        
         cy.get('.title-bar .btn-icon', { timeout: 600000 }) 
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });
        
        //preenche o campo de nome da trilha
        cy.get('input[placeholder="Informe o nome"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('Terceiro Cenário Trilha', { delay: 50 })
            .should('have.value', 'Terceiro Cenário Trilha');

        //Preencher o Código
        cy.get('input[ng-model="currentTrail.externalId"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('012025', { delay: 30 })
            .should('have.value', '012025')

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
               
cy.get('.ui-select-search:visible', { timeout: 60000 })
  .should('be.visible')
  .type('Minha');

cy.contains('.ui-select-choices-row:visible', 'Minha Área - Adm.pdf', { timeout: 60000 })
  .click();

      //Clcia em adicionar
      cy.get('.start > .btn-swipe-accent')
      .click()

        //adcicionar turma
        cy.get('[trails=""] > .tabs > .ng-scope').click();
        cy.get('.gap > .btn-swipe-accent').click();
        
        // NOME DA TURMA (re-get após digitar para evitar re-render do Angular)
        cy.get('input[placeholder="Informe um nome para a turma"]', { timeout: 20000 })
            .filter(':visible')
            .first()
            .should('be.enabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('Turma teste 3', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma teste 3');

              // PREÇO (máscara monetária: 391 => 3,91)
        cy.get('#currentClassPrice', { timeout: 60000 })
            .should('be.visible')
            .and('not.be.disabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('3.91', { delay: 50, force: true })
            .blur();

            //Deixar em Branco
cy.get(':nth-child(2) > div.mt-20 > .middle > .checkbox > .icon-checkbox')
.click()

   cy.get('.column > :nth-child(1) > .icon-checkbox') //Clica em requer aprovação
    .click();

        cy.get('.navigation-controls > .ml-20')
        .scrollIntoView()
        .click()//botao prximo

      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Thiago suporte")

cy.contains('.ui-select-choices-row', 'thiago suporte', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

 // =============================
    // 🔹 Campos personalizados   
    // =============================

            cy.get(':nth-child(6) > .dot',{timeout:60000})
            .should('be.visible')
            .click({force:true})
            
            //Clica em requer aprovação
            cy.get('.mb-20.ng-scope > .checkbox > .icon-checkbox',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

            //Clica em 'Selecionar um campo personalizado"
            cy.get('.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',{timeout:60000})
            .should('be.visible')
            .click({force:true})

             cy.contains('.ui-select-choices-row span.ng-binding','Novo campo 04.12',{ timeout: 60000 })
.should('be.visible')
.click();

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

            //Clica em 'Selecionar um campo personalizado"
            cy.get('.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',{timeout:60000})
            .should('be.visible')
            .click({force:true})

             cy.contains('.ui-select-choices-row span.ng-binding','teste 09/12/2025 campo',{ timeout: 60000 })
.should('be.visible')
.click();

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

    // =============================
    // 🔹 Salvar
    // =============================

    cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
    .click()

    cy.get('.content-box-footer > .flex > .btn-swipe-accent')
    .click()

    cy.wait(6000)
    
      });
      
       it('Criando Trilha do Quarto Cenário', () => {
        
         cy.get('.title-bar .btn-icon', { timeout: 600000 }) 
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });
        
        //preenche o campo de nome da trilha
        cy.get('input[placeholder="Informe o nome"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('Quarto Cenário Trilha', { delay: 50 })
            .should('have.value', 'Quarto Cenário Trilha');

        //Preencher o Código
        cy.get('input[ng-model="currentTrail.externalId"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('012025', { delay: 30 })
            .should('have.value', '012025')

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
               
cy.get('.ui-select-search:visible', { timeout: 60000 })
  .should('be.visible')
  .type('Minha');

cy.contains('.ui-select-choices-row:visible', 'Minha Área - Adm.pdf', { timeout: 60000 })
  .click();

      //Clcia em adicionar
      cy.get('.start > .btn-swipe-accent')
      .click()

        //adcicionar turma
        cy.get('[trails=""] > .tabs > .ng-scope').click();
        cy.get('.gap > .btn-swipe-accent').click();
        
        // NOME DA TURMA (re-get após digitar para evitar re-render do Angular)
        cy.get('input[placeholder="Informe um nome para a turma"]', { timeout: 20000 })
            .filter(':visible')
            .first()
            .should('be.enabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('Turma teste 4', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma teste 4');

              // PREÇO (máscara monetária: 391 => 3,91)
        cy.get('#currentClassPrice', { timeout: 60000 })
            .should('be.visible')
            .and('not.be.disabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('3.91', { delay: 50, force: true })
            .blur();

            //Deixar em Branco
cy.get(':nth-child(2) > div.mt-20 > .middle > .checkbox > .icon-checkbox')
.click()

   cy.get('.column > :nth-child(1) > .icon-checkbox') //Clica em requer aprovação
    .click();

        cy.get('.navigation-controls > .ml-20')
        .scrollIntoView()
        .click()//botao prximo

      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Thiago suporte")

cy.contains('.ui-select-choices-row', 'thiago suporte', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

 // =============================
    // 🔹 Campos personalizados   
    // =============================

          // =============================
    // 🔹 Campos personalizados   
    // =============================

            cy.get(':nth-child(6) > .dot',{timeout:60000})
            .should('be.visible')
            .click({force:true})
            
            //Clica em requer aprovação
            cy.get('.mb-20.ng-scope > .checkbox > .icon-checkbox',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

            //Clica em 'Selecionar um campo personalizado"
            cy.get('.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',{timeout:60000})
            .should('be.visible')
            .click({force:true})

             cy.contains('.ui-select-choices-row span.ng-binding','teste 09/12/2025 campo',{ timeout: 60000 })
.should('be.visible')
.click();

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

    // =============================
    // 🔹 Salvar
    // =============================

    cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
    .click()

    cy.get('.content-box-footer > .flex > .btn-swipe-accent')
    .click()

    cy.wait(6000)
    
      });


        it('Criando Trilha do Quinto Cenário', () => {
        
         cy.get('.title-bar .btn-icon', { timeout: 600000 }) 
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });
        
        //preenche o campo de nome da trilha
        cy.get('input[placeholder="Informe o nome"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('Quinto Cenário Trilha', { delay: 50 })
            .should('have.value', 'Quinto Cenário Trilha');

        //Preencher o Código
        cy.get('input[ng-model="currentTrail.externalId"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('012025', { delay: 30 })
            .should('have.value', '012025')

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
               
cy.get('.ui-select-search:visible', { timeout: 60000 })
  .should('be.visible')
  .type('Minha');

cy.contains('.ui-select-choices-row:visible', 'Minha Área - Adm.pdf', { timeout: 60000 })
  .click();

      //Clcia em adicionar
      cy.get('.start > .btn-swipe-accent')
      .click()

        //adcicionar turma
        cy.get('[trails=""] > .tabs > .ng-scope').click();
        cy.get('.gap > .btn-swipe-accent').click();
        
        // NOME DA TURMA (re-get após digitar para evitar re-render do Angular)
        cy.get('input[placeholder="Informe um nome para a turma"]', { timeout: 20000 })
            .filter(':visible')
            .first()
            .should('be.enabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('Turma teste 5', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma teste 5');

              // PREÇO (máscara monetária: 391 => 3,91)
        cy.get('#currentClassPrice', { timeout: 60000 })
            .should('be.visible')
            .and('not.be.disabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('3.91', { delay: 50, force: true })
            .blur();

            //Deixar em Branco
cy.get(':nth-child(2) > div.mt-20 > .middle > .checkbox > .icon-checkbox')
.click()

   cy.get('.column > :nth-child(1) > .icon-checkbox') //Clica em requer aprovação
    .click();

        cy.get('.navigation-controls > .ml-20')
        .scrollIntoView()
        .click()//botao prximo

      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Thiago suporte")

cy.contains('.ui-select-choices-row', 'thiago suporte', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

      // =============================
    // 🔹 Campos personalizados   
    // =============================

            cy.get(':nth-child(6) > .dot',{timeout:60000})
            .should('be.visible')
            .click({force:true})

             //Clica em requer aprovação
            cy.get('.mb-20.ng-scope > .checkbox > .icon-checkbox',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            //Clica em Novo
            cy.get('.column > :nth-child(2) > .icon-radio') 
            .click()

            //Escreve no novo campo
       cy.get('input[ng-model="object.model[language.key]"]')
  .filter(':visible')
  .first()
  .invoke('removeAttr', 'disabled')
  .type('LECTOR10')

  //Clica em Tipo
 cy.get("[ng-show=\"useType == 'NEW' || isEditing\"] > :nth-child(2) > .ui-select-container")
  .click()

  //Espera as opções aparecerem 
  cy.wait(2000)

  //Seleciona a opção Texto
 cy.contains('.ui-select-choices-row', 'Texto')
  .should('be.visible')
  .click()

  //Clica em adicionar 
    cy.get(':nth-child(4) > .middle > .btn-swipe-accent')
    .click()

    cy.wait(1000)
    // =============================
    // 🔹 Salvar
    // =============================

    cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
    .click()

    cy.get('.content-box-footer > .flex > .btn-swipe-accent')
    .click()

    cy.wait(6000)

      });

        it('Criando a segunda Trilha do Quinto Cenário', () => {
        
         cy.get('.title-bar .btn-icon', { timeout: 600000 }) 
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });
        
        //preenche o campo de nome da trilha
        cy.get('input[placeholder="Informe o nome"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('Quinto Cenário Trilha - Segunda Trilha', { delay: 50 })
            .should('have.value', 'Quinto Cenário Trilha - Segunda Trilha');

        //Preencher o Código
        cy.get('input[ng-model="currentTrail.externalId"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('012025', { delay: 30 })
            .should('have.value', '012025')

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
               
cy.get('.ui-select-search:visible', { timeout: 60000 })
  .should('be.visible')
  .type('Minha');

cy.contains('.ui-select-choices-row:visible', 'Minha Área - Adm.pdf', { timeout: 60000 })
  .click();

      //Clcia em adicionar
      cy.get('.start > .btn-swipe-accent')
      .click()

        //adcicionar turma
        cy.get('[trails=""] > .tabs > .ng-scope').click();
        cy.get('.gap > .btn-swipe-accent').click();
        
        // NOME DA TURMA (re-get após digitar para evitar re-render do Angular)
        cy.get('input[placeholder="Informe um nome para a turma"]', { timeout: 20000 })
            .filter(':visible')
            .first()
            .should('be.enabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('Turma teste 6', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma teste 6');

              // PREÇO (máscara monetária: 391 => 3,91)
        cy.get('#currentClassPrice', { timeout: 60000 })
            .should('be.visible')
            .and('not.be.disabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('3.91', { delay: 50, force: true })
            .blur();

            //Deixar em Branco
cy.get(':nth-child(2) > div.mt-20 > .middle > .checkbox > .icon-checkbox')
.click()

   cy.get('.column > :nth-child(1) > .icon-checkbox') //Clica em requer aprovação
    .click();

        cy.get('.navigation-controls > .ml-20')
        .scrollIntoView()
        .click()//botao prximo

      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Thiago suporte")

cy.contains('.ui-select-choices-row', 'thiago suporte', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)
      
    // =============================
    // 🔹 Campos personalizados   
    // =============================

            cy.get(':nth-child(6) > .dot',{timeout:60000})
            .should('be.visible')
            .click({force:true})

          //Digitar o nome do campo
 cy.get('.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',{timeout:60000})
 .type('LECTOR10')

 //Clica no campo
             cy.contains('.ui-select-choices-row span.ng-binding','LECTOR10',{ timeout: 60000 })
.should('be.visible')
.click();

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

    // =============================
    // 🔹 Salvar
    // =============================
      
    cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
    .click()

    cy.get('.content-box-footer > .flex > .btn-swipe-accent')
    .click()

    cy.wait(6000)
    
      });

  });

  
  