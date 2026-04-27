// URL base usada no login do ambiente de homologação.
const BASE_URL = 'https://www.hml.lector.live/esmp/subscribe/login';

// Define o tamanho da tela para padronizar a execução do teste.
const VIEWPORT = { width: 1920, height: 1080 };

// Tempo padrão de espera para localizar elementos na tela.
const DEFAULT_TIMEOUT = 60000;

// Espera curta usada após ações rápidas de processamento da interface.
const SHORT_WAIT = 1000;

// Espera maior usada após salvar, para dar tempo do sistema concluir a ação.
const SAVE_WAIT = 4000;

// Credenciais usadas no login.
const LOGIN = {
  // E-mail do usuário de teste.
  email: 'qualidade@lectortec.com.br',
  // Senha do usuário de teste.
  password: 'c8d593QGXOkjRjC',
};

// Usuários fixos usados no fluxo.
const USERS = {
  // Usuário aprovador que será adicionado nos cenários que exigem aprovação.
  approver: 'Thiago Laguna',
};

// Dados do treinamento que será pesquisado e vinculado à trilha.
const TRAINING = {
  // Texto digitado na busca do treinamento.
  searchTerm: 'teste',
  // Linha específica da opção encontrada no componente de seleção.
  optionRow: '#ui-select-choices-row-39-0',
};

// Código padrão usado para as trilhas criadas no teste.
const TRAIL_CODE = '012025';

// Nome padrão usado para a turma criada dentro da trilha.
const DEFAULT_CLASS_NAME = 'Turma teste';

// Preço padrão usado nos cenários pagos.
const DEFAULT_PRICE = '3.91';

// Campos personalizados usados nos cenários que exigem aprovação de campo.
const CUSTOM_FIELDS = {
  // Campo personalizado chamado NOVO.
  novo: 'NOVO',
  // Campo personalizado específico usado no cenário gratuito com gestor + campos.
  campo0412: 'campo 04.12',
  // Segundo campo personalizado do mesmo cenário.
  teste09122025: 'teste 09/12/2025 campo',
  // Campo usado no cenário pago com aprovação de campos.
  campoTexto1301: 'campo texto 13/01',
  // Campo usado no cenário pago com gestor + campos.
  campo05012026: 'campo 05/01/2026 capo caopo',
};

// Lista de erros conhecidos do front que não devem derrubar o teste.
const ignoredExceptions = [
  'Cannot read properties of null',
  'Cannot read properties of undefined',
  "reading 'then'",
  'charAt',
  'writeText',
  'Clipboard',
  'renderCertificateClick is not a function',
];

// Escuta erros não tratados do navegador durante a execução do Cypress.
Cypress.on('uncaught:exception', (err) => {
  // Captura a mensagem do erro; se vier vazia, usa string vazia para evitar quebra.
  const message = err.message || '';

  // Verifica se a mensagem do erro contém algum dos erros já conhecidos.
  if (ignoredExceptions.some((exception) => message.includes(exception))) {
    // Retornar false diz ao Cypress para ignorar esse erro e continuar o teste.
    return false;
  }
});

