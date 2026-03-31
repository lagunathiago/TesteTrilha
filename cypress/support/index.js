Cypress.on('uncaught:exception', (err, runnable) => {
  // Retorna "false" para evitar que o Cypress falhe nos testes por erros não tratados
  return false;
});
