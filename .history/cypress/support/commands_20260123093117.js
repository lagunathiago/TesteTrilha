// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.js
import './commands'
Cypress.Commands.add('typeVisible', (selector, value) => {
  cy.get(selector)
    .filter(':visible')
    .first()
    .should('be.enabled')
    .scrollIntoView()
    .focus()
    .clear({ force: true })
    .type(value, { force: true, delay: 5 })

  cy.get(selector).filter(':visible').first().should('have.value', value)
})

Cypress.Commands.add('clickVisible', (selectorOrContains, text) => {
  if (text) {
    cy.contains(selectorOrContains, text).filter(':visible').first().click()
  } else {
    cy.get(selectorOrContains).filter(':visible').first().click()
  }
})

Cypress.Commands.add('loginShowcase', ({ url, email, senha }) => {
  cy.visit(url)

  // abre modal/login
  cy.contains('button', 'Entrar').filter(':visible').first().click()

  // Email: evite seletor por z-index. Prefira input do modal visível.
  cy.get('.popup')
    .filter(':visible')
    .first()
    .within(() => {
      // tenta por type=email; se não houver, pega o primeiro input visível do modal
      cy.get('input[type="email"], input')
        .filter(':visible')
        .first()
        .should('be.enabled')
        .focus()
        .clear({ force: true })
        .type(email, { force: true, delay: 5 })
        .should('have.value', email)

      cy.get('#login_password_navbar, input[type="password"]')
        .filter(':visible')
        .first()
        .should('be.enabled')
        .focus()
        .clear({ force: true })
        .type(senha, { force: true, delay: 5 })

      cy.contains('button', 'Entrar').filter(':visible').first().click()
    })

  // Critério mínimo de "logado": ajuste conforme sua tela (menu, botão, etc.)
  cy.get('body', { timeout: 20000 }).should('be.visible')
})

Cypress.Commands.add('subscribeAndOpenTrail', () => {
  // Abrir trilha (card)
  cy.get('.showcase-card-container')
    .filter(':visible')
    .first()
    .should('be.visible')
    .click()

  // Inscrever
  cy.get('[ng-click="subscribeClass(class);"]')
    .filter(':visible')
    .first()
    .should('be.enabled')
    .click()

  // Acessar trilha (botão de abrir)
  cy.get('.classes-actions > .btn-swipe-accent.ng-scope')
    .filter(':visible')
    .first()
    .should('be.enabled')
    .click()
})

Cypress.Commands.add('nextResource', () => {
  cy.get('#nextResourceArrow')
    .filter(':visible')
    .first()
    .should('be.enabled')
    .click()
})
