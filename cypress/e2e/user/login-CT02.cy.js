describe('User Login test', () => {
  it('passes', () => {
    cy.login("test@test.fr", "Test123$")
    cy.visit('/')
    cy.get('li[id="logout"]').should('contain', 'Logout')

  })
})