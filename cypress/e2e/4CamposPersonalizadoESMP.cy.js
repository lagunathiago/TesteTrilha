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

   it("Envia os campos do Treinamento", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

           //Clica na trilha
      cy.contains('.card-container', 'Terceiro Cenário Trilha', { timeout: 60000 })
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
    .type('APROVE ESSE CAMPO');

});

   //Escreve no campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_1')
    .clear()
    .type('RECUSE ESSE CAMPO');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(7000)

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
    
     it("ACEITA UM E RECUSE O OUTRO", () => {

     //Clioca no icon de notivicações
    cy.get('button[title="Notificações"]', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Clica em visualizar nos documento
  cy.get(':nth-child(1) > .approval-box > .column > .approval-buttons > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .click();

  cy.wait(3000)

  //ACEITE UM E RECUSE O OUTRO
cy.log('ACEITE UM DOCUMENTO E RECUSE O OUTRO SALVE')
cy.pause()

  cy.wait(7000)

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

   it("Cancela o processo de seleção", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Terceiro Cenário Trilha', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
      //Clica em gerenciar
      cy.get('.manage-subs > .btn-swipe-accent',{ timeout: 20000 })
      .should('be.visible')
      .click( {force:true})

     //Processo de seleção
      cy.contains('a', 'Processo de seleção', { timeout: 60000 })
  .should('be.visible')
  .click()


  cy.wait(3000)

  //Clica em cancelar processo de seleção
 cy.get('button.cancel-process')
  .first()
  .scrollIntoView()
  .click({ force: true });

  cy.wait(5000)

   });

    it('Pesquisa o usuario em não matriculado', () => {

    //Não matruclado
      cy.contains('a', 'Não matriculado', { timeout: 60000 })
  .should('be.visible')
  .click()

        cy.wait(5000)

      //Digita Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('thiago suporte', { force: true });

  //Pesquisa
cy.get('[ng-show="manageSubscriptionsTabs.unsubscribed"] > .mt-20 > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn', { timeout: 20000 })
  .should('be.visible')
  .click({ force: true });

        cy.wait(5000)

          cy.contains('table tbody tr', 'thiago suporte', { timeout: 20000 })
    .should('be.visible')

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

  it("Vai até a vitrine", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(9)', { timeout: 60000 })
        .should('be.visible')
        .click();
        
      })

        it("Envia os campos da trilha novamente", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

           //Clica na trilha
      cy.contains('.card-container', 'Terceiro Cenário Trilha', { timeout: 60000 })
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
    .type('CAMPO REENVIADO 1');

});

cy.wait(3000)

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(7000)

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

     it("ACEITA O DOCUMENTO", () => {

     //Clioca no icon de notivicações
    cy.get('button[title="Notificações"]', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Clica em visualizar nos documento
  cy.get(':nth-child(1) > .approval-box > .column > .approval-buttons > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .click();

  cy.wait(3000)

  //Aceite o documentos
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

      //Clica no Treinamento
  cy.contains('.card-title', 'Terceiro Cenário Trilha', {
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

     it("Vai até a vitrine", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(9)', { timeout: 60000 })
        .should('be.visible')
        .click();
        
      })

        it("Verefica o botão efetuar pagamento", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

           //Clica na trilha
      cy.contains('.card-container', 'Terceiro Cenário Trilha', { timeout: 60000 })
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

        /*
        //Verefique se está escrito o campo aprovado
    cy.get('input[placeholder="LECTOR10"]', { timeout: 60000 })
  .should('have.value', 'QUINTO CENÁRIO 2');
*/

  //Clica em Voltar
  cy.get('.showcase-head-2 > .btn')
  .click()

     });

     

});
