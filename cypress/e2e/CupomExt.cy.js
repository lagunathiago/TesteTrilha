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

      //Clica em Cupons
      cy.get(":nth-child(13) > a > .w-100", { timeout: 60000 })
        .should("be.visible")
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

      //Clica em Cupons
      cy.get(":nth-child(13) > a > .w-100", { timeout: 60000 })
        .should("be.visible")
        .click();

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
        cy.get('.title-bar > .btn-icon',{timeout:10000})
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

        //seleciona etapas
        cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]').click();
        
        //clica no botão de adicionar nova etapa
        cy.get('button[ng-click="createStage()"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .scrollIntoView()
            .click();

        //adicionar novo conteúdo
        cy.contains('button', 'Novo conteúdo')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .click({ force: true });

        //seleciona o treinamento
        cy.get('[model="currentContent.course"] > .multiselect > .border > .ui-select-match > .btn-default').type('teste pix caio');
        
        cy.get('.ui-select-choices')
            .filter(':visible')
            .first()
            .within(() => {
                cy.contains('.ui-select-choices-row-inner', 'teste pix caio')
                .scrollIntoView()
                .click();
            });

        cy.get('.start > .btn-swipe-accent > ng-transclude > .ng-binding').click();

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
        cy.get('.title-bar > .btn-icon',{timeout:10000})
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

        //seleciona etapas
        cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]').click();
        
        //clica no botão de adicionar nova etapa
        cy.get('button[ng-click="createStage()"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .scrollIntoView()
            .click();

        //adicionar novo conteúdo
        cy.contains('button', 'Novo conteúdo')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .click({ force: true });

        //seleciona o treinamento
        cy.get('[model="currentContent.course"] > .multiselect > .border > .ui-select-match > .btn-default').type('teste pix caio');
        
        cy.get('.ui-select-choices')
            .filter(':visible')
            .first()
            .within(() => {
                cy.contains('.ui-select-choices-row-inner', 'teste pix caio')
                .click({ force: true });
            });

        cy.get('.start > .btn-swipe-accent > ng-transclude > .ng-binding').click();

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
        cy.get('.title-bar > .btn-icon',{timeout:10000})
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

        //seleciona etapas
        cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]').click();
        
        //clica no botão de adicionar nova etapa
        cy.get('button[ng-click="createStage()"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .scrollIntoView()
            .click();

        //adicionar novo conteúdo
        cy.contains('button', 'Novo conteúdo')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .click({ force: true });

        //seleciona o treinamento
        cy.get('[model="currentContent.course"] > .multiselect > .border > .ui-select-match > .btn-default').type('teste pix caio');
        
        cy.get('.ui-select-choices')
            .filter(':visible')
            .first()
            .within(() => {
                cy.contains('.ui-select-choices-row-inner', 'teste pix caio')
                .click({ force: true });
            });

        cy.get('.start > .btn-swipe-accent > ng-transclude > .ng-binding').click();

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
        cy.get('.title-bar > .btn-icon',{timeout:10000})
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

        //seleciona etapas
        cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]').click();
        
        //clica no botão de adicionar nova etapa
        cy.get('button[ng-click="createStage()"]')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .scrollIntoView()
            .click();

        //adicionar novo conteúdo
        cy.contains('button', 'Novo conteúdo')
            .filter(':visible')
            .first()
            .should('be.enabled')
            .click({ force: true });

        //seleciona o treinamento
        cy.get('[model="currentContent.course"] > .multiselect > .border > .ui-select-match > .btn-default').type('teste pix caio');
        
        cy.get('.ui-select-choices')
            .filter(':visible')
            .first()
            .within(() => {
                cy.contains('.ui-select-choices-row-inner', 'teste pix caio')
                .click({ force: true });
            });

        cy.get('.start > .btn-swipe-accent > ng-transclude > .ng-binding').click();

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

  it('Entra no perfil aluno e compra as trilhas', () => {
    
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
    });
       

      it("Minha área/Minhas compras/Cupon %", () => {
        
      //Fecha a compra
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
          expect($last.find("td.couponColumn").text()).to.contain("R$1.00");
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

    it("Apllica cupom % á vista", () => {

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

    cy.log('✅ Automaçao concluida com sucesso');

    });

  });

});