// Centraliza todos os seletores em um único objeto para facilitar manutenção.
const selectors = {
  // Menu lateral de Trilhas.
  menuTrails: '[title="Trilhas"] > .sideitem',
  // Botão para adicionar uma nova trilha.
  addTrailButton: '.title-bar > .btn-icon',
  // Campo de nome da trilha.
  trailNameInput: 'input[placeholder="Informe o nome"]',
  // Campo do código externo da trilha.
  trailCodeInput: 'input[ng-model="currentTrail.externalId"]',
  // Aba de etapas.
  stagesTab: '[ui-sref="accessLink.content.trails.edit.id.version.stages"]',
  // Botão de criar etapa.
  createStageButton: 'button[ng-click="createStage()"]',
  // Botão para adicionar conteúdo na etapa.
  addContentButton: '[colspan="6"] > .btn-swipe-accent',
  // Campo de seleção do treinamento.
  trainingSelect: '[model="currentContent.course"] > .multiselect > .border > .ui-select-match > .btn-default',
  // Botão para confirmar o treinamento escolhido.
  confirmTrainingButton: '.start > .btn-swipe-accent > ng-transclude > .ng-binding',
  // Aba de turmas.
  classesTab: '[trails=""] > .tabs > .ng-scope',
  // Botão para adicionar turma.
  addClassButton: '.gap > .btn-swipe-accent',
  // Campo de nome da turma.
  classNameInput: 'input[placeholder="Informe um nome para a turma"]',
  // Checkbox de gratuidade.
  freeCheckbox: '.class-price > :nth-child(1) > .icon-checkbox',
  // Checkbox para ativar aprovação do gestor.
  approvalCheckbox: '.column > :nth-child(1) > .icon-checkbox',
  // Botão de próximo nas etapas do wizard.
  nextButton: '.navigation-controls > .ml-20',
  // Campo de busca do aprovador.
  approverSelect: '[ng-show="step == 2"] > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default',
  // Seletor genérico de botão, usado junto com contains para achar o botão Adicionar.
  addUserButton: 'button',
  // Botão de remover aprovação existente.
  deletePermissionButton: 'tr.ng-scope > :nth-child(4) > .middle > .btn',
  // Botão para salvar a turma.
  classSaveButton: '.editing-class > :nth-child(1) > .content-box-footer > .btn-swipe-accent',
  // Botão para salvar a trilha.
  trailSaveButton: '.content-box-footer > .flex > .btn-swipe-accent',
  // Campo de preço da turma.
  currentClassPrice: '#currentClassPrice',
  // Bolinha / aba de campos personalizados.
  customFieldsDot: ':nth-child(6) > .dot',
  // Checkbox que ativa requer aprovação para os campos.
  customFieldApprovalCheckbox: '.mb-20.ng-scope > .checkbox > .icon-checkbox',
  // Campo de seleção de campo personalizado.
  customFieldSelect: '.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',
  // Botão para adicionar o campo personalizado selecionado.
  addCustomFieldButton: '.flex > .middle > .btn-swipe-accent',
};

// Função utilitária para clicar no primeiro elemento visível de um seletor.
function clickVisible(selector, options = {}) {
  // Busca o elemento usando o timeout padrão.
  cy.get(selector, { timeout: DEFAULT_TIMEOUT })
    // Mantém apenas elementos visíveis.
    .filter(':visible')
    // Usa o primeiro elemento visível encontrado.
    .first()
    // Garante que o elemento realmente está visível.
    .should('be.visible')
    // Executa o clique forçado, além de aceitar opções extras.
    .click({ force: true, ...options });
}

// Função utilitária para digitar no primeiro campo visível de um seletor.
function typeVisible(selector, value, options = {}) {
  // Busca o campo.
  cy.get(selector, { timeout: DEFAULT_TIMEOUT })
    // Mantém apenas os campos visíveis.
    .filter(':visible')
    // Usa o primeiro campo visível.
    .first()
    // Valida se o campo está visível.
    .should('be.visible')
    // Valida se o campo está habilitado.
    .should('be.enabled')
    // Leva o campo para a área visível da tela.
    .scrollIntoView()
    // Clica no campo para garantir foco.
    .click({ force: true })
    // Reforça o foco.
    .focus()
    // Limpa o valor anterior.
    .clear({ force: true })
    // Digita o novo valor com delay padrão e aceita opções adicionais.
    .type(value, { force: true, delay: 30, ...options })
    // Sai do campo para disparar eventos de blur, se existirem.
    .blur();
}

// Função para validar se um campo ficou com o valor esperado.
function assertVisibleValue(selector, value) {
  // Busca o campo.
  cy.get(selector, { timeout: DEFAULT_TIMEOUT })
    // Mantém apenas o visível.
    .filter(':visible')
    // Usa o primeiro.
    .first()
    // Valida o valor final.
    .should('have.value', value);
}

// Função para clicar no botão Próximo várias vezes.
function clickNext(times = 1) {
  // Percorre a quantidade de vezes informada.
  for (let index = 0; index < times; index += 1) {
    // Clica no botão próximo.
    clickVisible(selectors.nextButton);
  }
}

// Função responsável por fazer login no sistema.
function login() {
  // Define a resolução da tela do navegador.
  cy.viewport(VIEWPORT.width, VIEWPORT.height);

  // Acessa a URL de login.
  cy.visit(BASE_URL);

  // Localiza e clica no botão Entrar da tela inicial.
  cy.contains('button', 'Entrar', { timeout: DEFAULT_TIMEOUT })
    .should('be.visible')
    .click();

  // Preenche o e-mail.
  cy.get('form.ng-pristine > [type="text"]', { timeout: DEFAULT_TIMEOUT })
    .should('be.visible')
    .type(LOGIN.email);

  // Preenche a senha.
  cy.get('ng-transclude > .border', { timeout: DEFAULT_TIMEOUT })
    .should('be.visible')
    .type(LOGIN.password);

  // Clica no botão final de login.
  cy.get('#btn-entrar', { timeout: DEFAULT_TIMEOUT })
    .should('be.visible')
    .click();

  // Valida que a URL mudou e saiu da página de login.
  cy.url({ timeout: DEFAULT_TIMEOUT }).should('not.include', '/subscribe/login');
}

