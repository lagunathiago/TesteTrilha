describe('Teste de Login - SauceDemo', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

    it('Não deve logar com senha incorreta', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('senha_errada')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Username and password do not match')
  })

    describe('Fluxo de Compra - SauceDemo', () => {
  beforeEach(() => {
    // Faz login antes de cada teste
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')
  })

  it('Deve adicionar um produto ao carrinho e finalizar a compra', () => {
    // Adiciona o primeiro item
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    
    // Valida que o ícone do carrinho mostra 1 item
    cy.get('.shopping_cart_badge').should('contain', '1')

    // Vai até o carrinho
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack')

    // Inicia checkout
    cy.get('[data-test="checkout"]').click()
    cy.url().should('include', '/checkout-step-one.html')

    // Preenche dados
    cy.get('[data-test="firstName"]').type('Mika')
    cy.get('[data-test="lastName"]').type('Tester')
    cy.get('[data-test="postalCode"]').type('89000-000')
    cy.get('[data-test="continue"]').click()

    // Confirma resumo da compra
    cy.url().should('include', '/checkout-step-two.html')
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack')

    // Finaliza
    cy.get('[data-test="finish"]').click()
    cy.url().should('include', '/checkout-complete.html')
    cy.get('.complete-header').should('contain', 'Thank you for your order!')
  })
})


})
