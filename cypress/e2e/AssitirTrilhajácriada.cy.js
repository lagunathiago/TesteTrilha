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

        //Fazer incrição
        cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent', { timeout: 15000 })
        .click()


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
      
      //Clica em Concluir Treinamento
      cy.get('.header > .btn-swipe-accent',{timeout:10000})
      .click()

      //Finaliza
      cy.get('[switch="modal.finishCourse"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent', {timeout:60000})
      .click()


      });

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

          //Volta
      cy.get('.showcase-head-2 > .btn')
      .click()
        
        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(1000)

         //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(2)', { timeout: 60000 })
        .should('be.visible')
        .click();

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

            cy.wait(2000)

            //Clica em acessar no Treinamento
        cy.get(':nth-child(2) > .overflow-x > .stage-content-list > tbody > tr.ng-scope > :nth-child(6) > .pv-5 > .btn-swipe-accent', { timeout: 15000 })
            .filter(':visible')
            .first()
            .click()

            cy.wait(1000)

              //Clica em voltar
    cy.get("#hideResource", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });

         //Clica em Concluir Treinamento
      cy.get('.header > .btn-swipe-accent',{timeout:10000})
      .click()

      //Finaliza
      cy.get('[switch="modal.finishCourse"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent', {timeout:60000})
      .click()

      cy.wait(2000)

      });

