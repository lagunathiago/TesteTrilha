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

    cy.visit("https://www.hml.lector.live/ext/subscribe/login");
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

  it('Vai pra categoria', () => {

         // Clicando no icon da vitrine
      cy.get(".active > .icon-next", { timeout: 60000 })
        .should("be.visible")
        .click();

        //Clica na vitrine Automação
        cy.contains('div.showcase-menu-name', /^Automação Pagamento$/)
  .should('be.visible')
  .scrollIntoView()
  .click();

  });

  
  it('Compra trilha á vista', () => {

    //Ver tudo
        cy.get(':nth-child(2) > .carousel-container > .showcase-title-container > .middle > .show-all')
        .should('be.visible')
        .click()
    
             //Clica na trilha
      cy.contains('.card-container', 'Pagamento Sicreedi á vista', { timeout: 60000 })
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

  //Clica em comprar
  cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent')
  .should('be.visible') 
  .click()

  //Clica no pix
  cy.get('.mb-5 > .icon-radio')
  .should('be.visible')
  .click()

//Clica em continuar compra
cy.get('[ng-show="!sicredi.paymentOption"] > .btn-swipe-accent')
.should('be.visible')
.click()

  cy.wait(4000);

  //Verifica se o QR code do pix apareceu
  cy.get("#pixQrCode", { timeout: 60000 }).should("be.visible");

  //Fecha QRCode
  cy.get('.column.ng-valid > .modal-header > .btn')
  .click()

  //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click(); 

  });

 it('Verifica o limite de parcela na trilha', () => {

    //Ver tudo
        cy.get(':nth-child(2) > .carousel-container > .showcase-title-container > .middle > .show-all')
        .should('be.visible')
        .click()
    
             //Clica na trilha
      cy.contains('.card-container', 'Pagamento Sicreedi limite de parcela', { timeout: 60000 })
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

  //Clica em comprar
  cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent')
  .should('be.visible') 
  .click()

 // Clica em Cartão
cy.get('input[type="radio"][value="CREDIT_CARD"]', { timeout: 10000 })
  .should('exist')
  .check({ force: true });

  //Clica em continuar compra
      cy.get('[ng-show="!sicredi.paymentOption"] > .btn-swipe-accent', {
        timeout: 10000,
      })
        .should("be.visible")
        .click();

        //Abre o seletor de paletas
  cy.get('.ui-select-container.lector-select:visible', { timeout: 10000 })
  .first()
  .click();

    // Valida os textos das parcelas
cy.get('.ui-select-choices:visible', { timeout: 10000 }).within(() => {
  cy.contains('Em 1x de R$12.00').should('be.visible');
  cy.contains('Em 2x de R$6.00').should('be.visible');
  cy.contains('Em 3x de R$4.00').should('be.visible');
  cy.contains('Em 4x de R$3.00').should('be.visible');
});

  cy.wait(4000);

//Fecha o modal
  cy.get('.column.ng-dirty > .modal-header > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();   

  });

   it('Compra a trilha á vista com cupom', () => {

    //Ver tudo
        cy.get(':nth-child(2) > .carousel-container > .showcase-title-container > .middle > .show-all')
        .should('be.visible')
        .click()
    
             //Clica na trilha
      cy.contains('.card-container', 'Pagamento Sicreedi á vista com cupom', { timeout: 60000 })
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

  //Clica em comprar
  cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent')
  .should('be.visible') 
  .click()

  //Insere o cupom
  cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
    .should("be.visible")
    .and("not.be.disabled")
    .click()
    .invoke("val", "101112")
    .trigger("input")
    .trigger("change");

  cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

  cy.wait(4000);

    //Clica no pix
  cy.get('.mb-5 > .icon-radio')
  .should('be.visible')
  .click()

  cy.wait(4000);

  //Clica em continuar compra
  cy.get('[ng-show="!sicredi.paymentOption"] > .btn-swipe-accent', {
    timeout: 10000,
  })
    .should("be.visible")
    .click();
    
  cy.wait(4000);

  cy.get("#pixQrCode", { timeout: 60000 }).should("be.visible");

  //Fecha o modal
  cy.get('.column.ng-dirty > .modal-header > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();    

    });

   it("Minha área/Minhas compras/", () => {

      //Minha área
      cy.contains("span", "Minha Área", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Minhas compras
      cy.contains("button.showcase-home-menu-item", "Minhas Compras", {
        timeout: 60000,
      })
        .should("be.visible")
        .click();
    });

    it("Valida compra da Trilha Pagamento Sicreedi á vista", () => {
      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Pagamento Sicreedi á vista", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

        cy.log()
        cy.wait(5000)

         cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).then(
        ($rows) => {
          const $first = $rows.first();
          expect($first.find("td.priceColumn").text()).to.contain("R$ 2.00");
        },
      );

           //Verifica o status Aguardando confirmação do pagamento
cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).then(($rows) => {
  const $last = $rows.last();
  expect($last.find("td.translateColumn").text())
    .to.contain("Aguardando confirmação do pagamento");
});

      cy.wait(3000); // micro-wait só pra estabilizar render (bem pequeno)

      //clica primeiro
      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 })
        .should("have.length.greaterThan", 0)
        .first()
        .within(() => {
          cy.get("button.sicredi-slip", { timeout: 20000 })
            .should("be.visible")
            .click({ force: true });
        });

      //Garante que o pix abriu
      cy.get("#pixQrCode", { timeout: 20000 }).should("be.visible");

      cy.wait(2000);
    
//Fecha QRCode
      cy.get(".modal-overlay.ng-scope > .modal > .modal-header > .btn",{timeout:60000})
      .should('be.visible')
      .click()       

      });

       it("Valida compra da Trilha Pagamento Sicreedi limite de parcela", () => {
      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Pagamento Sicreedi limite de parcela", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

        cy.wait(5000)

        //Verefica o preço
         cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).then(
        ($rows) => {
          const $last = $rows.last();
          expect($last.find("td.priceColumn").text()).to.contain("R$ 12.00");
        },
      );

      //Verifica o status Aguardando confirmação do pagamento
cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).then(($rows) => {
  const $last = $rows.last();
  expect($last.find("td.translateColumn").text())
    .to.contain("Aguardando confirmação do pagamento");
});

cy.wait(3000)
   
      });

it("Valida compra da Trilha Pagamento Sicreedi á vista com cupom", () => {
      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Pagamento Sicreedi á vista com cupom", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

        cy.log()
        cy.wait(5000)

         cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).then(
        ($rows) => {
          const $last = $rows.last();
          expect($last.find("td.couponColumn").text()).to.contain("50%");
          expect($last.find("td.priceColumn").text()).to.contain("R$ 5.00");
        },
      );

      cy.wait(3000); // micro-wait só pra estabilizar render (bem pequeno)

      //clica no ultimo
      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 })
        .should("have.length.greaterThan", 0)
        .last()
        .within(() => {
          cy.get("button.sicredi-slip", { timeout: 20000 })
            .should("be.visible")
            .click({ force: true });
        });

      //Garante que o pix abriu
      cy.get("#pixQrCode", { timeout: 20000 }).should("be.visible");

      cy.wait(2000);
    
//Fecha QRCode
      cy.get(".modal-overlay.ng-scope > .modal > .modal-header > .btn",{timeout:60000})
      .should('be.visible')
      .click()       

      });

});