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
      .type("thiagosuporte@uorak.com"); 

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

  it('Envia os campos da Quarta', () => {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

      //Clica na trilha
      cy.contains('.card-container', 'Quarto Cenário Trilha', { timeout: 60000 })
      .scrollIntoView()
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

  //Clica no botão Comprar
  cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent', { timeout: 10000 })
    .should('be.visible')
    .click()

   //Clica em Não Preencher
        cy.get('.pv-5 > .checkbox > .icon-checkbox', {timeout:20000})
        .click()

        cy.wait(1000)
  
//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(4000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();
  });

     it('Meu Cadastro', () => {
      cy.get("[ng-class*='accessLink.content.showcase.id.modal.home']", { timeout: 10000 })
        .scrollIntoView()
        .find('.ng-binding')
        .click({ force: true });

      cy.get("[ng-class*='home.register']", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('[ui-sref="accessLink.content.home.register.more-info"]', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

        //Clique em Salvar
        cy.get('.open-content > .content-box-footer > .btn-swipe-accent')
        .scrollIntoView()
        .click()

        cy.wait(5000)

   });

    it('Volta pro perfil Administrador',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("qualidade2@lectortec.com.br");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("2006lrnrgr");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');

    });

       it("Aceita o campo", () => {

     //Clioca no icon de notivicações
    cy.get('button[title="Notificações"]', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Clica em visualizar nos documento
  cy.get(':nth-child(1) > .approval-box > .column > .approval-buttons > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .click();

  cy.wait(3000)

  //Aceita o primeiro documento
cy.log('ACEITE O DOCUMENTO E SALVE')
cy.pause()

  cy.wait(5000)

    });

     it('Vai até a Categoria', () => {
    
    // =============================
    // 🔹 Acessa Treinamentos
    // =============================
    cy.get('[title="Trilhas"] > .sideitem')
    .should('be.visible')
    .click({ force: true });

      //Clica na Categoria
      cy.contains("li.list-group-item", "Teste Automação",{timeout: 20000})
      .should('be.visible')
      .click({force: true})

      cy.wait(2000)

  })

   it("Aceita a solicitação do usuario", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Quarto Cenário Trilha', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

       //Clica em gerenciar
      cy.get('.manage-subs > .btn-swipe-accent',{ timeout: 20000 })
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

  cy.wait(4000)

   //Clica em gerenciar
      cy.get('.manage-subs > .btn-swipe-accent',{ timeout: 20000 })
      .should('be.visible')
      .click({force:true})


    //Aguardando pagamento 
      cy.contains('a', 'Aguardando pagamento', { timeout: 60000 })
  .should('be.visible')
  .click()

  // Verefica se o usaurio está na lista de aguardando pagamento
  cy.contains('td', 'thiago suporte', { timeout: 60000 })
  .should('be.visible');

   //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

   });

   it('Entra em outro perfil Aluno',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
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

     it("Verefica se o botãoe fetuar pagamento está visivel", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

          //Clica na trilha
      cy.contains('.card-container', 'Quarto Cenário Trilha', { timeout: 60000 })
      .scrollIntoView()
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

  //Verefica se o botão de efetuar pagamento aparece
  cy.contains('Efetuar pagamento', { timeout: 60000 })
  .should('be.visible');

    //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

     });

      it('Verefica as informações do Campo Aprovado', () => {

      cy.get("[ng-class*='accessLink.content.showcase.id.modal.home']", { timeout: 10000 })
        .scrollIntoView()
        .find('.ng-binding')
        .click({ force: true });

      cy.get("[ng-class*='home.register']", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('[ui-sref="accessLink.content.home.register.more-info"]', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

        cy.wait(2000)

        //Clica em outra informações
        cy.get('[ui-sref="accessLink.content.home.register.more-info"]')
        .click()

       //Verefique se está escrito o campo aprovado
    cy.get('input[placeholder="teste 09/12/2025 campo"]', { timeout: 60000 })
  .should('have.value', '');

  //Clica em Voltar
  cy.get('.showcase-head-2 > .btn')
  .click()

     });

        it("Envia os campos do Quinto Cenário", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

              //Clica na trilha
      cy.contains('.card-container', 'Quinto Cenário Trilha', { timeout: 60000 })
      .scrollIntoView()
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

     //Clica no botão Comprar
  cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent', { timeout: 10000 })
    .should('be.visible')
    .click()

        //Escreve no campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('QUINTO CENÁRIO');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(6000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

     it("Envia os campos da outras trilha do Quinto Cenário", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

              //Clica na trilha
      cy.contains('.card-container', 'Quinto Cenário Trilha - Segunda Trilha', { timeout: 60000 })
      .scrollIntoView()
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

     //Clica no botão Comprar
  cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent', { timeout: 10000 })
    .should('be.visible')
    .click()

        //Escreve no campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('QUINTO CENÁRIO 2');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(6000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

    it('Meu Cadastro', () => {
      cy.get("[ng-class*='accessLink.content.showcase.id.modal.home']", { timeout: 10000 })
        .scrollIntoView()
        .find('.ng-binding')
        .click({ force: true });

      cy.get("[ng-class*='home.register']", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('[ui-sref="accessLink.content.home.register.more-info"]', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

        //Clique em Salvar
        cy.get('.open-content > .content-box-footer > .btn-swipe-accent')
        .scrollIntoView()
        .click()

        cy.wait(5000)

   });

   it('Volta pro perfil Administrador',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("qualidade2@lectortec.com.br");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("2006lrnrgr");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');

    });

     it("RECUSE O CAMPO", () => {

     //Clioca no icon de notivicações
    cy.get('button[title="Notificações"]', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Clica em visualizar nos documento
  cy.get(':nth-child(1) > .approval-box > .column > .approval-buttons > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .click();

  cy.wait(3000)

  //Recusa o documento
cy.get(':nth-child(8) > .btn', { timeout: 20000 })
  .click();

  cy.wait(2000)
 
  // Salva a ação feita
cy.get('.modal:visible', { timeout: 60000 })
  .contains('button', 'Salvar')
  .should('be.visible')
  .click({ force: true });

  cy.wait(6000)

    });

    it('Entra em outro perfil Aluno',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
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

      it("Envia os campos do Quinto Cenário", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

              //Clica na trilha
      cy.contains('.card-container', 'Quinto Cenário Trilha', { timeout: 60000 })
      .scrollIntoView()
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

      //Clica em Reenviar Campos
        cy.get('[ladda="sendingClassCustomFields"]', {timeout:20000} )
        .should('be.visible')
        .click()

        //Escreve no campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('QUINTO CENÁRIO REENVIADO');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(6000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

   it('Meu Cadastro', () => {
      cy.get("[ng-class*='accessLink.content.showcase.id.modal.home']", { timeout: 10000 })
        .scrollIntoView()
        .find('.ng-binding')
        .click({ force: true });

      cy.get("[ng-class*='home.register']", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('[ui-sref="accessLink.content.home.register.more-info"]', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

        //Clique em Salvar
        cy.get('.open-content > .content-box-footer > .btn-swipe-accent')
        .scrollIntoView()
        .click()

        cy.wait(5000)

   });

   it('Volta pro perfil Administrador',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("qualidade2@lectortec.com.br");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("2006lrnrgr");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');

    });
   
    it("ACEITE OS CAMPOS", () => {

     //Clioca no icon de notivicações
    cy.get('button[title="Notificações"]', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Clica em visualizar nos documento
  cy.get(':nth-child(1) > .approval-box > .column > .approval-buttons > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .click();

  cy.wait(3000)

  //Aceite os dois documentos
cy.log('ACEITE OS DOIS DOCUMENTOS E SALVE')
cy.pause()

  cy.wait(5000)

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

      //Clica na trilha
  cy.contains('.card-title', 'Quinto Cenário Trilha', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

       //Clica em gerenciar
      cy.get('.manage-subs > .btn-swipe-accent',{ timeout: 20000 })
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

  cy.wait(4000)

   //Clica em gerenciar
      cy.get('.manage-subs > .btn-swipe-accent',{ timeout: 20000 })
      .should('be.visible')
      .click({force:true})

    //Aguardando pagamento 
      cy.contains('a', 'Aguardando pagamento', { timeout: 60000 })
  .should('be.visible')
  .click()

  // Verefica se o usaurio está na lista de aguardando pagamento
  cy.contains('td', 'thiago suporte', { timeout: 60000 })
  .should('be.visible');

   //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

    //Clica na cetgoria
    cy.get('.breadcrumbs-path > :nth-child(7)', {timeout:20000})
    .click({force:true})

   });

    it("Aceita a solicitação do usuario da segunda trilha", () => {

      //Clica na trilha
  cy.contains('.card-title', 'Quinto Cenário Trilha - Segunda Trilha', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

       //Clica em gerenciar
      cy.get('.manage-subs > .btn-swipe-accent',{ timeout: 20000 })
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

  cy.wait(4000)

   //Clica em gerenciar
      cy.get('.manage-subs > .btn-swipe-accent',{ timeout: 20000 })
      .should('be.visible')
      .click({force:true})

    //Aguardando pagamento 
      cy.contains('a', 'Aguardando pagamento', { timeout: 60000 })
  .should('be.visible')
  .click()

  // Verefica se o usaurio está na lista de aguardando pagamento
  cy.contains('td', 'thiago suporte', { timeout: 60000 })
  .should('be.visible');

   //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

   });


    it('Entra em outro perfil Aluno',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
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

     it("Verefica se o botãoe fetuar pagamento está visivel", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

          //Clica na trilha
      cy.contains('.card-container', 'Quinto Cenário Trilha', { timeout: 60000 })
      .scrollIntoView()
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

  //Verefica se o botão de efetuar pagamento aparece
  cy.contains('Efetuar pagamento', { timeout: 60000 })
  .should('be.visible');

    //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

     });

      it("Verefica se o botãoe fetuar pagamento está visivel da outra trilha", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

          //Clica na trilha
      cy.contains('.card-container', 'Quinto Cenário Trilha - Segunda Trilha', { timeout: 60000 })
      .scrollIntoView()
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

  //Verefica se o botão de efetuar pagamento aparece
  cy.contains('Efetuar pagamento', { timeout: 60000 })
  .should('be.visible');

    //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

     });

     it('Verefica as informações do Campo Aprovado', () => {

      cy.get("[ng-class*='accessLink.content.showcase.id.modal.home']", { timeout: 10000 })
        .scrollIntoView()
        .find('.ng-binding')
        .click({ force: true });

      cy.get("[ng-class*='home.register']", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('[ui-sref="accessLink.content.home.register.more-info"]', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

        cy.wait(2000)

        //Clica em outra informações
        cy.get('[ui-sref="accessLink.content.home.register.more-info"]')
        .click()

        cy.wait(10000)
        cy.log('verefique as informaçoes dos campos')

      /*  //Verefique se está escrito o campo aprovado
    cy.get('input[placeholder="LECTOR10"]', { timeout: 60000 })
  .should('have.value', 'QUINTO CENÁRIO 2');
  */

  //Clica em Voltar
  cy.get('.showcase-head-2 > .btn')
  .click()

     });

});


