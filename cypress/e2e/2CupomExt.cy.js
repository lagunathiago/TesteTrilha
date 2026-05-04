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


    it('Vait pra categoria', () => {

         // Clicando no icon da vitrine
      cy.get(".active > .icon-next", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Clica na vitrine Automação
      cy.get(".showcase-navigation-menu > :nth-child(7)", { timeout: 60000 })
        .should("be.visible")
        .click();  

        //Ver tudo
        cy.get(':nth-child(2) > .carousel-container > .showcase-title-container > .middle > .show-all')
        .should('be.visible')
        .click()

             //Clica na trilha
      cy.contains('.card-container', 'Trilha Cupom Porcentagem á vista %', { timeout: 60000 })
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

    });
   
  it('Faz incrição', () => {

        //Faz incrição
        cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent')
        .click()
    });
        
    it("Limite de Cupom %", () => {
      //Digita um cupom já com um limite atingido
      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]', {
        timeout: 10000,
      })
        .should("be.visible")
        .and("not.be.disabled")
        .scrollIntoView()
        .clear()
        .invoke("val", "05/01/2026")
        .trigger("input")
        .trigger("change")
        .blur();

      //Clica no pix
      cy.get(".mb-5 > .icon-radio", { timeout: 10000 })
        .should("be.visible")
        .click();

      //Aplicar cupom
      cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
        .should("be.visible")
        .click();

      //Verifica a mensagem de limite
      cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', {
        timeout: 10000,
      })
        .should("be.visible")
        .and("contain", "Limite de cupons alcançado");

      cy.wait(2000);
    });

    it("Data de cupom Expirada %", () => {
      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
        .should("be.visible")
        .and("not.be.disabled")
        .click()
        .invoke("val", "0520")
        .trigger("input")
        .trigger("change");

      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

      //Aplicar cupom
      cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
        .should("be.visible")
        .click();

      //Verifica a mensagem de limite
      cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', {
        timeout: 10000,
      })
        .should("be.visible")
        .and("contain", "Cupom não encontrado");

      cy.wait(2000);
    });

    it("Valor Acima do Minimo %", () => {
      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
        .should("be.visible")
        .and("not.be.disabled")
        .click()
        .invoke("val", "2203")
        .trigger("input")
        .trigger("change");

      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

      //Aplicar cupom
      cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
        .should("be.visible")
        .click();

      //Verifica a mensagem de limite
      cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', {
        timeout: 10000,
      })
        .should("be.visible")
        .and("contain", "Valor de compra insuficiente");

      cy.wait(2000);
    });

    it("Apllica cupom % á vista", () => {
      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
        .should("be.visible")
        .and("not.be.disabled")
        .click()
        .invoke("val", "747576")
        .trigger("input")
        .trigger("change");

      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

      cy.wait(4000);

      //Aplicar cupom
      cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
        .should("be.visible")
        .click();

      cy.wait(4000);

      //Clica em continuar compra
      cy.get('[ng-show="!sicredi.paymentOption"] > .btn-swipe-accent', {
        timeout: 10000,
      })
        .should("be.visible")
        .click();

      cy.wait(4000);

      cy.get("#pixQrCode", { timeout: 60000 }).should("be.visible");
    });
      

      it("Minha área/Minhas compras/Cupon %", () => {
        
      //Fecha o pix
      cy.get(".column.ng-valid > .modal-header > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

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

      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Trilha Cupom Porcentagem á vista %", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000);

      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).should(
        "have.length.greaterThan",
        0,
      );

      cy.wait(300); // micro-wait só pra estabilizar render (bem pequeno)
    //verifica o valor e o cupom
      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).then(
        ($rows) => {
          const $last = $rows.last();
          expect($last.find("td.couponColumn").text()).to.contain("50%");
          expect($last.find("td.priceColumn").text()).to.contain("R$ 1.00");
        },
      );

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

      cy.wait(4000);

      //Fecha QRCode
      cy.get(".modal-overlay.ng-scope > .modal > .modal-header > .btn", {timeout: 60000})
        .should("be.visible")
        .click();

    });

    it('Vai pra vitrine', () => {

         // Clicando no icon da vitrine
            cy.get("[ng-class=\"{active: $state.current.name == 'accessLink.content.showcase.id.open'}\"] > .ng-binding")
        .click()
        
      //Clica na vitrine Automação
      cy.get(".showcase-navigation-menu > :nth-child(7)", { timeout: 60000 })
        .should("be.visible")
        .click();  

        //Ver tudo
        cy.get(':nth-child(2) > .carousel-container > .showcase-title-container > .middle > .show-all')
        .should('be.visible')
        .click()

             //Clica na trilha
      cy.contains('.card-container', 'Trilha cupom Valor á vista R$', { timeout: 60000 })
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

    });

    it('Faz incrição', () => {

        //Faz incrição
        cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent')
        .click()
    });
        
    it("Limite de Cupom R$", () => {
      //Digita um cupom já com um limite atingido
      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]', {
        timeout: 10000,
      })
        .should("be.visible")
        .and("not.be.disabled")
        .scrollIntoView()
        .clear()
        .invoke("val", "05/01/2026")
        .trigger("input")
        .trigger("change")
        .blur();

      //Clica no pix
      cy.get(".mb-5 > .icon-radio", { timeout: 10000 })
        .should("be.visible")
        .click();

      //Aplicar cupom
      cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
        .should("be.visible")
        .click();

      //Verifica a mensagem de limite
      cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', {
        timeout: 10000,
      })
        .should("be.visible")
        .and("contain", "Limite de cupons alcançado");

      cy.wait(2000);
    });

    it("Data de cupom Expirada %", () => {
      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
        .should("be.visible")
        .and("not.be.disabled")
        .click()
        .invoke("val", "0520")
        .trigger("input")
        .trigger("change");

      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

      //Aplicar cupom
      cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
        .should("be.visible")
        .click();

      //Verifica a mensagem de limite
      cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', {
        timeout: 10000,
      })
        .should("be.visible")
        .and("contain", "Cupom não encontrado");

      cy.wait(2000);
    });

    it("Valor Acima do Minimo %", () => {
      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
        .should("be.visible")
        .and("not.be.disabled")
        .click()
        .invoke("val", "2203")
        .trigger("input")
        .trigger("change");

      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

      //Aplicar cupom
      cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
        .should("be.visible")
        .click();

      //Verifica a mensagem de limite
      cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', {
        timeout: 10000,
      })
        .should("be.visible")
        .and("contain", "Valor de compra insuficiente");

      cy.wait(2000);
    });

    it("Apllica cupom % á vista", () => {
      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
        .should("be.visible")
        .and("not.be.disabled")
        .click()
        .invoke("val", "717273")
        .trigger("input")
        .trigger("change");

      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

      cy.wait(4000);

      //Aplicar cupom
      cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
        .should("be.visible")
        .click();

      cy.wait(4000);

      //Clica em continuar compra
      cy.get('[ng-show="!sicredi.paymentOption"] > .btn-swipe-accent', {
        timeout: 10000,
      })
        .should("be.visible")
        .click();

      cy.wait(4000);

      cy.get("#pixQrCode", { timeout: 60000 }).should("be.visible");

      cy.wait(2000);

       //Fecha a compra
      cy.get(".column.ng-valid > .modal-header > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

    });

      it("Minha área/Minhas compras/Cupon %", () => {

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

      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Trilha cupom Valor á vista R$", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000);

      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).should(
        "have.length.greaterThan",
        0,
      );

      cy.wait(300); // micro-wait só pra estabilizar render (bem pequeno)

    //verifica o valor e o cupom
      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).then(
        ($rows) => {
          const $first = $rows.last();
          expect($first.find("td.couponColumn").text()).to.contain("R$1.00");
          expect($first.find("td.priceColumn").text()).to.contain("R$ 1.00");
        },
      );

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

      cy.wait(4000);

      //Fecha QRCode
      cy.get(".modal-overlay.ng-scope > .modal > .modal-header > .btn", {timeout: 60000})
        .should("be.visible")
        .click();

    });

