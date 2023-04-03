/* eslint-disable no-undef */
describe('User Logout', () => {
  it('passes', () => {
    cy.login("test@test.fr", "Test123$")
    cy.visit('/')
    cy.get('a').get('li[id="logout"]').click()

    cy.get('li[id="logout"]').should('not.exist')
  })
})