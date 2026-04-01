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

    cy.visit("https://www.hml.lector.live/esmp/subscribe/login");
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

  context("Vai até a categoria", () => {

     it("Vai até á Categoria", () => {

        //Clica no menu Trilhas
        cy.get('[title="Trilhas"] > .sideitem').click(); 

        //Clica na Categoria
      cy.contains("li.list-group-item", "Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

            });

      it('Criando uma trilha gratuita sem aprovação', () => {
        
        //Clica no botão de adicionar nova trilha
        cy.get('.title-bar > .btn-icon').click(); 
        
        //preenche o campo de nome da trilha
        cy.get('input[placeholder="Informe o nome"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('Gratuita sem aprovação - Trilha Automação', { delay: 50 })
            .should('have.value', 'Gratuita sem aprovação - Trilha Automação')

        //seleciona o código
        cy.get('input[ng-model="currentTrail.externalId"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('012025', { delay: 30 })
            .should('have.value', '012025')

        //seleciona etapas
        cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]').click();
        
        //clica no botão de adicionar nova etapa
        cy.get('button[ng-click="createStage()"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .scrollIntoView()
            .click();

        //adicionar novo conteúdo
        cy.get('[colspan="6"] > .btn-swipe-accent').click();

        //seleciona o treinamento
        cy.get('[model="currentContent.course"] > .multiselect > .border > .ui-select-match > .btn-default').type('teste');
        cy.get('#ui-select-choices-row-39-0').click();
        cy.get('.start > .btn-swipe-accent > ng-transclude > .ng-binding').click();

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
            .type('Turma teste', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma teste');

        //Gratuidade
        cy.get('.class-price > :nth-child(1) > .icon-checkbox').click();

        cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Thiago Laguna")

cy.contains('.ui-select-choices-row', 'Thiago Laguna', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

          cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
        .click(); //salvar turma
        
        cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
        //Salvar Turma

        cy.wait(4000)
    
          });
          it('Criando uma trilha gratuita com aprovação', () => {
        
        //Clica no botão de adicionar nova trilha
        cy.get('.title-bar > .btn-icon').click(); 
        
        //preenche o campo de nome da trilha
        cy.get('input[placeholder="Informe o nome"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('Gratuita com aprovação - Trilha Automação', { delay: 50 })
            .should('have.value', 'Gratuita com aprovação - Trilha Automação')

        //seleciona o código
        cy.get('input[ng-model="currentTrail.externalId"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('012025', { delay: 30 })
            .should('have.value', '012025')

        //seleciona etapas
        cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]').click();
        
        //clica no botão de adicionar nova etapa
        cy.get('button[ng-click="createStage()"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .scrollIntoView()
            .click();

        //adicionar novo conteúdo
        cy.get('[colspan="6"] > .btn-swipe-accent').click();

        //seleciona o treinamento
        cy.get('[model="currentContent.course"] > .multiselect > .border > .ui-select-match > .btn-default').type('teste');
        cy.get('#ui-select-choices-row-39-0').click();
        cy.get('.start > .btn-swipe-accent > ng-transclude > .ng-binding').click();

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
            .type('Turma teste', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma teste');

             cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // Aiva aprovação

        //Gratuidade
        cy.get('.class-price > :nth-child(1) > .icon-checkbox').click();

        cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Thiago Laguna")

cy.contains('.ui-select-choices-row', 'Thiago Laguna', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

          cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
        .click(); //salvar turma
        
        cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
        //Salvar Turma

        cy.wait(4000)

      });
          it('Criando uma trilha gratuita com aprovação de campos', () => {
        
        //Clica no botão de adicionar nova trilha
        cy.get('.title-bar > .btn-icon').click(); 
        
        //preenche o campo de nome da trilha
        cy.get('input[placeholder="Informe o nome"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('Gratuita com aprovação de campos Personalizado - Trilha Automação', { delay: 50 })
            .should('have.value', 'Gratuita com aprovação de campos Personalizado - Trilha Automação')

        //seleciona o código
        cy.get('input[ng-model="currentTrail.externalId"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('012025', { delay: 30 })
            .should('have.value', '012025')

        //seleciona etapas
        cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]').click();
        
        //clica no botão de adicionar nova etapa
        cy.get('button[ng-click="createStage()"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .scrollIntoView()
            .click();

        //adicionar novo conteúdo
        cy.get('[colspan="6"] > .btn-swipe-accent').click();

        //seleciona o treinamento
        cy.get('[model="currentContent.course"] > .multiselect > .border > .ui-select-match > .btn-default').type('teste');
        cy.get('#ui-select-choices-row-39-0').click();
        cy.get('.start > .btn-swipe-accent > ng-transclude > .ng-binding').click();

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
            .type('Turma teste', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma teste');

        //Gratuidade
        cy.get('.class-price > :nth-child(1) > .icon-checkbox').click();

        cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Thiago Laguna")

cy.contains('.ui-select-choices-row', 'Thiago Laguna', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      //Adicionar Campos Personalizado
          cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')

           //Clica nos campos personalizado
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

           cy.contains('.ui-select-choices-row span.ng-binding','NOVO',{ timeout: 60000 })
.should('be.visible')
.click();
            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

        cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
        .click(); //salvar turma
        
        cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
        //Salvar Turma
        cy.wait(4000)

      });

        it('Criando uma trilha gratuita com aprovação de campos', () => {
        
        //Clica no botão de adicionar nova trilha
        cy.get('.title-bar > .btn-icon').click(); 
        
        //preenche o campo de nome da trilha
        cy.get('input[placeholder="Informe o nome"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('Gratuita com aprovação de gestor e campos Personalizado - Trilha Automação', { delay: 50 })
            .should('have.value', 'Gratuita com aprovação de gestor e campos Personalizado - Trilha Automação')

        //seleciona o código
        cy.get('input[ng-model="currentTrail.externalId"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('012025', { delay: 30 })
            .should('have.value', '012025')

        //seleciona etapas
        cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]').click();
        
        //clica no botão de adicionar nova etapa
        cy.get('button[ng-click="createStage()"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .scrollIntoView()
            .click();

        //adicionar novo conteúdo
        cy.get('[colspan="6"] > .btn-swipe-accent').click();

        //seleciona o treinamento
        cy.get('[model="currentContent.course"] > .multiselect > .border > .ui-select-match > .btn-default').type('teste');
        cy.get('#ui-select-choices-row-39-0').click();
        cy.get('.start > .btn-swipe-accent > ng-transclude > .ng-binding').click();

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
            .type('Turma teste', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma teste');

        //Gratuidade
        cy.get('.class-price > :nth-child(1) > .icon-checkbox').click();

        cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // Aiva aprovação

        cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Thiago Laguna")

cy.contains('.ui-select-choices-row', 'Thiago Laguna', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      //Adicionar Campos Personalizado
          cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')

           //Clica nos campos personalizado
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

        cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
        .click(); //salvar turma
        
        cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
        //Salvar Turma
        cy.wait(4000)

      });
   });
});
