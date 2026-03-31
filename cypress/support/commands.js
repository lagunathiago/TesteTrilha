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
Cypress.Commands.add('waitAppReady', () => {
  // Loader do shell
  cy.get('[splash-loading]', { timeout: 60000 }).should('not.be.visible');

  // Conteúdo principal renderizado
  cy.get('[page-content]', { timeout: 60000 }).should('be.visible');
  cy.get('[page-content] [ui-view]', { timeout: 60000 }).should('exist');
});

Cypress.Commands.add('getVisible', (selector) => {
  return cy.get(selector).filter(':visible').first();
});

Cypress.Commands.add('clickSafe', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject)
    .should('be.visible')
    .scrollIntoView()
    .click({ force: true });
});

Cypress.Commands.add('typeSafe', { prevSubject: 'element' }, (subject, text) => {
  cy.wrap(subject)
    .should('be.visible')
    .should('not.be.disabled')
    .scrollIntoView()
    .focus()
    .clear({ force: true })
    .type(text, { delay: 10, force: true })
    .should('have.value', text);
});

Cypress.Commands.add('assertToastContains', (text) => {
  cy.get('lector-toast', { timeout: 20000 })
    .should('be.visible')
    .contains(text);
});
