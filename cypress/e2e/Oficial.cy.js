Cypress.on('uncaught:exception', (err) => {
  const msg = err.message || '';

  const errosIgnorados = [
    'Cannot read properties of null',
    'Cannot read properties of undefined',
    "reading 'then'",
    'charAt',
    'writeText',
    'Clipboard',
    'ResizeObserver loop completed with undelivered notifications',
    'renderCertificateClick is not a function',
  ];

  if (errosIgnorados.some((erro) => msg.includes(erro))) {
    return false;
  }
});

const SELECTORS = {
  menuTrilhas: '[title="Trilhas"] > .sideitem',
  botaoNovaTrilha: '.title-bar .btn-icon',
  inputNomeTrilha: 'input[placeholder="Informe o nome"]',
  inputCodigoTrilha: 'input[ng-model="currentTrail.externalId"]',
  abaEtapas: '[ui-sref="accessLink.content.trails.edit.id.version.stages"]',
  botaoNovaEtapa: '.pt-20 > .flex > .btn-swipe-accent',
  botaoNovoConteudo: '[colspan="6"] > .btn-swipe-accent',
  selectTipoConteudo: '.pv-5 > .w-100',
  opcaoDocumento: '.open > .ui-select-choices > :nth-child(3)',
  selectDocumento: '[model="currentContent.document"] > .multiselect > .border > .ui-select-match > .btn-default',
  inputPesquisaSelect: '.ui-select-search:visible',
  botaoAdicionarConteudo: '.start > .btn-swipe-accent',
  abaTurmas: '[trails=""] > .tabs > .ng-scope',
  botaoNovaTurma: '.gap > .btn-swipe-accent',
  inputNomeTurma: 'input[placeholder="Informe um nome para a turma"]',
  inputPreco: '#currentClassPrice',
  checkboxAprovacaoGestor: '.column > :nth-child(1) > .icon-checkbox',
  checkboxDeixarEmBranco: ':nth-child(2) > div.mt-20 > .middle > .checkbox > .icon-checkbox',
  botaoProximo: '.navigation-controls > .ml-20',
  botaoPermissaoUsuario: 'tr.ng-scope > :nth-child(4) > .middle > .btn',
  selectUsuario: '[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default',
  botaoSalvarTurma: '.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent',
  botaoSalvarTrilha: '.content-box-footer > .flex > .btn-swipe-accent',
  botaoEditarTrilha: 'button.btn-icon-accent.icon-edit',
  botaoClonarTurma: '.center > .icon-copy',
  checkboxGratuitoInput: 'input[ng-model="currentClass.free"]',
};

function gerarDataHora() {
  const agora = new Date();

  const data = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;

  return data;
  
}

function clicarElemento(selector, timeout = 60000) {
  cy.get(selector, { timeout })
    .scrollIntoView()
    .should('exist')
    .should('be.visible')
    .click({ force: true });
}

function preencherCampo(selector, valor, timeout = 60000) {
  cy.get(selector, { timeout })
    .filter(':visible')
    .first()
    .should('be.enabled')
    .scrollIntoView()
    .click({ force: true })
    .focus()
    .clear({ force: true })
    .type(valor, { delay: 50, force: true })
    .blur();

  cy.get(selector)
    .filter(':visible')
    .first()
    .should('have.value', valor);
}

function login() {
  cy.visit('https://hml.lector.live/esmp/subscribe/login');
  cy.viewport(1920, 1080);

  cy.contains('button', 'Entrar')
    .should('be.visible')
    .click({ force: true });

  cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
    .should('be.visible')
    .type('samos@mailto.plus');

  cy.get('ng-transclude > .border', { timeout: 60000 })
    .should('be.visible')
    .type('123');

  cy.get('#btn-entrar', { timeout: 60000 })
    .should('be.visible')
    .click();

  cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');
}

function acessarCategoriaTrilhas() {
  clicarElemento(SELECTORS.menuTrilhas);

  cy.contains('li.list-group-item', 'Teste Automação', { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });

  cy.wait(2000);
}

function iniciarNovaTrilha() {
  clicarElemento(SELECTORS.botaoNovaTrilha, 600000);
}

function preencherDadosGeraisTrilha(nomeTrilha) {
  preencherCampo(SELECTORS.inputNomeTrilha, nomeTrilha);
  preencherCampo(SELECTORS.inputCodigoTrilha, '012025');
}

function adicionarDocumentoNaEtapa() {
  clicarElemento(SELECTORS.abaEtapas);
  clicarElemento(SELECTORS.botaoNovaEtapa);
  clicarElemento(SELECTORS.botaoNovoConteudo);
  clicarElemento(SELECTORS.selectTipoConteudo);
  clicarElemento(SELECTORS.opcaoDocumento);
  clicarElemento(SELECTORS.selectDocumento);

  cy.get(SELECTORS.inputPesquisaSelect, { timeout: 60000 })
    .should('be.visible')
    .type('Minha');

  cy.contains('.ui-select-choices-row:visible', 'Minha Área - Adm.pdf', { timeout: 60000 })
    .click();

  clicarElemento(SELECTORS.botaoAdicionarConteudo);
}

function abrirAbaTurmas() {
  clicarElemento(SELECTORS.abaTurmas);
}

