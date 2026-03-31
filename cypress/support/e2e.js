// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
Cypress.on('uncaught:exception', (err) => {
  // Ignora erro conhecido da aplicação
  if (err.message?.includes("Cannot read properties of null (reading 'remove')")) {
    return false
  }

  // Mantém seu filtro atual
  if (err.message?.includes('unselectable')) {
    return false
  }

  // Qualquer outro erro continua falhando o teste (o ideal)
})