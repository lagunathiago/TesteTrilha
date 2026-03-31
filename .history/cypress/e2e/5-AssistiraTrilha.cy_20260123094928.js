// cypress/support/commands.js

Cypress.Commands.add('loginShowcase', (url, email, senha) => {
  cy.visit(url);

  cy.contains('button', 'Entrar')
    .filter(':visible')
    .first()
    .click();

  // Escopo no popup (mais estável que o seletor gigante por z-index)
  cy.get('.popup')
    .filter(':visible')
    .first()
    .within(() => {
      // Campo e-mail (pega o primeiro input visível do popup)
      cy.get('input[type="email"], input')
        .filter(':visible')
        .first()
        .should('be.enabled')
        .focus()
        .type('{selectall}{backspace}', { force: true })
        .type(email, { force: true, delay: 5 })
        .should('have.value', email);

      // Senha
      cy.get('#login_password_navbar, input[type="password"]')
        .filter(':visible')
        .first()
        .should('be.enabled')
        .focus()
        .type('{selectall}{backspace}', { force: true })
        .type(senha, { force: true, delay: 5 });

      cy.contains('button', 'Entrar')
        .filter(':visible')
        .first()
        .click();
    });

  // “Espera inteligente” mínima (ajuste se tiver um marcador melhor)
  cy.get('body', { timeout: 20000 }).should('be.visible');
});

Cypress.Commands.add('openFirstTrailCard', () => {
  cy.get('.showcase-card-container')
    .filter(':visible')
    .first()
    .should('be.visible')
    .click();
});

Cypress.Commands.add('subscribeToTrail', () => {
  cy.get('[ng-click="subscribeClass(class);"]')
    .filter(':visible')
    .first()
    .should('be.enabled')
    .click();
});

Cypress.Commands.add('accessTrail', () => {
  cy.get('.classes-actions > .btn-swipe-accent.ng-scope')
    .filter(':visible')
    .first()
    .should('be.enabled')
    .click();
});

Cypress.Commands.add('nextResource', () => {
  cy.get('#nextResourceArrow', { timeout: 20000 })
    .filter(':visible')
    .first()
    .should('be.enabled')
    .click();
});
