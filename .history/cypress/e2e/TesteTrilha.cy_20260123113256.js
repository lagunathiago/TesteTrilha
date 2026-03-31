/// <reference types="cypress" />
import { trilhasSel as S } from '../../support/selectors/trilhas.selectors';

describe('Trilhas - Smoke', () => {
  const baseUrl = 'https://www.hml.lector.live/universolector/showcase/340'; // ajuste
  const email = 'qualidade@lectortec.com.br'; // ajuste
  const senha = '123'; // ajuste

  const trailName = `Trilha Cypress ${Date.now()}`;
  const trailNameEdit = `${trailName} - Editada`;

  beforeEach(() => {
    cy.loginPortal(baseUrl, email, senha);
  });

  it('Acessar aba Trilhas e carregar listagem', () => {
    cy.getVisible(S.menuTrilhas).clickSafe();
    cy.waitAppReady();

    // validação robusta: existir lista OU empty state
    cy.get('body').then($body => {
      const hasList = $body.find(S.itemLista).length > 0;
      if (hasList) {
        cy.get(S.itemLista).filter(':visible').should('have.length.greaterThan', 0);
      } else {
        cy.contains(':visible', 'Nenhuma trilha').should('exist'); // ajuste texto se necessário
      }
    });
  });

  it('Criar trilha mínima e validar persistência', () => {
    cy.getVisible(S.menuTrilhas).clickSafe();
    cy.waitAppReady();

    cy.getVisible(S.btnCriar).clickSafe();
    cy.waitAppReady();

    cy.getVisible(S.inputNome).typeSafe(trailName);

    // salvar (ajuste seletor real do botão)
    cy.contains('button:visible', 'Salvar').clickSafe();

    // valida toast se existir
    cy.get('body').then($body => {
      if ($body.find(S.toast).length) cy.assertToast('sucesso'); // ajuste mensagem
    });

    // voltar/listar e buscar o item criado
    cy.getVisible(S.menuTrilhas).clickSafe();
    cy.waitAppReady();

    cy.get('body').then($body => {
      if ($body.find(S.campoBusca).length) {
        cy.getVisible(S.campoBusca).typeSafe(trailName);
      }
    });

    cy.contains(S.itemLista + ':visible, *:visible', trailName).should('exist');
  });

  it('Editar trilha e validar persistência', () => {
    cy.getVisible(S.menuTrilhas).clickSafe();
    cy.waitAppReady();

    // encontra item e abre edição (ajustar conforme seu DOM real)
    cy.contains(S.itemLista + ':visible, *:visible', trailName)
      .parents(S.itemLista).first()
      .within(() => {
        cy.get('body').then($b => {
          if ($b.find(S.btnEditarItem).length) {
            cy.get(S.btnEditarItem).filter(':visible').first().clickSafe();
          } else {
            // fallback: clicar no card/título para abrir
            cy.contains(':visible', trailName).clickSafe();
          }
        });
      });

    cy.waitAppReady();

    cy.getVisible(S.inputNome).typeSafe(trailNameEdit);
    cy.contains('button:visible', 'Salvar').clickSafe();

    cy.getVisible(S.menuTrilhas).clickSafe();
    cy.waitAppReady();

    cy.contains(S.itemLista + ':visible, *:visible', trailNameEdit).should('exist');
  });
});
