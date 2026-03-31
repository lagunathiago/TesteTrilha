/// <reference types="cypress" />

describe("Teste - Treinamentos", () => {
  beforeEach(() => {
    cy.visit("https://www.hml.lector.live/universolector/showcase/340");
    cy.contains("button", "Entrar").click();
    cy.get(
      '[style="z-index: 26;"] > :nth-child(1) > :nth-child(1) > .popup > :nth-child(1) > .ng-pristine'
    ).type("qualidade@lectortec.com.br");
    cy.get("#login_password_navbar").type("c8d593QGXOkjRjC");
    cy.get(".popup").contains("button", "Entrar").click();
  });

  it("Criando uma trilha", () => {
    //Criar trilha
    cy.get('[title="Trilhas"]').click();
    cy.get(".title-bar > .btn-icon").click(); //botão de criar trilha
    cy.wait(10000); //espera para carregar a tela de criar trilha
    /*cy.get('input[placeholder="Informe o nome"]')*/
    cy.get('[min-grade=""] > .input-number > div > .icon-pointer-up').click(); //aproveitamento

    //Etapas
    cy.get('[ui-sref="accessLink.content.trails.edit.id.version.stages"]').click(); // sessão etapas
    cy.get(".pt-20 > .flex > .btn-swipe-accent").click(); //nova etapa
    cy.get('[colspan="5"] > .btn-swipe-accent').click(); //novo conteúdo
    //TEM QUE CLICAR PRA ELE ESCREVER O NOME
    cy.get('[model="currentContent.course"] > .multiselect > .border > .ui-select-search').type("teste"); //digitar nome do documento
    cy.wait(10000); //espera para carregar o documento
    cy.get(".start > .btn-swipe-accent").click(); //adicionar documento

    //Criar turma
    cy.get(".tabs > .ng-scope").click(); //selecionar turma
    cy.get(".gap > .btn-swipe-accent").click(); //botão de criar turma
    cy.wait(10000); //espera para carregar a tela de criar turma
    //ESCREVER O NOME DA TURMA
    cy.get(".class-price > :nth-child(1) > .icon-checkbox").click(); //selecionar turma gratuita
    cy.get(".column > :nth-child(1) > .icon-checkbox").click(); //aprovação do gestor
    cy.get(".editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent").click(); //salvar turma
    cy.get(".content-box-footer > .flex > .btn-swipe-accent").click(); //salvar trilha
    cy.get('[ng-show="modal.saveTrailVersion"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar a opção de salvar versão
    cy.get('[ng-show="modal.saveTrailVersion"] > .modal > .end > .ml-10').click(); //clicar no botão de salvar
  });
});