it('Vai pra vitrine', () => {

         // Clicando no icon da vitrine
            cy.get("[ng-class=\"{active: $state.current.name == 'accessLink.content.showcase.id.open'}\"] > .ng-binding")
        .click()
        
      //Clica na vitrine Automação
      cy.get(".showcase-navigation-menu > :nth-child(7)", { timeout: 60000 })
        .should("be.visible")
        .click();  

        //Ver tudo
        cy.get(':nth-child(2) > .carousel-container > .showcase-title-container > .middle > .show-all')
        .should('be.visible')
        .click()

             //Clica na trilha
      cy.contains('.card-container', 'Trilha Recorrente cupom Valor R$', { timeout: 60000 })
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

    });

    it('Faz incrição', () => {

        //Faz incrição
        cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent')
        .click()
    });
        
    it("Limite de Cupom R$", () => {
      //Digita um cupom já com um limite atingido
      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]', {
        timeout: 10000,
      })
        .should("be.visible")
        .and("not.be.disabled")
        .scrollIntoView()
        .clear()
        .invoke("val", "05/01/2026")
        .trigger("input")
        .trigger("change")
        .blur();

      //Clica no pix
      cy.get(".mb-5 > .icon-radio", { timeout: 10000 })
        .should("be.visible")
        .click();

      //Aplicar cupom
      cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
        .should("be.visible")
        .click();

      //Verifica a mensagem de limite
      cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', {
        timeout: 10000,
      })
        .should("be.visible")
        .and("contain", "Limite de cupons alcançado");

      cy.wait(2000);
    });

    it("Data de cupom Expirada %", () => {
      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
        .should("be.visible")
        .and("not.be.disabled")
        .click()
        .invoke("val", "0520")
        .trigger("input")
        .trigger("change");

      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

      //Aplicar cupom
      cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
        .should("be.visible")
        .click();

      //Verifica a mensagem de limite
      cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', {
        timeout: 10000,
      })
        .should("be.visible")
        .and("contain", "Cupom não encontrado");

      cy.wait(2000);
    });

    it("Valor Acima do Minimo %", () => {
      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
        .should("be.visible")
        .and("not.be.disabled")
        .click()
        .invoke("val", "919293")
        .trigger("input")
        .trigger("change");

      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

      //Aplicar cupom
      cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
        .should("be.visible")
        .click();

      //Verifica a mensagem de limite
      cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', {
        timeout: 10000,
      })
        .should("be.visible")
        .and("contain", "Valor de compra insuficiente");

      cy.wait(2000);
    });

    it("Apllica cupom R$ á vista", () => {

          //Clica em cartão
  cy.get('input[type="radio"][value="CREDIT_CARD"]', { timeout: 20000 })
  .should('exist')
  .check({ force: true });

      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
        .should("be.visible")
        .and("not.be.disabled")
        .click()
        .invoke("val", "717273")
        .trigger("input")
        .trigger("change");

      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

      cy.wait(4000);

      //Aplicar cupom
      cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
        .should("be.visible")
        .click();

      cy.wait(4000);

      //Clica em continuar compra
      cy.get('[ng-show="!sicredi.paymentOption"] > .btn-swipe-accent', {timeout: 10000})
        .should("be.visible")
        .click();

      cy.wait(4000);

      
        //Abre o seletor de paletas
  cy.get('.ui-select-container.lector-select:visible', { timeout: 10000 })
  .first()
  .click();

  cy.wait(1000)

  // Valida os textos das parcelas
cy.get('.ui-select-choices:visible', { timeout: 10000 }).within(() => {
  cy.contains('Em 1x de R$9.00').should('be.visible');
  cy.contains('Em 2x de R$4.50').should('be.visible');
});

//Fecha o modal
  cy.get('.column.ng-dirty > .modal-header > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

    });
  
    it('Vai pra vitrine', () => {

         // Clicando no icon da vitrine
            cy.get("[ng-class=\"{active: $state.current.name == 'accessLink.content.showcase.id.open'}\"] > .ng-binding")
        .click()
        
      //Clica na vitrine Automação
      cy.get(".showcase-navigation-menu > :nth-child(7)", { timeout: 60000 })
        .should("be.visible")
        .click();  

        //Ver tudo
        cy.get(':nth-child(2) > .carousel-container > .showcase-title-container > .middle > .show-all')
        .should('be.visible')
        .click()

             //Clica na trilha
      cy.contains('.card-container', 'Trilha Recorrente cupom Porcentagem %', { timeout: 60000 })
  .should('be.visible')
  .find('.showcase-card-container')
  .click({ force: true });

    });

    it('Faz incrição', () => {

        //Faz incrição
        cy.get('.mt-10 > .default-gap > div > .btn-swipe-accent')
        .click()
    });
        
    it("Limite de Cupom R$", () => {
      //Digita um cupom já com um limite atingido
      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]', {
        timeout: 10000,
      })
        .should("be.visible")
        .and("not.be.disabled")
        .scrollIntoView()
        .clear()
        .invoke("val", "05/01/2026")
        .trigger("input")
        .trigger("change")
        .blur();

      //Clica no pix
      cy.get(".mb-5 > .icon-radio", { timeout: 10000 })
        .should("be.visible")
        .click();

      //Aplicar cupom
      cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
        .should("be.visible")
        .click();

      //Verifica a mensagem de limite
      cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', {
        timeout: 10000,
      })
        .should("be.visible")
        .and("contain", "Limite de cupons alcançado");

      cy.wait(2000);
    });

    it("Data de cupom Expirada %", () => {
      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
        .should("be.visible")
        .and("not.be.disabled")
        .click()
        .invoke("val", "0520")
        .trigger("input")
        .trigger("change");

      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

      //Aplicar cupom
      cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
        .should("be.visible")
        .click();

      //Verifica a mensagem de limite
      cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', {
        timeout: 10000,
      })
        .should("be.visible")
        .and("contain", "Cupom não encontrado");

      cy.wait(2000);
    });

    it("Valor Acima do Minimo %", () => {
      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
        .should("be.visible")
        .and("not.be.disabled")
        .click()
        .invoke("val", "919293")
        .trigger("input")
        .trigger("change");

      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

      //Aplicar cupom
      cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
        .should("be.visible")
        .click();

      //Verifica a mensagem de limite
      cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', {
        timeout: 10000,
      })
        .should("be.visible")
        .and("contain", "Valor de compra insuficiente");

      cy.wait(2000);
    });

    it("Apllica cupom % á vista", () => {

          //Clica em cartão
  cy.get('input[type="radio"][value="CREDIT_CARD"]', { timeout: 20000 })
  .should('exist')
  .check({ force: true });

      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
        .should("be.visible")
        .and("not.be.disabled")
        .click()
        .invoke("val", "747576")
        .trigger("input")
        .trigger("change");

      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

      cy.wait(4000);

      //Aplicar cupom
      cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
        .should("be.visible")
        .click();

      cy.wait(4000);

      //Clica em continuar compra
      cy.get('[ng-show="!sicredi.paymentOption"] > .btn-swipe-accent', {timeout: 10000})
        .should("be.visible")
        .click();

      cy.wait(4000);

        //Abre o seletor de paletas
  cy.get('.ui-select-container.lector-select:visible', { timeout: 10000 })
  .first()
  .click();

  cy.wait(1000)

  // Valida os textos das parcelas
cy.get('.ui-select-choices:visible', { timeout: 10000 }).within(() => {
  cy.contains('Em 1x de R$15.00').should('be.visible');
  cy.contains('Em 2x de R$7.50').should('be.visible');
  cy.contains('Em 3x de R$5.00').should('be.visible');
  cy.contains('Em 4x de R$3.75').should('be.visible');
  cy.contains('Em 5x de R$3.00').should('be.visible');
});

//Fecha o modal
  cy.get('.column.ng-dirty > .modal-header > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

  cy.wait(4000)

    });

it('Volta pro Perfil aluno e valida os Relatórios de compras', () => {

    cy.visit("https://www.hml.lector.live/ext/subscribe/login");
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

it('Vai em relatorio', () => {

    //Clica em relatórios
      cy.get('[title="Relatórios"] > .sideitem', { timeout: 60000 })
      .scrollIntoView()
        .should("be.visible")
        .click();

      //Clica em Compras/Trilha
      cy.get('[data-nodeid="28"]',{timeout:60000})
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      cy.wait(3000);
    
});

 it('Valida as compras', () => {
    
      //Escreve
      cy.get(".report-filters", { timeout: 10000 })
        .find('input[ng-model="filter.text"]')
        .filter(":visible")
        .eq(1) // garante só 1
        .should("be.visible")
        .clear()
        .type("Trilha Cupom Porcentagem á vista %", { delay: 30 });

      cy.wait(2000);

      //Clique em pesquisar
      cy.get(":nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn",{ timeout: 10000 })
        .should("be.visible")
        .click();

      cy.log("VEREFEQUE O HORARIO DA COMPRA E O DESCONTO DO CUPOM");
      cy.wait(10000);

        //Escreve
      cy.get(".report-filters", { timeout: 10000 })
        .find('input[ng-model="filter.text"]')
        .filter(":visible")
        .eq(1) // garante só 1
        .should("be.visible")
        .clear()
        .type("Trilha cupom Valor á vista R$", { delay: 30 });

      cy.wait(2000);

      //Clique em pesquisar
      cy.get(":nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn",{ timeout: 10000 })
        .should("be.visible")
        .click();

      cy.log("VEREFEQUE O HORARIO DA COMPRA E O DESCONTO DO CUPOM");
      cy.wait(10000);


       //Escreve
      cy.get(".report-filters", { timeout: 10000 })
        .find('input[ng-model="filter.text"]')
        .filter(":visible")
        .eq(1) // garante só 1
        .should("be.visible")
        .clear()
        .type("Trilha Recorrente cupom Valor R$", { delay: 30 });

      cy.wait(2000);

      //Clique em pesquisar
      cy.get(":nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn",{ timeout: 10000 })
        .should("be.visible")
        .click();

      cy.log("VEREFEQUE O HORARIO DA COMPRA E O DESCONTO DO CUPOM");
      cy.wait(10000);


       //Escreve
      cy.get(".report-filters", { timeout: 10000 })
        .find('input[ng-model="filter.text"]')
        .filter(":visible")
        .eq(1) // garante só 1
        .should("be.visible")
        .clear()
        .type("Trilha Recorrente cupom Porcentagem %", { delay: 30 });

      cy.wait(2000);

      //Clique em pesquisar
      cy.get(":nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn",{ timeout: 10000 })
        .should("be.visible")
        .click();

      cy.log("VEREFEQUE O HORARIO DA COMPRA E O DESCONTO DO CUPOM");
      cy.wait(10000);


    });
});
