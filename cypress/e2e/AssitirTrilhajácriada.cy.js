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

    cy.visit("https://www.hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("thiagosuporte2@uorak.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("123");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');

});

  context("Validações gerais do fluxo de e-mails", () => {
    /*
    
     it("Vai até Vitrine", () => {
        
        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(1000)

         //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(2)', { timeout: 60000 })
        .should('be.visible')
        .click();

            });

      it('Incrição na trilha Gratuita sem aprovação', () => {

        //Ver Tudo
       cy.get('.show-all', { timeout: 60000 })
  .eq(1) // índice começa em 0 → 1 = segundo
  .should('be.visible')
  .click();

        //Clica na Trilha
        cy.contains('.showcase-card-title', 'Trilha já criada - Automação', { timeout: 15000 })
             .scrollIntoView()
            .should('be.visible')
            .click();

        cy.wait(5000);
/*
        //Fazer incrição
        cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent', { timeout: 15000 })
        .click()
*/

/*
      });

      it('Clica no acessar do treinamento', () => {

        cy.get(':nth-child(2) > .overflow-x > .stage-content-list > tbody > tr.ng-scope > :nth-child(6) > .pv-5 > .btn-swipe-accent', { timeout: 15000 })
            .filter(':visible')
            .first()
            .click()

        cy.wait(5000)
        
      });

      it('Visualiza os Conteudos', () => {

        cy.contains('Aula Presencial', { timeout: 20000 })
  .should('be.visible');

  //Clica em proximo (Será redirecionado para a webconferencia)
    cy.get('#nextResourceArrow > i.icon-pointer-right')
    .scrollIntoView()
    .click()

    cy.wait(5000)

    //Verifica se está na webconferencia
cy.contains('.course-info-section-title','Web Conferencia Trilha',{timeout:10000})
.scrollIntoView()
.should('be.visible');

    cy.wait(4000)

    //Clica em proximo 
    cy.get('#nextResourceArrow > i.icon-pointer-right')
    .scrollIntoView()
    .click()

    cy.contains('.course-info-section-title','06.4 - Módulo Facebook e Instagram Ads',{timeout:10000})
    .scrollIntoView()
    .should('be.visible');

        cy.wait(4000)

    //Clica em proximo 
    cy.get('#nextResourceArrow > i.icon-pointer-right')
    .scrollIntoView()
    .click()

     cy.contains('.course-info-section-title','Bugs da webconferência 03.11.2023 (4)',{timeout:10000})
    .scrollIntoView()
    .should('be.visible');

    //Clica em proximo 
    cy.get('#nextResourceArrow > i.icon-pointer-right')
    .scrollIntoView()
    .click()

     cy.contains('.course-info-section-title','Entrega',{timeout:10000})
    .scrollIntoView()
    .should('be.visible');

    cy.log('Adicione um arquivo e confirme')
    cy.pause()

     //Clica em proximo 
    cy.get('#nextResourceArrow > i.icon-pointer-right')
    .scrollIntoView()
    .click()

    cy.log('AGUARDA A VISUALIZAÇÃO DO VIDEO')
    cy.wait(20000)

      //Clica em voltar
    cy.get("#hideResource", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });

      cy.wait(5000)
      
      /*
      //Clica em Concluir Treinamento
      cy.get('.header > .btn-swipe-accent',{timeout:10000})
      .click()

      //Finaliza
      cy.get('[switch="modal.finishCourse"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent', {timeout:60000})
      .click()


      });
*/
       it("Minha área/Meu Calendario", () => {

      //Minha área
      cy.contains("span", "Minha Área", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Minhas Meu calendario
      cy.contains("button.showcase-home-menu-item", "Meu Calendário", {timeout: 60000 })
        .should("be.visible")
        .click();
    });

    it('Verifica se os esvento está no calendario', () => {

    cy.contains('.fc-title', 'Web Conferencia Trilha', { timeout: 10000 })
    .scrollIntoView()
    .should('be.visible')

    cy.contains('.fc-title', 'Aula presencial - Treinamento pra', { timeout: 10000 })
    .scrollIntoView()
    .should('be.visible')
  
       cy.wait(3000)

       });

        it('Volta pro treinamento e conclui', () => {

      cy.get('.showcase-head-2 > .btn')
      .click()

        //Ver Tudo
       cy.get('.show-all', { timeout: 60000 })
  .eq(1) // índice começa em 0 → 1 = segundo
  .should('be.visible')
  .click();

   //Clica na Trilha
        cy.contains('.showcase-card-title', 'Trilha já criada - Automação', { timeout: 15000 })
             .scrollIntoView()
            .should('be.visible')
            .click();

        cy.wait(5000);

        cy.get(':nth-child(2) > .overflow-x > .stage-content-list > tbody > tr.ng-scope > :nth-child(6) > .pv-5 > .btn-swipe-accent', { timeout: 15000 })
            .filter(':visible')
            .first()
            .click()
 

    });
   });
  });