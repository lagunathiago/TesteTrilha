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

  context("Validações gerais do fluxo de e-mails", () => {

    
     it("Vai até Vitrine", () => {
        
        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(11)', { timeout: 60000 })
        .should('be.visible')
        .click();

            });

      it('Incrição na trilha Gratuita sem aprovação', () => {

        cy.wait(2000)

        //Clica na trilha
      cy.contains('.card-container', 'Gratuita sem aprovação - Trilha Automação', { timeout: 60000 })
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

        //Fazer incrição
  cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click();

  cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

        cy.log('VERIFICAR O RECEBIMENTO DO E-MAIL DE INCRIÇÃO (QUANTIDADE DE E-MAILS (ALUNO) : 1)')
        cy.pause()

          });

             it('Incrição na trilha Gratuita com aprovação', () => {

                //Ver tudo
        cy.get(':nth-child(2) > .carousel-container > .showcase-title-container > .middle > .show-all',{ timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

        //Clica na trilha
      cy.contains('.card-container', 'Gratuita com aprovação - Trilha Automação', { timeout: 60000 })
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

        //Fazer incrição
  cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click();

  cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

        cy.log('VERIFICAR O RECEBIMENTO DO E-MAIL DE INCRIÇÃO (QUANTIDADE DE E-MAILS (ALUNO) : 1)')
        cy.pause()

      });
             it('Incrição na trilha Gratuita com aprovação de campos personalizado', () => {

                //Ver tudo
        cy.get(':nth-child(2) > .carousel-container > .showcase-title-container > .middle > .show-all',{ timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

        //Clica na trilha
      cy.contains('.card-container', 'Gratuita com aprovação de campos Personalizado - Trilha Automação', { timeout: 60000 })
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

        //Fazer incrição
  cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click();

    //Escreve no campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('Trilha 1 Automação');

});

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

        cy.log('VERIFICAR O RECEBIMENTO DO E-MAIL DE INCRIÇÃO (QUANTIDADE DE E-MAILS (ALUNO) : 1)')
        cy.pause()

      });
             it('Incrição na trilha Gratuita com de gestor e aprovação de campos personalizado', () => {

                //Ver tudo
        cy.get(':nth-child(2) > .carousel-container > .showcase-title-container > .middle > .show-all',{ timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

        //Clica na trilha
      cy.contains('.card-container', 'Gratuita com aprovação de gestor e campos Personalizado - Trilha Automação', { timeout: 60000 })
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

        //Fazer incrição
  cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click();

    //Escreve no campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('Trilha 2 Automação');

});

//Escreve no segundo campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_1')
    .clear()
    .type('Trilha 3 Automação');

});

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

        cy.log('VERIFICAR O RECEBIMENTO DO E-MAIL DE INCRIÇÃO (QUANTIDADE DE E-MAILS (ALUNO) : 1)')
        cy.pause()

      });

it('Entra no perfil adm pra recusar os documentos', () => {
    
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

        it('Recusa os documentos', () => {
            
           //Clioca no icon de notivicações
    cy.get('button[title="Notificações"]', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Clica em visualizar nos documento
  cy.get(':nth-child(1) > .approval-box > .column > .approval-buttons > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Recusa o primeiro documento
  cy.get('tbody > :nth-child(1) > :nth-child(12) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(2000)

 cy.get('.modal:visible, .modal-content:visible, .modal-body:visible', { timeout: 20000 })
  .first()
  .as('modal');

cy.get('@modal')
  .find('input[placeholder*="Motivo"]', { timeout: 20000 })
  .first()
  .then($input => {
    $input[0].value = 'Reprovado 1'
    $input[0].dispatchEvent(new Event('input', { bubbles: true }))
    $input[0].dispatchEvent(new Event('change', { bubbles: true }))
  });

  //Recusa o segundo documento
  cy.get(':nth-child(2) > :nth-child(12) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

    cy.wait(2000)

    cy.get('.modal:visible')
  .first()
  .find('input[placeholder*="Motivo"]')
  .eq(1) // sempre o campo logo abaixo
  .then($input => {
    $input[0].value = 'Reprovado 2'
    $input[0].dispatchEvent(new Event('input', { bubbles: true }))
    $input[0].dispatchEvent(new Event('change', { bubbles: true }))
  });

    //Recusa o terceiro documento
  cy.get(':nth-child(3) > :nth-child(12) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

    cy.wait(2000)

    cy.get('.modal:visible')
  .first()
  .find('input[placeholder*="Motivo"]')
  .eq(2) // sempre o campo logo abaixo
  .then($input => {
    $input[0].value = 'Reprovado 3'
    $input[0].dispatchEvent(new Event('input', { bubbles: true }))
    $input[0].dispatchEvent(new Event('change', { bubbles: true }))
 });

      // Salva a ação feita
cy.get('.modal:visible', { timeout: 60000 })
  .contains('button', 'Salvar')
  .should('be.visible')
  .click({ force: true });

  cy.wait(9000)
  cy.log('VEREFIQUE OS EMAILS DE RECUSA DE DOCUMENTO')
  cy.pause()

        });

it("Vai até categoria", () => {

   //Clica em Trilhas
        cy.get('[title="Trilhas"] > .sideitem', {timeout: 60000})
        .click(); 

        //Clica na Categoria
      cy.contains("li.list-group-item", "Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

})

   it("Recusa a trilha gratuita com aprovação0", () => {

    cy.wait(2000)

      //Clica na Trilha
  cy.contains('.card-items', 'Gratuita com aprovação - Trilha Automação', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
      //Clica em gerenciar
      cy.get('.manage-subs > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click()

     //Solicitação de matricula
      cy.contains('a', 'Solicitações de matrícula', { timeout: 60000 })
  .should('be.visible')
  .click()

//clica no usuario
  cy.get('#pending-subscriptions-table > tbody > .odd > .select-checkbox',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Clica em Recusar
  cy.contains('button', 'Recusar', { timeout: 60000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click()

  //Escreve a recusa
  cy.get('textarea[ng-model="declineSubscriptions.reason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('Recusado da trilha com aprovação de Gestor', { delay: 50 })

  //Clica em recusar
  cy.get('[ng-show="modal.declineBatchSubscriptions"] > .modal > .content-box-footer > .btn-swipe-accent',{ timeout: 60000 })
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  cy.log('VEREFIQUE O EMAIL DE RESULTADO DE INCRIÇÃO (1 E-MAIL)')
  cy.pause()
  
   });

it('Volta para o perfil aluno e envia novamnete', () => {
    
         cy.visit("https://www.hml.lector.live/esmp/subscribe/login");
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

    it("Vai até Vitrine", () => {
        
        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(11)', { timeout: 60000 })
        .should('be.visible')
        .click();

            });

             it('Incrição na trilha Gratuita com aprovação', () => {

                //Ver tudo
        cy.get(':nth-child(2) > .carousel-container > .showcase-title-container > .middle > .show-all',{ timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

        //Clica na trilha
      cy.contains('.card-container', 'Gratuita com aprovação - Trilha Automação', { timeout: 60000 })
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

        //Fazer incrição
  cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click();

  cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

        cy.log('VERIFICAR O RECEBIMENTO DO E-MAIL DE INCRIÇÃO (QUANTIDADE DE E-MAILS (ALUNO) : 1)')
        cy.pause()

      });
      
             it('Incrição na trilha Gratuita com aprovação de campos personalizado', () => {

                //Ver tudo
        cy.get(':nth-child(2) > .carousel-container > .showcase-title-container > .middle > .show-all',{ timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

        //Clica na trilha
      cy.contains('.card-container', 'Gratuita com aprovação de campos Personalizado - Trilha Automação', { timeout: 60000 })
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

        //Reenviar campos
        cy.get('[ladda="sendingClassCustomFields"]', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click();
 
    //Escreve no campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('Trilha 1 Automação');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();


  cy.wait(8000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

      });
      
             it('Incrição na trilha Gratuita com de gestor e aprovação de campos personalizado', () => {

                //Ver tudo
        cy.get(':nth-child(2) > .carousel-container > .showcase-title-container > .middle > .show-all',{ timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

        //Clica na trilha
      cy.contains('.card-container', 'Gratuita com aprovação de gestor e campos Personalizado - Trilha Automação', { timeout: 60000 })
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

    //Reenviar campos
        cy.get('[ladda="sendingClassCustomFields"]', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click();

    //Escreve no campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('Trilha 2 Automação');

});

//Escreve no segundo campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_1')
    .clear()
    .type('Trilha 3 Automação');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(8000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

      });

it('Entra no perfil adm pra recusar os documentos', () => {
    
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

        it('Recusa os documentos', () => {
            
           //Clioca no icon de notivicações
    cy.get('button[title="Notificações"]', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Clica em visualizar nos documento
  cy.get(':nth-child(1) > .approval-box > .column > .approval-buttons > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Recusa o primeiro documento
  cy.get('tbody > :nth-child(1) > :nth-child(12) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(2000)

 cy.get('.modal:visible, .modal-content:visible, .modal-body:visible', { timeout: 20000 })
  .first()
  .as('modal');

cy.get('@modal')
  .find('input[placeholder*="Motivo"]', { timeout: 20000 })
  .first()
  .then($input => {
    $input[0].value = 'Reprovado 1'
    $input[0].dispatchEvent(new Event('input', { bubbles: true }))
    $input[0].dispatchEvent(new Event('change', { bubbles: true }))
  });

  //Recusa o segundo documento
  cy.get(':nth-child(2) > :nth-child(12) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

    cy.wait(2000)

    cy.get('.modal:visible')
  .first()
  .find('input[placeholder*="Motivo"]')
  .eq(1) // sempre o campo logo abaixo
  .then($input => {
    $input[0].value = 'Reprovado 2'
    $input[0].dispatchEvent(new Event('input', { bubbles: true }))
    $input[0].dispatchEvent(new Event('change', { bubbles: true }))
  });

    //Recusa o terceiro documento
  cy.get(':nth-child(3) > :nth-child(12) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

    cy.wait(2000)

    cy.get('.modal:visible')
  .first()
  .find('input[placeholder*="Motivo"]')
  .eq(2) // sempre o campo logo abaixo
  .then($input => {
    $input[0].value = 'Reprovado 3'
    $input[0].dispatchEvent(new Event('input', { bubbles: true }))
    $input[0].dispatchEvent(new Event('change', { bubbles: true }))
 });

      // Salva a ação feita
cy.get('.modal:visible', { timeout: 60000 })
  .contains('button', 'Salvar')
  .should('be.visible')
  .click({ force: true });

  cy.wait(8000)
  cy.log('VEREFIQUE OS EMAILS DE RECUSA (3 E-MAILS)')
  cy.pause()

        });


        it("Vai até categoria", () => {

   //Clica em Trilhas
        cy.get('[title="Trilhas"] > .sideitem', {timeout: 60000})
        .click(); 

        //Clica na Categoria
      cy.contains("li.list-group-item", "Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

})

   it("Recusa a trilha gratuita com aprovação0", () => {

    cy.wait(2000)

      //Clica na Trilha
  cy.contains('.card-items', 'Gratuita com aprovação - Trilha Automação', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
      //Clica em gerenciar
      cy.get('.manage-subs > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click()

     //Solicitação de matricula
      cy.contains('a', 'Solicitações de matrícula', { timeout: 60000 })
  .should('be.visible')
  .click()

//clica no usuario
  cy.get('#pending-subscriptions-table > tbody > .odd > .select-checkbox',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Clica em Recusar
  cy.contains('button', 'Recusar', { timeout: 60000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click()

  //Escreve a recusa
  cy.get('textarea[ng-model="declineSubscriptions.reason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('Recusado da trilha com aprovação de Gestor', { delay: 50 })

  //Clica em recusar
  cy.get('[ng-show="modal.declineBatchSubscriptions"] > .modal > .content-box-footer > .btn-swipe-accent',{ timeout: 60000 })
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  cy.log('VEREFIQUE O EMAIL DE RESULTADO DE INCRIÇÃO (1 E-MAIL)')
  cy.pause()

})

        it('Volta para o perfil aluno e envia novamnete', () => {
    
         cy.visit("https://www.hml.lector.live/esmp/subscribe/login");
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


 it("Vai até Vitrine", () => {
        
        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(11)', { timeout: 60000 })
        .should('be.visible')
        .click();

            });


     it('Incrição na trilha Gratuita com aprovação', () => {

                //Ver tudo
        cy.get(':nth-child(2) > .carousel-container > .showcase-title-container > .middle > .show-all',{ timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

        //Clica na trilha
      cy.contains('.card-container', 'Gratuita com aprovação - Trilha Automação', { timeout: 60000 })
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

        //Fazer incrição
  cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click();

  cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

        cy.log('VERIFICAR O RECEBIMENTO DO E-MAIL DE INCRIÇÃO (QUANTIDADE DE E-MAILS (ALUNO) : 1)')
        cy.pause()

      });
         it('Incrição na trilha Gratuita com aprovação de campos personalizado', () => {

                //Ver tudo
        cy.get(':nth-child(2) > .carousel-container > .showcase-title-container > .middle > .show-all',{ timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

        //Clica na trilha
      cy.contains('.card-container', 'Gratuita com aprovação de campos Personalizado - Trilha Automação', { timeout: 60000 })
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

      //Reenviar campos
        cy.get('[ladda="sendingClassCustomFields"]', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click();

    //Escreve no campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('Trilha 1 Automação');

});

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
             it('Incrição na trilha Gratuita com de gestor e aprovação de campos personalizado', () => {

                //Ver tudo
        cy.get(':nth-child(2) > .carousel-container > .showcase-title-container > .middle > .show-all',{ timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

        //Clica na trilha
      cy.contains('.card-container', 'Gratuita com aprovação de gestor e campos Personalizado - Trilha Automação', { timeout: 60000 })
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

      //Reenviar campos
        cy.get('[ladda="sendingClassCustomFields"]', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click();

    //Escreve no campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('Trilha 2 Automação');

});

//Escreve no segundo campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_1')
    .clear()
    .type('Trilha 3 Automação');

});

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
        

        it('Entra no perfil adm pra recusar os documentos', () => {
    
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

        
        it('Aceita os Documentos', () => {

            cy.wait(3000)
            
           //Clioca no icon de notivicações
    cy.get('button[title="Notificações"]', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Clica em visualizar nos documento
  cy.get(':nth-child(1) > .approval-box > .column > .approval-buttons > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .click();


  //Aceita o primeiro documento
  cy.get('tbody > :nth-child(1) > :nth-child(11) > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  cy.wait(2000)

  //Recusa o segundo documento
  cy.get('tbody > :nth-child(2) > :nth-child(11) > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

    cy.wait(2000)

    //Recusa o terceiro documento
  cy.get('tbody > :nth-child(3) > :nth-child(11) > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

      cy.wait(2000)

      // Salva a ação feita
cy.get('.modal:visible', { timeout: 60000 })
  .contains('button', 'Salvar')
  .should('be.visible')
  .click({ force: true });

  cy.wait(8000)
  cy.log('VEREFIQUE OS EMAILS')
  cy.pause()

        });

        it("Vai até categoria", () => {

   //Clica em Trilhas
        cy.get('[title="Trilhas"] > .sideitem', {timeout: 60000})
        .click(); 

        //Clica na Categoria
      cy.contains("li.list-group-item", "Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

})


   it("Aceita a trilha gratuita com aprovação0", () => {

    cy.wait(2000)

      //Clica na Trilha
  cy.contains('.card-items', 'Gratuita com aprovação - Trilha Automação', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
      //Clica em gerenciar
      cy.get('.manage-subs > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click()

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

  cy.log('VEREFIQUE O EMAIL DE RESULTADO DE INCRIÇÃO (2 E-MAIL)')
  cy.pause()

  //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Clica na categoria
  cy.get('.breadcrumbs-path > .lector-txt-accent')
  .click()

        });

 it("Gratuita com aprovação de gestor e campos Personalizado - Trilha Automação", () => {

    cy.wait(2000)

      //Clica na Trilha
  cy.contains('.card-items', 'Gratuita com aprovação de gestor e campos Personalizado - Trilha Automação', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
      //Clica em gerenciar
      cy.get('.manage-subs > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click()

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

  cy.log('VEREFIQUE O EMAIL DE RESULTADO DE INCRIÇÃO (2 E-MAIL)')
  cy.pause()

  //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Clica na categoria
  cy.get('.breadcrumbs-path > .lector-txt-accent')
  .click()

        });
        

it("Vai até os relatóros e Verifica os logs de Email", ()=> {

    //Clica em relatórios
    cy.get('[title="Relatórios"] > .sideitem', { timeout: 60000 })
        .should('be.visible')
        .click();

          cy.wait(5000)

    //Clica em Emails
    cy.contains('li.list-group-item.node-report-categories', 'Envio de e-mails', { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

// abre o select de usuário
cy.get('.ui-select-toggle', { timeout: 10000 })
  .first()
  .click({ force: true });

// digita no input visível que abriu
cy.get('input.ui-select-search:visible', { timeout: 10000 })
  .first()
  .should('be.visible')
  .type('Thiago Laguna', { delay: 50 });

// seleciona o usuário
cy.contains('.ui-select-choices-row', 'Thiago Laguna', { timeout: 10000 })
  .should('be.visible')
  .click({ force: true });

  cy.log('COLOQUE A DATA DE HOJE')
  cy.pause()

  //Clique em pesquisar
  cy.get('.report-filters > :nth-child(1) > .ng-isolate-scope > .multiselect > .icon-spyglass',{timeout:60000})
  .should('be.visible')
  .click();

  cy.pause()
  cy.log('VEREFIQUE OS E-MAILS DO RELATORIOCOM O QUE VOCE RECEBEU E VEREFIQUE A QUANTIDADE CORETA')

        });
      });
   });