function criarNovaTurma(nomeTurma, config) {
  abrirAbaTurmas();
  clicarElemento(SELECTORS.botaoNovaTurma);

  preencherCampo(SELECTORS.inputNomeTurma, nomeTurma, 20000);

  if (config.gratuita) {
    marcarGratuitoSeNecessario();
  } else {
    preencherPreco(config.precoInicial || '3.91');
  }

  if (config.comAprovacao) {
    clicarElemento(SELECTORS.checkboxAprovacaoGestor);
  }

  if (!config.gratuita) {
    clicarElemento(SELECTORS.checkboxDeixarEmBranco);
  }

  avançarEtapasDaTurma();
  adicionarUsuarioAutomacao();
  salvarTurma();
}

function preencherPreco(valor) {
  cy.get(SELECTORS.inputPreco, { timeout: 60000 })
    .should('be.visible')
    .and('not.be.disabled')
    .scrollIntoView()
    .click({ force: true })
    .focus()
    .clear({ force: true })
    .type(valor, { delay: 50, force: true })
    .blur();
}

function marcarGratuitoSeNecessario() {
  cy.get(SELECTORS.checkboxGratuitoInput, { timeout: 60000 }).then(($checkbox) => {
    if (!$checkbox.is(':checked')) {
      cy.wrap($checkbox).click({ force: true });
    }
  });

  cy.get(SELECTORS.checkboxGratuitoInput).should('be.checked');
}

function avançarEtapasDaTurma() {
  clicarElemento(SELECTORS.botaoProximo);
  clicarElemento(SELECTORS.botaoProximo);
  clicarElemento(SELECTORS.botaoPermissaoUsuario);
}

function adicionarUsuarioAutomacao() {
  cy.get(SELECTORS.selectUsuario, { timeout: 60000 })
    .type('Usuario Automação');

  cy.contains('.ui-select-choices-row', 'Usuario Automação', { timeout: 60000 })
    .first()
    .click();

  cy.contains('button', 'Adicionar')
    .should('be.visible')
    .click();

  cy.wait(1000);
}

function salvarTurma() {
  clicarElemento(SELECTORS.botaoSalvarTurma);
}

function salvarTrilha() {
  clicarElemento(SELECTORS.botaoSalvarTrilha);
  cy.wait(6000);
}

function abrirTrilhaCriada(nomeTrilha) {
  cy.contains('.card-items', nomeTrilha, { timeout: 60000 })
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });

  cy.wait(4000);
}

function editarTrilha() {
  clicarElemento(SELECTORS.botaoEditarTrilha, 10000);
}

function clonarTurmaEAlterarPreco(valorEsperado) {
  abrirAbaTurmas();

  clicarElemento(SELECTORS.botaoClonarTurma);

  preencherPreco(valorEsperado);

  clicarElemento(SELECTORS.checkboxDeixarEmBranco);

  avançarEtapasDaTurma();
  adicionarUsuarioAutomacao();
  salvarTurma();

  cy.contains(valorEsperado).should('be.visible');

  salvarTrilha();
}

function criarTrilhaCompleta(config) {
  const dataHora = gerarDataHora();

  const nomeTrilha = `${config.nomeTrilha} - Automação ${dataHora}`;
  const nomeTurma = `${config.nomeTurma} ${dataHora}`;

  iniciarNovaTrilha();
  preencherDadosGeraisTrilha(nomeTrilha);
  adicionarDocumentoNaEtapa();

  criarNovaTurma(nomeTurma, {
    gratuita: config.gratuita,
    comAprovacao: config.comAprovacao,
    precoInicial: config.precoInicial,
  });

  salvarTrilha();

  abrirTrilhaCriada(nomeTrilha);
  editarTrilha();

  clonarTurmaEAlterarPreco(config.precoClone);

  cy.log(`Trilha criada com sucesso: ${nomeTrilha}`);
}

describe('Teste - Trilhas', () => {
  before(() => {
    login();
  });

  it('Vai até a Categoria', () => {
    acessarCategoriaTrilhas();
  });

  it('Criando Trilha Paga com aprovação', () => {
    criarTrilhaCompleta({
      nomeTrilha: 'Paga com aprovação',
      nomeTurma: 'Turma Teste Automação 1',
      gratuita: false,
      comAprovacao: true,
      precoInicial: '3.91',
      precoClone: '3.92',
    });
  });

  it('Criando Trilha Paga sem aprovação', () => {
    criarTrilhaCompleta({
      nomeTrilha: 'Paga sem aprovação',
      nomeTurma: 'Turma Teste 2',
      gratuita: false,
      comAprovacao: false,
      precoInicial: '3.91',
      precoClone: '3.92',
    });
  });

  it('Criando Trilha Gratuita com aprovação', () => {
    criarTrilhaCompleta({
      nomeTrilha: 'Gratuita com aprovação',
      nomeTurma: 'Turma Teste 3',
      gratuita: true,
      comAprovacao: true,
      precoClone: '3.91',
    });
  });

  it('Criando Trilha Gratuita sem aprovação', () => {
    criarTrilhaCompleta({
      nomeTrilha: 'Gratuita sem aprovação',
      nomeTurma: 'Turma Teste 4',
      gratuita: true,
      comAprovacao: false,
      precoClone: '3.91',
    });
  });
});