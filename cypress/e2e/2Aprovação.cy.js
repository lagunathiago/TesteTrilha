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
      .type("teste40@uorak.com");

   cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

     // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");
  });
  

  it("Vai até Vitrine", () => {
        
        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

        //Clica na vitrine Automação
        cy.contains('div.showcase-menu-name', /^Teste Automação$/)
  .should('be.visible')
  .scrollIntoView()
  .click();
      
  });

        it("Solicitação da Trilha paga com aprovação", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

  cy.wait(2000);

  const agora = new Date();

  const data = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;

  const nomeTrilha = `Paga com aprovação - Automação ${data}`;

  cy.contains('.card-container', nomeTrilha, { timeout: 60000 })
    .scrollIntoView()
    .should('be.visible')
    .find('.showcase-card-container')
    .click({ force: true });

    cy.wait(4000)

      //Clica no botão Comprar
  cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent', { timeout: 10000 })
  .first()
    .should('be.visible')
    .click()

     // 🔥 espera aparecer o status correto
  cy.contains('Aguardando aprovação', { timeout: 60000 })
    .should('be.visible');

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

      it("Solicitação da Trilha gratuita com aprovação", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

  cy.wait(2000);

  const agora = new Date();

  const data = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;

  const nomeTrilha = `Gratuita com aprovação - Automação ${data}`;

  cy.contains('.card-container', nomeTrilha, { timeout: 60000 })
    .scrollIntoView()
    .should('be.visible')
    .find('.showcase-card-container')
    .click({ force: true });

    cy.wait(4000)

     //Fazer incrição
  cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent', { timeout: 60000 })
  .first()
  .should('be.visible')
  .click();

   // 🔥 Espera aparecer o status 'Aguardando aprovação'
  cy.contains('Aguardando aprovação', { timeout: 60000 })
    .should('be.visible');

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

      it("Faz incrição ns Trilha gratuita com aprovação", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

  cy.wait(2000);

  const agora = new Date();

  const data = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;

  const nomeTrilha = `Gratuita sem aprovação - Automação ${data}`;

  cy.contains('.card-container', nomeTrilha, { timeout: 60000 })
    .scrollIntoView()
    .should('be.visible')
    .find('.showcase-card-container')
    .click({ force: true });

    cy.wait(4000)

     //Fazer incrição
  cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent', { timeout: 60000 })
  .first()
  .should('be.visible')
  .click();

   cy.wait(1000)

   // Espera aparecer 'Acessar'
  cy.contains('Acessar', { timeout: 60000 })
    .should('be.visible');

    // Espera aparecer 'Acessar'
  cy.contains('Finalizar trilha', { timeout: 60000 })
    .should('be.visible');

     // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()
  
   });

 it('Perfil Administrador',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("samos@mailto.plus");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("123");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');

    });

             it('Vai até a Categoria', () => {
    
    // =============================
    // 🔹 Acessa Treinamentos
    // =============================
    cy.get('[title="Trilhas"] > .sideitem')
    .should('be.visible')
    .click({force: true})

      //Clica na Categoria
      cy.contains("li.list-group-item", "Teste Automação",{timeout: 20000})
      .should('be.visible')
      .click({force: true})

      cy.wait(2000)

  })

    it("Aceita a solicitação do usuario", () => {

          const agora = new Date();

  const data = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;

  const nomeTrilha = `Paga com aprovação - Automação ${data}`;

  cy.contains('.card-title', nomeTrilha, {timeout: 60000})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

    cy.wait(4000)

       //Clica em gerenciar
      cy.get('.manage-subs > .btn-swipe-accent',{ timeout: 20000 })
      .first()
      .should('be.visible')
      .click({force:true})

     //Solicitação de matricula
      cy.contains('a', 'Solicitações de matrícula', { timeout: 60000 })
  .should('be.visible')
  .click()

//clica no usuario
  cy.get('#pending-subscriptions-table > tbody > .odd > .select-checkbox',{ timeout: 60000 })
  .should('be.visible')
  .click()

   //Clica em Aprovar
  cy.contains('button', 'Aprovar', { timeout: 60000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click()

  //Aprova
  cy.get('button[ng-click="batchProcessSubscriptionsRequests(true)"]', { timeout: 60000})
  .should('be.visible')
  .click()

  cy.wait(5000)

   //Clica em gerenciar
      cy.get('.manage-subs > .btn-swipe-accent',{ timeout: 20000 })
      .first()
      .should('be.visible')
      .click({force:true})

    //Aguardando pagamento 
      cy.contains('a', 'Aguardando pagamento', { timeout: 60000 })
  .should('be.visible')
  .click()

  // Verefica se o usaurio está na lista de aguardando pagamento
  cy.contains('td', 'Usuario Automação', { timeout: 60000 })
  .should('be.visible');

   //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

   });

     it("Aceita a solicitação do usuario", () => {
        
        //Clica no bredcrumbs
        cy.get('.breadcrumbs-path > .lector-txt-accent')
        .click()

        cy.wait(2000)

          const agora = new Date();

  const data = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;

  const nomeTrilha = `Gratuita com aprovação - Automação ${data}`;

  cy.contains('.card-title', nomeTrilha, {timeout: 60000})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

    cy.wait(4000)

       //Clica em gerenciar
      cy.get('.manage-subs > .btn-swipe-accent',{ timeout: 20000 })
      .first()
      .should('be.visible')
      .click({force:true})

     //Solicitação de matricula
      cy.contains('a', 'Solicitações de matrícula', { timeout: 60000 })
  .should('be.visible')
  .click()

//clica no usuario
  cy.get('#pending-subscriptions-table > tbody > .odd > .select-checkbox',{ timeout: 60000 })
  .should('be.visible')
  .click()

   //Clica em Aprovar
  cy.contains('button', 'Aprovar', { timeout: 60000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click()

  //Aprova
  cy.get('button[ng-click="batchProcessSubscriptionsRequests(true)"]', { timeout: 60000})
  .should('be.visible')
  .click()

  cy.wait(5000)

   //Clica em gerenciar
      cy.get('.manage-subs > .btn-swipe-accent',{ timeout: 20000 })
      .first()
      .should('be.visible')
      .click({force:true})

    //Clica em Matriculados/Concluídos
      cy.contains('a', 'Matriculados / Concluídos', { timeout: 60000 })
  .should('be.visible')
  .click()

  // Verefica se o usaurio está na lista de aguardando pagamento
  cy.contains('td', 'Usuario Automação')
  .should('be.visible');

   //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

   });

    it('Perfil Aluno',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("teste40@uorak.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("123");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');

    });

     it("Vai até Vitrine", () => {
        
        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

        //Clica na vitrine Automação
        cy.contains('div.showcase-menu-name', /^Teste Automação$/)
  .should('be.visible')
  .scrollIntoView()
  .click();
      
  });
      
  it("Verifica o botão Efetuar pagamento da Trilha paga com aprovação", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

  cy.wait(2000);

  const agora = new Date();

  const data = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;

  const nomeTrilha = `Paga com aprovação - Automação ${data}`;

  cy.contains('.card-container', nomeTrilha, { timeout: 60000 })
    .scrollIntoView()
    .should('be.visible')
    .find('.showcase-card-container')
    .click({ force: true });

    cy.wait(4000)

      //Verefica se o botão de efetuar pagamento aparece
  cy.contains('Efetuar pagamento', { timeout: 60000 })
  .should('be.visible');

  //Verefica se o botão de efetuar pagamento aparece
  cy.contains('R$3.91', { timeout: 60000 })
  .should('be.visible');
   
  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

    it("Verifica as informações da Trilha gratuita com aprovação", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

  cy.wait(2000);

  const agora = new Date();

  const data = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;

  const nomeTrilha = `Gratuita com aprovação - Automação ${data}`;

  cy.contains('.card-container', nomeTrilha, { timeout: 60000 })
    .scrollIntoView()
    .should('be.visible')
    .find('.showcase-card-container')
    .click({ force: true });

    cy.wait(4000)

       // Espera aparecer 'Acessar'
  cy.contains('Acessar', { timeout: 60000 })
    .should('be.visible');

    // Espera aparecer 'Acessar'
  cy.contains('Finalizar trilha', { timeout: 60000 })
    .should('be.visible');
   
  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });


});

