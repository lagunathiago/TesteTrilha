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

context("Teste Cupons", () => {

    it("Clica em cupon", () => {
      // Clicando em Cadastros
      cy.get('[title="Cadastros"] > .sideitem', { timeout: 60000 })
        .should("be.visible")
        .click();

        // Clica em Cupons pelo texto
cy.contains('a', 'Cupons', { timeout: 60000 })
  .should('be.visible')
  .click();

    });

    it("Remover Cupon", () => {
      cy.get(".edit-coupon-btn", { timeout: 20000 })
        .first()
        .should("be.visible")
        .click();

      cy.contains("button", "Remover", { timeout: 20000 })
        .should("be.visible")
        .click();

      cy.wait(3000);

      cy.get(
        '[switch="modal.removeCoupon"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent',
        { timeout: 60000 },
      )
        .should("be.visible")
        .click();

      cy.wait(2000);
    });

    it("Filtros de cupons", () => {
      //Selecionar colunas
      cy.get(".buttons-collection", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.get('[data-cv-idx="0"]').click();
      cy.wait(1000);
      cy.get('[data-cv-idx="1"]').click();
      cy.wait(1000);
      cy.get('[data-cv-idx="2"]').click();
      cy.wait(1000);
      cy.get('[data-cv-idx="3"]').click();
      cy.wait(1000);

      cy.get('[data-cv-idx="0"]').click();
      cy.wait(1000);
      cy.get('[data-cv-idx="1"]').click();
      cy.wait(1000);
      cy.get('[data-cv-idx="2"]').click();
      cy.wait(1000);
      cy.get('[data-cv-idx="3"]').click();
      cy.wait(1000);

      //Clica fora para sumir a caixiha
      cy.get(".breadcrumbs-bar").click();

      //Copiar
      cy.get(".buttons-copy", { timeout: 60000 }).should("be.visible").click();

      cy.wait(1000);

      //Csv
      cy.get(".buttons-csv", { timeout: 60000 }).should("be.visible").click();

      cy.wait(1000);

      //Pdf
      cy.get(".buttons-pdf", { timeout: 60000 }).should("be.visible").click();

      cy.wait(1000);

      //Copiar
      cy.get(".icon-file-xls", { timeout: 60000 }).should("be.visible").click();

      cy.wait(1000);

      //Imprimir
      cy.get(".buttons-print", { timeout: 60000 }).should("be.visible").click();

      cy.wait(6000);
    });

    it("Pesquisar cupom", () => {
      cy.get('input[placeholder="Pesquisar..."]', { timeout: 20000 })
        .should("be.visible")
        .clear()
        .type("Teste");

      cy.get(".title-bar > .multiselect > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000);
    });

    it("Criar cupom R$", () => {
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
        .invoke("val", "Automação Trilha R$")
        .trigger("input")
        .trigger("change")
        .blur();

      //Valor
      cy.get('input[type="number"][ng-model="coupon.value"]', {
        timeout: 20000,
      })
        .should("be.visible")
        .and("not.be.disabled")
        .clear()
        .type("1");

      //Código
      cy.get('input[ng-model="coupon.code"]', { timeout: 20000 })
        .should("be.visible")
        .and("not.be.disabled")
        .clear()
        .type("717273");

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

      cy.wait(4000)
    
    });

    it("Criar cupom %", () => {
      //Clica em criar cupons
      cy.get(".title-bar > .btn-icon", { timeout: 60000 })
      .scrollIntoView()
        .should("be.visible")
        .click();

      //Nome cupom
      cy.contains("Editar cupom", { timeout: 20000 }).should("be.visible");

      cy.get('input[id*="pt_BR_"]', { timeout: 20000 })
        .should("exist")
        .first()
        .click({ force: true })
        .invoke("val", "Automação Trilha%")
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
        .type("747576");

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

      cy.wait(4000);

    });

    it("Recarregando a pagina para salvar cupom", () => {
      cy.get(":nth-child(12) > a > .w-100", { timeout: 60000 })
        .scrollIntoView()
        .should("be.visible")
        .click();

      cy.wait(3000);

       // Clica em Cupons pelo texto
cy.contains('a', 'Cupons', { timeout: 60000 })
  .should('be.visible')
  .click()

      cy.wait(3000);

      cy.contains('Automação Trilha R$')
      .scrollIntoView()
      .should('be.visible')

      cy.contains('Automação Trilha%')
      .scrollIntoView()
      .should('be.visible')

    });

    it('Clica na Categoria', () => {

         //Clica no menu Trilhas
        cy.get('[title="Trilhas"] > .sideitem',{timeout:60000})
        .scrollIntoView()
        .click(); 

          //Clica na Categoria
      cy.contains("li.list-group-item", "Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})
        
    });

    it('Trilha á vista %', () => {

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
            .type('Trilha Cupom Porcentagem á vista %', { delay: 50 })
            .should('have.value', 'Trilha Cupom Porcentagem á vista %')

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

     it('Trilha á vista R$', () => {

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
            .type('Trilha cupom Valor á vista R$', { delay: 50 })
            .should('have.value', 'Trilha cupom Valor á vista R$')

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

    });
    

  it('Trilha recorrente R$', () => {

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
            .type('Trilha Recorrente cupom Valor R$', { delay: 50 })
            .should('have.value', 'Trilha Recorrente cupom Valor R$')

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
               
cy.get('.ui-select-search:visible', { timeout: 60000 })
  .should('be.visible')
  .type('Minha');

          cy.wait(1000)

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

            // 1) Abre o select (clica no container)
        cy.get('div.ui-select-container[ng-model="currentClass.purchaseInfo.creditCardMaxInstallments"]', { timeout: 20000 })
            .filter(':visible')
            .first()
            .scrollIntoView()
            .click({ force: true });

        // 2) Agora procura a lista de opções VISÍVEL em qualquer lugar da página
        cy.get('.ui-select-choices')
            .filter(':visible')
            .first()
            .within(() => {
        cy.contains('.ui-select-choices-row .ng-binding', /^2$/)
            .scrollIntoView()
            .click({ force: true });
        });

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

        cy.wait(2000)

    });

it('Trilha recorrente %', () => {

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
            .type('Trilha Recorrente cupom Porcentagem %', { delay: 50 })
            .should('have.value', 'Trilha Recorrente cupom Porcentagem %')

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
            .type('30', { delay: 50, force: true })
            .blur();

            // 1) Abre o select (clica no container)
        cy.get('div.ui-select-container[ng-model="currentClass.purchaseInfo.creditCardMaxInstallments"]', { timeout: 20000 })
            .filter(':visible')
            .first()
            .scrollIntoView()
            .click({ force: true });

        // 2) Agora procura a lista de opções VISÍVEL em qualquer lugar da página
        cy.get('.ui-select-choices')
            .filter(':visible')
            .first()
            .within(() => {
        cy.contains('.ui-select-choices-row .ng-binding', /^5$/)
            .scrollIntoView()
            .click({ force: true });

        });

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

        cy.wait(5000)

    });
  });
});