// Função para abrir o menu Trilhas e entrar em uma categoria específica.
function openCategory(categoryName) {
  // Clica no menu lateral de Trilhas.
  clickVisible(selectors.menuTrails);

  // Procura a categoria pelo nome e clica nela.
  cy.contains('li.list-group-item', categoryName, { timeout: DEFAULT_TIMEOUT })
    .should('be.visible')
    .click({ force: true });
}

// Função que inicia o cadastro de uma nova trilha.
function startTrailCreation(trailName) {
  // Clica em adicionar nova trilha.
  clickVisible(selectors.addTrailButton);

  // Preenche o nome da trilha.
  typeVisible(selectors.trailNameInput, trailName, { delay: 50 });

  // Valida que o nome foi preenchido corretamente.
  assertVisibleValue(selectors.trailNameInput, trailName);

  // Preenche o código da trilha.
  typeVisible(selectors.trailCodeInput, TRAIL_CODE);

  // Valida que o código foi preenchido corretamente.
  assertVisibleValue(selectors.trailCodeInput, TRAIL_CODE);
}

// Função que adiciona etapa e vincula um treinamento à trilha.
function addStageAndTraining() {
  // Abre a aba de etapas.
  clickVisible(selectors.stagesTab);

  // Cria uma nova etapa.
  clickVisible(selectors.createStageButton);

  // Clica para adicionar conteúdo na etapa.
  clickVisible(selectors.addContentButton);

  // Digita o termo de busca do treinamento.
  cy.get(selectors.trainingSelect, { timeout: DEFAULT_TIMEOUT })
    .should('be.visible')
    .type(TRAINING.searchTerm);

  // Seleciona a opção encontrada.
  clickVisible(TRAINING.optionRow);

  // Confirma o treinamento adicionado.
  clickVisible(selectors.confirmTrainingButton);
}

// Função que abre a criação de turma dentro da trilha.
function openClassCreation() {
  // Acessa a aba de turmas.
  clickVisible(selectors.classesTab);

  // Clica no botão para criar nova turma.
  clickVisible(selectors.addClassButton);
}

// Função para preencher o nome da turma.
function fillClassName(className = DEFAULT_CLASS_NAME) {
  // Digita o nome da turma.
  typeVisible(selectors.classNameInput, className, { delay: 50 });

  // Valida que o nome foi preenchido corretamente.
  assertVisibleValue(selectors.classNameInput, className);
}

// Função para marcar a turma como gratuita.
function markAsFree() {
  // Clica no checkbox de gratuidade.
  clickVisible(selectors.freeCheckbox);
}

// Função para ativar aprovação por gestor.
function enableManagerApproval() {
  // Clica no checkbox de aprovação.
  clickVisible(selectors.approvalCheckbox);
}

// Função para preencher o preço da turma nos cenários pagos.
function fillPrice(price = DEFAULT_PRICE) {
  // Busca o campo de preço.
  cy.get(selectors.currentClassPrice, { timeout: DEFAULT_TIMEOUT })
    // Garante visibilidade.
    .should('be.visible')
    // Garante que não está desabilitado.
    .and('not.be.disabled')
    // Rola até o campo.
    .scrollIntoView()
    // Clica no campo.
    .click({ force: true })
    // Dá foco.
    .focus()
    // Limpa o valor anterior.
    .clear({ force: true })
    // Digita o preço informado.
    .type(price, { delay: 50, force: true })
    // Sai do campo.
    .blur();
}

// Função para ativar a opção "Deixar em branco" pelo clique simples no texto/label.
function enableLeaveBlankSimple() {
  // Procura o texto Deixar em branco visível.
  cy.contains('label, span, div', 'Deixar em branco', { timeout: DEFAULT_TIMEOUT })
    .filter(':visible')
    .first()
    .click({ force: true });
}

