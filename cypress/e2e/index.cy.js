describe('Bridges Home Page', () => {
  it('should load homepage', () => {
    cy.visit('https://saowapalaemmel-cyber.github.io/Bridges/')

    cy.contains('Bridges')
  })
})