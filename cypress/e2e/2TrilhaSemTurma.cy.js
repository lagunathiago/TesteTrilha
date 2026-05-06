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
    cy.visit("https://hml.lector.live/philips/subscribe/login");
    cy.viewport(1920, 1080);

    cy.contains("button", "Entrar")
      .should('be.visible')
      .click({ force: true });

   cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("teste0812@sharklasers.com");

   cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

     // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

  });

  it('Clica na Trilha e Faz Incrição', () => {

    cy.wait(3000)

    //Clica na trilha
    cy.contains('.card-container', 'Trilha Sem Turma Automação', { timeout: 60000 })
    .scrollIntoView()
    .should('be.visible')
    .click();

    //Clica em participar da trilha
    cy.get('[ng-if="!toolsConfig.trailsParams.useClasses"] > .btn-swipe-accent')
    .should('be.visible')
    .click();   

    cy.wait(2000)

    //Clica em acessar no documento
    cy.get(':nth-child(2) > .overflow-x > .stage-content-list > tbody > tr.ng-scope > :nth-child(6) > .pv-5 > .btn-swipe-accent')
    .should('be.visible')
    .click();

    cy.log('VISUALIZE O DOCUMENTO E VOLTE')
    cy.pause()
    cy.log('VISUALIZE O DOCUMENTO E VOLTE')

  });

   it('Visualize os conteúdos do segundo treinamento', () => {

    //Clica em acessar no treinamento
    cy.get(':nth-child(3) > .overflow-x > .stage-content-list > tbody > tr.ng-scope > :nth-child(6) > .pv-5 > .btn-swipe-accent')
    .should('be.visible')
    .click()

    cy.log('VISUALIZE OS CONTEUDOS DO TREINAMENTO')
    cy.pause()
    cy.log('VISUALIZE OS CONTEUDOS DO TREINAMENTO')

  });

  it('Responda as avaliações', () => {

    //====================================Clica em acessar na avaliação todas na mesma página Thiago
    cy.get(':nth-child(4) > .overflow-x > .stage-content-list > tbody > :nth-child(1) > :nth-child(6) > .pv-5 > .btn-swipe-accent')
    .should('be.visible')
    .click()

    cy.log('RESPONDA A AVALIAÇÃO E VOLTE')
    cy.pause()
    cy.log('RESPONDA A AVALIAÇÃO E VOLTE')

    cy.wait(2000)

   //==================================Clica em acessar na avaliação uma por página Thiago
    cy.get(':nth-child(4) > .overflow-x > .stage-content-list > tbody > :nth-child(2) > :nth-child(6) > .pv-5 > .btn-swipe-accent')
    .should('be.visible')
    .click()

    cy.log('RESPONDA A AVALIAÇÃO E VOLTE')
    cy.pause()
    cy.log('RESPONDA A AVALIAÇÃO E VOLTE')

    cy.wait(2000)

       //==============================Clica em acessar na avaliação Reação uma por página Thiago
    cy.get(':nth-child(3) > :nth-child(6) > .pv-5 > .btn-swipe-accent')
    .should('be.visible')
    .click()

    cy.log('RESPONDA A AVALIAÇÃO E VOLTE')
    cy.pause()
    cy.log('RESPONDA A AVALIAÇÃO E VOLTE')

    cy.wait(2000)

     //===============================Clica em acessar na avaliação Reação todas em uma página Thiago
    cy.get(':nth-child(4) > :nth-child(6) > .pv-5 > .btn-swipe-accent')
    .should('be.visible')
    .click()

    cy.log('RESPONDA A AVALIAÇÃO E VOLTE')    
    cy.pause()
    cy.log('RESPONDA A AVALIAÇÃO E VOLTE')

    cy.wait(2000)

  });

   it('Visualize o conteudo scorm', () => {

    cy.wait(2000)

    //Clica em acessar no scorm
    cy.get(':nth-child(5) > .overflow-x > .stage-content-list > tbody > tr.ng-scope > :nth-child(6) > .pv-5 > .btn-swipe-accent')
    .should('be.visible')
    .click()

    cy.log('VISUALIZE O CONTEUDO SCORM')
    cy.pause()
    cy.log('VISUALIZE O CONTEUDO SCORM')

  });

  it('Finaliza o a trilha e verifica o certificado', () => {

    //Clica em finalizar
    cy.get('.default-gap > .btn-swipe-accent > .ng-binding')
    .click()

    cy.wait(2000)

    //Finalizar
    cy.get('[switch="modal.unsub"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
    .click()

    cy.wait(10000)

     //Verifica se foi aberto
      cy.get('#certificate-view', { timeout: 60000 })
  .should('be.visible');

  //Espera 5 segundos pra visualzar o certificados
  cy.wait(5000)

  //Clica em Voltar
  cy.get('button[ng-click="closeCertificateRender()"]', { timeout: 60000 })
  .should('be.visible')
  .click();
 
  });

});