// Função para ativar a opção "Deixar em branco" navegando até o checkbox real.
function enableLeaveBlankByCheckbox() {
  // Procura o texto Deixar em branco na interface.
  cy.contains('label, span, div', 'Deixar em branco', { timeout: DEFAULT_TIMEOUT })
    .filter(':visible')
    .first()
    // Sobe na hierarquia até encontrar um contêiner maior.
    .parentsUntil('form, .modal, .panel, .row')
    .parent()
    // Busca o checkbox real dentro desse bloco.
    .find('input[type="checkbox"]')
    .first()
    // Clica no checkbox.
    .click({ force: true });
}

// Função para adicionar um aprovador.
function addApprover(userName = USERS.approver, removeExisting = false) {
  // Avança duas etapas até a tela de permissões.
  clickNext(2);

  // Se o cenário exigir, remove uma permissão existente antes de adicionar outra.
  if (removeExisting) {
    clickVisible(selectors.deletePermissionButton);
  }

  // Digita o nome do aprovador no seletor.
  cy.get(selectors.approverSelect, { timeout: DEFAULT_TIMEOUT })
    .should('be.visible')
    .type(userName);

  // Seleciona a opção do aprovador na lista.
  cy.contains('.ui-select-choices-row', userName, { timeout: DEFAULT_TIMEOUT })
    .first()
    .click();

  // Clica no botão Adicionar.
  cy.contains(selectors.addUserButton, 'Adicionar', { timeout: DEFAULT_TIMEOUT })
    .should('be.visible')
    .click();

  // Aguarda o front processar a inclusão.
  cy.wait(SHORT_WAIT);
}

// Função que avança até a etapa de campos personalizados.
function openCustomFieldsStep() {
  // Avança três vezes até chegar na etapa correta.
  clickNext(3);
}

// Função que ativa a aprovação dos campos personalizados.
function enableCustomFieldApproval() {
  // Clica na bolinha/aba de campos personalizados.
  clickVisible(selectors.customFieldsDot);

  // Ativa a opção de requer aprovação.
  clickVisible(selectors.customFieldApprovalCheckbox);
}

// Função que adiciona um campo personalizado específico.
function addCustomField(fieldName) {
  // Abre o seletor de campos personalizados.
  clickVisible(selectors.customFieldSelect);

  // Procura e seleciona o campo desejado.
  cy.contains('.ui-select-choices-row span.ng-binding', fieldName, { timeout: DEFAULT_TIMEOUT })
    .scrollIntoView()
    .should('be.visible')
    .click();

  // Clica no botão para adicionar o campo à configuração.
  clickVisible(selectors.addCustomFieldButton);
}

// Função que salva a turma e depois salva a trilha.
function saveClassAndTrail() {
  // Salva primeiro a turma em edição.
  clickVisible(selectors.classSaveButton);

  // Depois salva a trilha.
  clickVisible(selectors.trailSaveButton);

  // Aguarda a persistência dos dados na tela.
  cy.wait(SAVE_WAIT);
}

// Função principal que monta a trilha conforme o cenário informado.
function createTrail({
  trailName,
  isFree = true,
  hasManagerApproval = false,
  managerApprovalRemovesExisting = false,
  usesLeaveBlankSimple = false,
  usesLeaveBlankCheckbox = false,
  customFields = [],
}) {
  // Inicia a criação da trilha e preenche os dados iniciais.
  startTrailCreation(trailName);

  // Adiciona etapa e treinamento.
  addStageAndTraining();

  // Abre a criação da turma.
  openClassCreation();

  // Preenche nome da turma.
  fillClassName();

  // Se for gratuito, marca gratuidade.
  if (isFree) {
    markAsFree();
  } else {
    // Se for pago, preenche preço.
    fillPrice();

    // Ativa a opção Deixar em branco pela forma simples, quando necessário.
    if (usesLeaveBlankSimple) {
      enableLeaveBlankSimple();
    }

    // Ativa a opção Deixar em branco clicando no checkbox real, quando necessário.
    if (usesLeaveBlankCheckbox) {
      enableLeaveBlankByCheckbox();
    }
  }

  // Ativa aprovação do gestor, se o cenário pedir.
  if (hasManagerApproval) {
    enableManagerApproval();
  }

  // Define se precisa configurar aprovador.
  const shouldConfigureApprover = hasManagerApproval || customFields.length > 0;

  // Se precisar aprovador, adiciona o usuário configurado.
  if (shouldConfigureApprover) {
    addApprover(USERS.approver, managerApprovalRemovesExisting);
  }

  // Se houver campos personalizados, avança até a etapa deles e adiciona um por um.
  if (customFields.length > 0) {
    openCustomFieldsStep();
    enableCustomFieldApproval();
    customFields.forEach(addCustomField);
  }

  // Salva turma e trilha no final do fluxo.
  saveClassAndTrail();
}