it('Responde a Avaliação todas na mesma página Thiago', () => {

  //Clica em responder, na primeira avaliação
  cy.get(':nth-child(3) > .overflow-x > .stage-content-list > tbody > :nth-child(1) > :nth-child(6) > .pv-5 > .btn-swipe-accent',{timeout:20000})
  .click()

  cy.wait(2000)

  //Na questão 1 clica na primeira
  cy.get('#q_107269 > .q-answer > .alternatives-grid-box > :nth-child(1) > :nth-child(1) > .checkbox > .icon-checkbox')
  .scrollIntoView()
  .click()

  //Na questao 2 clica na segunda
  cy.get('#q_123731 > .q-answer > .alternatives-grid-box > :nth-child(2) > :nth-child(1) > .checkbox > .icon-checkbox')
.scrollIntoView()
.click()

//Na questão 3 clcia na priemira
cy.get('#q_107271 > .q-answer > .alternatives-grid-box > :nth-child(1) > :nth-child(1) > .checkbox > .icon-checkbox')
.scrollIntoView()
.click()

//Clica em enviar resposta
cy.get('.evaluation-actions > .end > .btn-swipe-accent')
.click()

//Salvar
cy.get('[switch="service.modalSendAnswers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
.click()

cy.wait(3000)

//Voltar
cy.get('.evaluation-actions > .flex > .btn-swipe-accent')
.click()

});

it('Responde a avaliação Reação uma por página Thiago', () => {

  cy.wait(2000)

  //Clica na avaliação
  cy.get(':nth-child(2) > :nth-child(6) > .pv-5',{timeout:10000})
  .click()

  cy.wait(1000)

  //Responde Concordo totalmente na primeira questao
  cy.get('.q-answer > .ng-scope > :nth-child(1) > .icon-radio')
  .click()

  //Proximo
  cy.get('[ng-click="evaluationViewerService.nextQuestion()"]')
  .click()

  cy.wait(2000)

  //Seleciona a quinta estrela na segunda questao
  cy.get(':nth-child(5) > .classificative-star')
  .click()

  //Proximo
  cy.get('[ng-click="evaluationViewerService.nextQuestion()"]')
  .click()

  cy.wait(2000)

  //Responde o quinto numero
  cy.get(':nth-child(5) > .classificative-number')
  .click()

  cy.wait(2000)

  //Clica em enviar resposta
cy.get('.evaluation-actions > .end > .btn-swipe-accent')
.click()

//Salvar
cy.get('[switch="service.modalSendAnswers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
.click()

cy.wait(3000)

//Voltar
cy.get('.evaluation-actions > .flex > .btn-swipe-accent')
.click()

    });

    it('Reaponde a avaliação uma por página Thiago', () => {

      cy.wait(2000)

      //Clica na avaliação
      cy.get(':nth-child(3) > :nth-child(6) > .pv-5 > .btn-swipe-accent')
      .click()

      cy.wait(1000)

      //Responde terceira resposata na primeira avaliação
      cy.get('.alternatives-grid-box > :nth-child(1) > :nth-child(1) > .checkbox > .icon-checkbox')
      .click()

       //Proximo
  cy.get('[ng-click="evaluationViewerService.nextQuestion()"]')
  .click()

  cy.wait(2000)

  //Responde a terceira resposta na segunda avaliação
  cy.get(':nth-child(3) > :nth-child(1) > .checkbox > .icon-checkbox')
  .click()

   //Proximo
  cy.get('[ng-click="evaluationViewerService.nextQuestion()"]')
  .click()

  cy.wait(2000)

  //Responde a primeira avaliação na terceira resposta
  cy.get('.alternatives-grid-box > :nth-child(2) > :nth-child(1) > .checkbox > .icon-checkbox')
  .click()

  cy.wait(2000)

  //Clica em enviar resposta
cy.get('.evaluation-actions > .end > .btn-swipe-accent')
.click()

//Salvar
cy.get('[switch="service.modalSendAnswers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
.click()

cy.wait(3000)

//Voltar
cy.get('.evaluation-actions > .flex > .btn-swipe-accent')
.click()

    });

it('Responde a avaliação todas na mesma página Thiago', () => {

  //clica na avaliação
  cy.get(':nth-child(4) > :nth-child(6) > .pv-5 > .btn-swipe-accent')
  .click()

   cy.wait(2000)

  //Na questão 1 clica na primeira
  cy.get('#q_107269 > .q-answer > .alternatives-grid-box > :nth-child(1) > :nth-child(1) > .checkbox > .icon-checkbox')
  .scrollIntoView()
  .click()

  //Na questao 2 clica na segunda
  cy.get('#q_123731 > .q-answer > .alternatives-grid-box > :nth-child(2) > :nth-child(1) > .checkbox > .icon-checkbox')
.scrollIntoView()
.click()

//Na questão 3 clcia na priemira
cy.get('#q_107271 > .q-answer > .alternatives-grid-box > :nth-child(1) > :nth-child(1) > .checkbox > .icon-checkbox')
.scrollIntoView()
.click()

//Clica em enviar resposta
cy.get('.evaluation-actions > .end > .btn-swipe-accent')
.click()

//Salvar
cy.get('[switch="service.modalSendAnswers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
.click()

cy.wait(3000)

//Voltar
cy.get('.evaluation-actions > .flex > .btn-swipe-accent')
.click()
  
   });

   it('Clica no scorm', () => {

    //Clica em scomrm
    cy.get(':nth-child(4) > .overflow-x > .stage-content-list > tbody > tr.ng-scope > :nth-child(6) > .pv-5 > .btn-swipe-accent')
    .click()

    cy.log('VISUALIZE E ENVIE A RESPOSAT DO SCORM')
    cy.pause()

    cy.get('.hide-resource')
    .click()
    
   });

   it('Clica no documento', () => {

    //clica em documentos na trilha
    cy.get(':nth-child(5) > .overflow-x > .stage-content-list > tbody > tr.ng-scope > :nth-child(6) > .pv-5 > .btn-swipe-accent')
    .scrollIntoView()
    .click()

    cy.get('.modal-content > iframe', {timeout:60000})
    .should('be.visible')

    cy.wait(4000)

    //Clica em voltar
    cy.get('.hide-resource')
    .click()

    });
    

    it('Valida o Progresso da trilha', () => {
  cy.get('div.progress-label.ng-binding', { timeout: 60000 })
    .should('be.visible')
    .invoke('text')
    .then((texto) => {
      const numero = Number(texto.replace(/[^\d]/g, ''));

      expect(numero).to.not.be.NaN;
      expect(numero).to.be.within(20, 100);
    });
});

it('Valida o Aproveitamento da trilha', () => {
  cy.get('div.chart-info', { timeout: 60000 })
  .scrollIntoView()
    .should('be.visible')
    .within(() => {
      cy.get('div.lector-txt-main.txt-xl.ng-binding')
        .should('be.visible')
        .invoke('text')
        .then((texto) => {
          const numero = Number(texto.replace(/[^\d]/g, ''));

          expect(numero).to.not.be.NaN;
          expect(numero).to.be.within(0, 100);
        });
    });
});

     
it('Finaliza a trilha', () => {

  //Clica em finalizar trilha
  cy.get('.mt-20 > .default-gap > .btn-swipe-accent')
  .click()

  //Finalizar trilha
  cy.get('[switch="modal.unsub"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
  .click()

    cy.log('🎉 Trilha completa finalizada com sucesso!');


});
      
    
   });

  });
