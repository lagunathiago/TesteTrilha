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

 it("Clica na categoria", () => {    

  //Clica no menu Trilhas
        cy.get('[title="Trilhas"] > .sideitem',{timeout:60000})
        .scrollIntoView()
        .click(); 

          //Clica na Categoria
      cy.contains("li.list-group-item", "Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

   })

    it('Criando trilha com Limite de parcelas', () => {

         //Clica no botão de adicionar nova trilha
        cy.get('.title-bar > .btn-icon',{timeout:60000})
        .click(); 
        
      //preenche o campo de nome da trilha
        cy.get('input[placeholder="Informe o nome"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('Pagamento Sicreedi á vista', { delay: 50 })
            .should('have.value', 'Pagamento Sicreedi á vista')

        //Clica em etapas
        cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]')
        .click();

        //Nova estapa
        cy.get('.pt-20 > .flex > .btn-swipe-accent')
        .click()

        //Novo conteúdo
        cy.get('[colspan="5"] > .btn-swipe-accent')
        .click()

        //Seleciona o tipo de conteudo
        cy.get('.pv-5 > .w-100')
        .click()

        //Clica em documento
        cy.get('.open > .ui-select-choices > :nth-child(3)')
        .click()

        cy.get('[model="currentContent.document"] > .multiselect > .border > .ui-select-match > .btn-default')
        .click()

                cy.wait(1000)
               
cy.get('.ui-select-search:visible', { timeout: 60000 })
  .should('be.visible')
  .type('Minha');

cy.contains('.ui-select-choices-row:visible', 'Minha área.pdf', { timeout: 60000 })
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
            .type('Turma teste', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma teste');

        // PREÇO (máscara monetária: 391 => 3,91)
        cy.get('#currentClassPrice', { timeout: 60000 })
            .should('be.visible')
            .and('not.be.disabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('2.00', { delay: 50, force: true })
            .blur();

          cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo

            cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Aluno")

cy.contains('.ui-select-choices-row', 'Aluno', {timeout:60000})
  .first()
  .click()

  cy.wait(1000)

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

        // SALVAR TURMA: clique + validação (ajuste o texto/resultado esperado)
        cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent').click({ force: true });

        //salvar trilha
        cy.get('.content-box-footer > .flex > .btn-swipe-accent').click({ force: true });

        cy.wait(4000)

    });

     it('Criando trilha com Limite de parcelas', () => {

         //Clica no botão de adicionar nova trilha
        cy.get('.title-bar > .btn-icon',{timeout:60000})
        .click(); 
        
      //preenche o campo de nome da trilha
        cy.get('input[placeholder="Informe o nome"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('Pagamento Sicreedi limite de parcela', { delay: 50 })
            .should('have.value', 'Pagamento Sicreedi limite de parcela')

        //Clica em etapas
        cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]')
        .click();

        //Nova estapa
        cy.get('.pt-20 > .flex > .btn-swipe-accent')
        .click()

        //Novo conteúdo
        cy.get('[colspan="5"] > .btn-swipe-accent')
        .click()

        //Seleciona o tipo de conteudo
        cy.get('.pv-5 > .w-100')
        .click()

        //Clica em documento
        cy.get('.open > .ui-select-choices > :nth-child(3)')
        .click()

        cy.get('[model="currentContent.document"] > .multiselect > .border > .ui-select-match > .btn-default')
        .click()

                cy.wait(1000)
               
cy.get('.ui-select-search:visible', { timeout: 60000 })
  .should('be.visible')
  .type('Minha');

cy.contains('.ui-select-choices-row:visible', 'Minha área.pdf', { timeout: 60000 })
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
            .type('Turma teste', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma teste');

        // PREÇO (máscara monetária: 391 => 3,91)
        cy.get('#currentClassPrice', { timeout: 60000 })
            .should('be.visible')
            .and('not.be.disabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('12.00', { delay: 50, force: true })
            .blur();

           //Clica no número de parcelas (ui-select)
cy.contains('div.field-title', 'Quantidade máxima de parcelas no cartão', { timeout: 60000 })
  .closest('div')                 // sobe pro container do campo (se precisar ajustar)
  .parent()
  .find('.ui-select-container.lector-select')
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000)

   // Seleciona o número 4 de parcelas
cy.contains('.ui-select-choices-row', '4', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

          cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo

            cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Aluno")

cy.contains('.ui-select-choices-row', 'Aluno', {timeout:60000})
  .first()
  .click()

  cy.wait(1000)

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

        // SALVAR TURMA: clique + validação (ajuste o texto/resultado esperado)
        cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent').click({ force: true });

        //salvar trilha
        cy.get('.content-box-footer > .flex > .btn-swipe-accent').click({ force: true });

        cy.wait(4000)

    });

    it('Criação trilha a vista com cupom', () => {

         //Clica no botão de adicionar nova trilha
        cy.get('.title-bar > .btn-icon',{timeout:60000})
        .click(); 
        
      //preenche o campo de nome da trilha
        cy.get('input[placeholder="Informe o nome"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .focus()
            .clear({ force: true })
            .type('Pagamento Sicreedi á vista com cupom', { delay: 50 })
            .should('have.value', 'Pagamento Sicreedi á vista com cupom')

        //Clica em etapas
        cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]')
        .click();

        //Nova estapa
        cy.get('.pt-20 > .flex > .btn-swipe-accent')
        .click()

        //Novo conteúdo
        cy.get('[colspan="5"] > .btn-swipe-accent')
        .click()

        //Seleciona o tipo de conteudo
        cy.get('.pv-5 > .w-100')
        .click()

        //Clica em documento
        cy.get('.open > .ui-select-choices > :nth-child(3)')
        .click()

        cy.get('[model="currentContent.document"] > .multiselect > .border > .ui-select-match > .btn-default')
        .click()

                cy.wait(1000)
               
cy.get('.ui-select-search:visible', { timeout: 60000 })
  .should('be.visible')
  .type('Minha');

cy.contains('.ui-select-choices-row:visible', 'Minha área.pdf', { timeout: 60000 })
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
            .type('Turma teste', { delay: 50, force: true })
            .blur();

        cy.get('input[placeholder="Informe um nome para a turma"]')
            .filter(':visible')
            .first()
            .should('have.value', 'Turma teste');

        // PREÇO (máscara monetária: 391 => 3,91)
        cy.get('#currentClassPrice', { timeout: 60000 })
            .should('be.visible')
            .and('not.be.disabled')
            .scrollIntoView()
            .click({ force: true })
            .focus()
            .clear({ force: true })
            .type('10', { delay: 50, force: true })
            .blur();

          cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo

            cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()

      cy.get('[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
      .type("Aluno")

cy.contains('.ui-select-choices-row', 'Aluno', {timeout:60000})
  .first()
  .click()

  cy.wait(1000)

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

        // SALVAR TURMA: clique + validação (ajuste o texto/resultado esperado)
        cy.get('.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent').click({ force: true });

        //salvar trilha
        cy.get('.content-box-footer > .flex > .btn-swipe-accent').click({ force: true });

        cy.wait(4000)

    });

    it('Vai até Cadastro/Cupom', () => {
    
  // Garante que está na tela de cupons (opcional, mas seguro)
  cy.get('[title="Cadastros"] > .sideitem', { timeout: 60000 })
    .should("be.visible")
    .click();

  cy.contains('a', 'Cupons', { timeout: 60000 })
    .should('be.visible')
    .click();

});

 it("Criar Cupom", () => {
      //Clica em criar cupons
      cy.get(".title-bar > .btn-icon", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Nome cupom
      cy.contains("Editar cupom", { timeout: 20000 }).should("be.visible");

      cy.get('input[id*="pt_BR_"]', { timeout: 20000 })
        .should("exist")
        .first()
        .click({ force: true })
        .invoke("val", "Pagaamento Sicredi")
        .trigger("input")
        .trigger("change")
        .blur();

     // Escolhe %
      cy.get('select[ng-model="coupon.valueType"]', { timeout: 60000 })
        .should("be.visible")
        .select("%");

      cy.wait(1000);

      cy.get('select[ng-model="coupon.valueType"]', { timeout: 20000 })
        .should("be.visible")
        .select("%");

      //Valor
      cy.get('input[type="number"][ng-model="coupon.value"]', {timeout: 20000})
        .should("be.visible")
        .and("not.be.disabled")
        .clear()
        .type("50");

      //Código
      cy.get('input[ng-model="coupon.code"]', { timeout: 20000 })
        .should("be.visible")
        .and("not.be.disabled")
        .clear()
        .type("101112");

      // Quantidade
      cy.contains("div.box-title", "Quantidade")
        .next()
        .find('input[type="number"]')
        .clear({ force: true })
        .type("80", { force: true })
        .blur();

      //Data de inicio
      cy.get('input[ng-model="coupon.startDate"]', { timeout: 20000 })
        .should("be.visible")
        .invoke("val", "01/01/2026 10:00")
        .trigger("input")
        .trigger("change");

      //Data de fim
      cy.get('input[ng-model="coupon.endDate"]', { timeout: 20000 })
        .should("be.visible")
        .should("not.be.disabled")
        .invoke("val", "05/12/2026 18:00")
        .trigger("input")
        .trigger("change");

      cy.wait(4000);

      //Confirma
      cy.get('[switch="modal.coupons"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
        .should("be.visible")
        .click();

      cy.wait(5000)
    
    });


     
});






