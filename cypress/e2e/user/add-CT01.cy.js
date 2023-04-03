/* eslint-disable no-undef */
describe('User add', () => {
  it('passes', () => {
    cy.visit('/register')

    cy.get('input[id="email"]').type("email2@email.com")

    cy.get('input[id="password"]').type("Test123$")

    cy.get('input[id="password2"]').type("Test123$")

    cy.get('button[id="submit"]').click()

    cy.get('li[id="logout"]').should('contain', 'Logout')


  })
})