// Início da suíte de testes principal.
describe('Teste - Login', () => {
  // Executa uma vez antes de todos os testes do bloco.
  before(() => {
    // Faz login no sistema.
    login();
  });

  // Agrupa os cenários relacionados à categoria de trilhas.
  context('Vai até a categoria', () => {
    // Cenário para abrir a categoria desejada.
    it('Vai até a Categoria', () => {
      // Abre a categoria Teste Automação.
      openCategory('Teste Automação');
    });

    // Cenário de trilha gratuita sem aprovação.
    it('Criando uma trilha gratuita sem aprovação', () => {
      createTrail({
        // Nome da trilha do cenário.
        trailName: 'Gratuita sem aprovação - Trilha Automação',
        // Indica que a trilha é gratuita.
        isFree: true,
      });
    });

    // Cenário de trilha gratuita com aprovação de gestor.
    it('Criando uma trilha gratuita com aprovação', () => {
      createTrail({
        // Nome da trilha do cenário.
        trailName: 'Gratuita com aprovação - Trilha Automação',
        // Indica gratuidade.
        isFree: true,
        // Ativa aprovação de gestor.
        hasManagerApproval: true,
      });
    });

    // Cenário de trilha gratuita com aprovação de campos personalizados.
    it('Criando uma trilha gratuita com aprovação de campos', () => {
      createTrail({
        // Nome da trilha do cenário.
        trailName: 'Gratuita com aprovação de campos Personalizado - Trilha Automação',
        // Indica gratuidade.
        isFree: true,
        // Adiciona o campo personalizado NOVO.
        customFields: [CUSTOM_FIELDS.novo],
      });
    });

    // Cenário de trilha gratuita com aprovação de gestor e campos.
    it('Criando uma trilha gratuita com aprovação de gestor e campos', () => {
      createTrail({
        // Nome da trilha do cenário.
        trailName: 'Gratuita com aprovação de gestor e campos Personalizado - Trilha Automação',
        // Indica gratuidade.
        isFree: true,
        // Ativa aprovação de gestor.
        hasManagerApproval: true,
        // Adiciona os dois campos personalizados do cenário.
        customFields: [CUSTOM_FIELDS.campo0412, CUSTOM_FIELDS.teste09122025],
      });
    });

    // Cenário de trilha paga com aprovação de gestor.
    it('Criando uma trilha paga com aprovação', () => {
      createTrail({
        // Nome da trilha do cenário.
        trailName: 'Paga com aprovação - Trilha Automação',
        // Indica que a trilha é paga.
        isFree: false,
        // Ativa aprovação de gestor.
        hasManagerApproval: true,
        // Remove aprovação existente antes de adicionar a nova.
        managerApprovalRemovesExisting: true,
        // Marca a opção Deixar em branco pela forma simples.
        usesLeaveBlankSimple: true,
      });
    });
    // Cenário de trilha paga com aprovação de campos.
    it('Criando uma paga com aprovação de campos', () => {
      createTrail({
        // Nome da trilha do cenário.
        trailName: 'Trilha paga com aprovação de campos Personalizado - Trilha Automação',
        // Indica que a trilha é paga.
        isFree: false,
        // Marca Deixar em branco clicando diretamente no checkbox.
        usesLeaveBlankCheckbox: true,
        // Adiciona o campo personalizado do cenário.
        customFields: [CUSTOM_FIELDS.campoTexto1301],
      });
    });

    // Cenário de trilha paga com aprovação de gestor e campos personalizados.
    it('Criando uma Trilha paga com aprovação de gestor e campos personalizado', () => {
      createTrail({
        // Nome da trilha do cenário.
        trailName: 'Trilha paga com aprovação de gestor e campos Personalizado - Trilha Automação',
        // Indica que a trilha é paga.
        isFree: false,
        // Ativa aprovação de gestor.
        hasManagerApproval: true,
        // Marca Deixar em branco pela estratégia do checkbox.
        usesLeaveBlankCheckbox: true,
        // Adiciona o campo personalizado do cenário.
        customFields: [CUSTOM_FIELDS.campo05012026],

      });
    });
  });
});