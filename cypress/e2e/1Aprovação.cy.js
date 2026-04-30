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

   it('Criando Trilha Paga com aprovação', () => {

         cy.get('.title-bar .btn-icon', { timeout: 600000 }) 
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });

            // gera só a data (YYYY-MM-DD)
const agora = new Date();

const data = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;

const nomeTrilha = `Paga com aprovação - Automação ${data}`;

// preenche o campo de nome da trilha
cy.get('input[placeholder="Informe o nome"]')
  .filter(':visible')
  .first()
  .should('be.enabled')
  .focus()
  .clear({ force: true })
  .type(nomeTrilha, { delay: 50 })
  .should('have.value', nomeTrilha);

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
            .type('Turma Teste Automação 1', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma Teste Automação 1');

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
      .type("Usuario Automação")

cy.contains('.ui-select-choices-row', 'Usuario Automação', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
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

    //clica na trilhas
  cy.contains('.card-items', nomeTrilha, { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  //Clica em Editar
  cy.get('button.btn-icon-accent.icon-edit', { timeout: 10000 })
  .should('be.visible')
  .click({ force: true });

  //Turma
       cy.get('[trails=""] > .tabs > .ng-scope')
       .click();

       //Clicca em clonar
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
            .type('3.92', { delay: 50, force: true })
            .blur();

            //Deixar em Branco
cy.get(':nth-child(2) > div.mt-20 > .middle > .checkbox > .icon-checkbox')
.click()

        cy.get('.navigation-controls > .ml-20')
        .scrollIntoView()
        .click()//botao prximo

      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Usuario Automação")

cy.contains('.ui-select-choices-row', 'Usuario Automação', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

       // =============================
    // 🔹 Salvar
    // =============================

    cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
    .click()

    //Verifica se o valor está correto da turma clocana
    cy.contains('3.92').should('be.visible');

    cy.get('.content-box-footer > .flex > .btn-swipe-accent')
    .click()

    cy.wait(5000)

      });

       it('Criando Trilha Paga sem aprovação', () => {

         cy.get('.title-bar .btn-icon', { timeout: 600000 }) 
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });

            // gera só a data (YYYY-MM-DD)
const agora = new Date();

const data = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;

const nomeTrilha = `Paga sem aprovação - Automação ${data}`;

// preenche o campo de nome da trilha
cy.get('input[placeholder="Informe o nome"]')
  .filter(':visible')
  .first()
  .should('be.enabled')
  .focus()
  .clear({ force: true })
  .type(nomeTrilha, { delay: 50 })
  .should('have.value', nomeTrilha);

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
            .type('Turma Teste 2', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma Teste 2');

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

        cy.get('.navigation-controls > .ml-20')
        .scrollIntoView()
        .click()//botao prximo

      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Usuario Automação")

cy.contains('.ui-select-choices-row', 'Usuario Automação', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
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

    //clica na trilhas
  cy.contains('.card-items', nomeTrilha, { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  //Clica em Editar
  cy.get('button.btn-icon-accent.icon-edit', { timeout: 10000 })
  .should('be.visible')
  .click({ force: true });

  //Turma
       cy.get('[trails=""] > .tabs > .ng-scope')
       .click();

       //Clicca em clonar
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
            .type('3.92', { delay: 50, force: true })
            .blur();

            //Deixar em Branco
cy.get(':nth-child(2) > div.mt-20 > .middle > .checkbox > .icon-checkbox')
.click()

        cy.get('.navigation-controls > .ml-20')
        .scrollIntoView()
        .click()//botao prximo

      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Usuario Automação")

cy.contains('.ui-select-choices-row', 'Usuario Automação', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

    // =============================
    // 🔹 Salvar
    // =============================

    cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
    .click()

    //Verifica se o valor está correto da turma clocana
    cy.contains('3.92').should('be.visible');

    cy.get('.content-box-footer > .flex > .btn-swipe-accent')
    .click()

    cy.wait(5000)

      });

       it('Criando Trilha Gratuita com aprovação', () => {

         cy.get('.title-bar .btn-icon', { timeout: 600000 }) 
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });

            // gera só a data (YYYY-MM-DD)
const agora = new Date();

const data = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;

const nomeTrilha = `Gratuita com aprovação - Automação ${data}`;

// preenche o campo de nome da trilha
cy.get('input[placeholder="Informe o nome"]')
  .filter(':visible')
  .first()
  .should('be.enabled')
  .focus()
  .clear({ force: true })
  .type(nomeTrilha, { delay: 50 })
  .should('have.value', nomeTrilha);

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
            .type('Turma Teste 3', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma Teste 3');

              // gratuidade
        cy.get('.class-price > :nth-child(1) > .icon-checkbox').click();

            cy.get('.column > :nth-child(1) > .icon-checkbox') //Clica em requer aprovação
    .click();

        cy.get('.navigation-controls > .ml-20')
        .scrollIntoView()
        .click()//botao prximo

      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Usuario Automação")

cy.contains('.ui-select-choices-row', 'Usuario Automação', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
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

    //clica na trilhas
  cy.contains('.card-items', nomeTrilha, { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  //Clica em Editar
  cy.get('button.btn-icon-accent.icon-edit', { timeout: 10000 })
  .should('be.visible')
  .click({ force: true });

  //Turma
       cy.get('[trails=""] > .tabs > .ng-scope')
       .click();

       //Clicca em clonar
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
            .type('3.91', { delay: 50, force: true })
            .blur();

            //Deixar em Branco
cy.get(':nth-child(2) > div.mt-20 > .middle > .checkbox > .icon-checkbox')
.click()

        cy.get('.navigation-controls > .ml-20')
        .scrollIntoView()
        .click()//botao prximo

      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Usuario Automação")

cy.contains('.ui-select-choices-row', 'Usuario Automação', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

    // =============================
    // 🔹 Salvar
    // =============================

    cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
    .click()

    //Verifica se o valor está correto da turma clocana
    cy.contains('3.91').should('be.visible');

    cy.get('.content-box-footer > .flex > .btn-swipe-accent')
    .click()

    cy.wait(5000)

      });

   it('Criando Trilha Gratuita sem aprovação', () => {

         cy.get('.title-bar .btn-icon', { timeout: 600000 }) 
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });

     // gera só a data (YYYY-MM-DD)
const agora = new Date();

const data = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;

const nomeTrilha = `Gratuita sem aprovação - Automação ${data}`;

// preenche o campo de nome da trilha
cy.get('input[placeholder="Informe o nome"]')
  .filter(':visible')
  .first()
  .should('be.enabled')
  .focus()
  .clear({ force: true })
  .type(nomeTrilha, { delay: 50 })
  .should('have.value', nomeTrilha);

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
            .type('Turma Teste 4', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma Teste 4');

              // gratuidade
        cy.get('.class-price > :nth-child(1) > .icon-checkbox').click();

        cy.get('.navigation-controls > .ml-20')
        .scrollIntoView()
        .click()//botao prximo

      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Usuario Automação")

cy.contains('.ui-select-choices-row', 'Usuario Automação', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
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

    //clica na trilhas
  cy.contains('.card-items', nomeTrilha, { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  //Clica em Editar
  cy.get('button.btn-icon-accent.icon-edit', { timeout: 10000 })
  .should('be.visible')
  .click({ force: true });

  //Turma
       cy.get('[trails=""] > .tabs > .ng-scope')
       .click();

       //Clica em clonar
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
            .type('3.91', { delay: 50, force: true })
            .blur();

            //Deixar em Branco
cy.get(':nth-child(2) > div.mt-20 > .middle > .checkbox > .icon-checkbox')
.click()

        cy.get('.navigation-controls > .ml-20')
        .scrollIntoView()
        .click()//botao prximo

      cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Usuario Automação")

cy.contains('.ui-select-choices-row', 'Usuario Automação', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

    // =============================
    // 🔹 Salvar
    // =============================

    cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent')
    .click()

    //Verifica se o valor está correto da turma clocana
    cy.contains('3.91').should('be.visible');

    cy.get('.content-box-footer > .flex > .btn-swipe-accent')
    .click()

    cy.wait(5000)

      });
      
});