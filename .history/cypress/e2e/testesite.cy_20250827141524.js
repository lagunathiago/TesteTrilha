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

  it('Deve realizar login com sucesso', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    // Valida se entrou na página de produtos
    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('contain', 'Products')
  })

    it('Deve adicionar um produto ao carrinho', () => {
        // Realiza login
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
    
        // Adiciona o primeiro produto ao carrinho
        cy.get('.inventory_item').first().within(() => {
        cy.get('button').click()
        })
    
        // Verifica se o ícone do carrinho mostra 1 item
        cy.get('.shopping_cart_badge').should('contain', '1')
    })

})
