Cypress.Commands.add('addProduct', (id) => {
    cy.get(`.js-add-to-cart[data-menu-id="${id}"]`)
      .click()
})

Cypress.Commands.add('searchMenu', (keyword) => {
  cy.get('.search-bar')
    .clear()
    .type(`${keyword}{enter}`)
})

Cypress.Commands.add('selectCategory', (category) => {
  cy.contains('.category-btn', category).click()
})

Cypress.Commands.add('verifyAddedButton', (id) => {
    cy.get(`.js-add-to-cart[data-menu-id="${id}"]`)
      .should('have.class','added')
      .and('contain','Added')
})