# Automação de Testes E2E com Cypress - Lector Live

![Cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Este repositório contém suítes de testes automatizados End-to-End (E2E) para a validação de fluxos críticos da plataforma **Lector Live** (ambiente de Homologação), focando na gestão de conteúdo, criação de treinamentos complexos e trilhas de aprendizagem.

## Cenários Automatizados

O projeto cobre diversas funcionalidades administrativas e de usuário final:

### Autenticação (`login.cy.js`)
* Login com e-mail inválido (Validação de mensagem de erro).
* Login com senha inválida.
* Login com sucesso (Happy Path).

### Gestão de Treinamentos (`testedetreinamento.cy.js` & `tst_treinamento.cy.js`)
Testes abrangentes de criação e configuração de cursos:
* **Gestão de Documentos:** Criação de pastas e upload de arquivos.
* **Criação de Treinamento:**
    * Configuração básica (Nome, Datas).
    * Adição de múltiplos tipos de conteúdo: **Documentos, Gravações, Avaliações e Aulas Presenciais**.
    * Configuração de **Pesos** para os conteúdos.
    * Cadastro de Turmas (com e sem aprovação de gestor).
    * Versionamento de conteúdo.
* **Configurações Avançadas:**
    * Definição de carga horária automática.
    * Regras de Gamificação.
    * Critérios de acessibilidade e Termos de Uso.
    * Seleção de Autores.
    * Limitação de matrículas e notas de corte.

### Trilhas de Aprendizagem (`testedetrilha.cy.js`)
* Criação de novas Trilhas.
* Definição de etapas da trilha.
* Associação de conteúdos e documentos às etapas.
* Criação de turmas dentro da trilha (gratuitas e com aprovação).

### Vitrines (`vitrines.cy.js`)
* Validação de acesso e carregamento da vitrine de cursos.

## Pré-requisitos

Para executar este projeto, você precisará de:

* [Node.js](https://nodejs.org/en/) (versão 12 ou superior)
* [NPM](https://www.npmjs.com/) (geralmente instalado junto com o Node)

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/cypress-lector-tests.git](https://github.com/seu-usuario/cypress-lector-tests.git)
   cd cypress-lector-tests

## Instale as dependências:
  ```
  npm install
  # Ou se preferir usar o yarn:
  yarn install
```
## Estrutura do Projeto

```text
/
├── login.cy.js               # Testes de Login
├── testedetreinamento.cy.js  # Criação básica de cursos e pastas
├── testedetrilha.cy.js       # Fluxos de criação de Trilhas
├── tst_treinamento.cy.js     # Cenários complexos (Gamificação, Acessibilidade)
├── vitrines.cy.js            # Testes de navegação na Vitrine
└── README.md                 # Documentação
