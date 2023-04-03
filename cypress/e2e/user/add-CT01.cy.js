/* eslint-disable no-undef */
describe('User add', () => {
  it('passes', () => {
    cy.visit('/register')

    //génère un email aléatoire
    const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, r) => ('x' == c ? (r = Math.random() * 16 | 0) : (r & 0x3 | 0x8)).toString(16))

    cy.get('input[id="email"]').type(uuid() + "@email.com")

    cy.get('input[id="password"]').type("Test123$")

    cy.get('input[id="password2"]').type("Test123$")

    cy.get('button[id="submit"]').click()

    cy.get('li[id="logout"]').should('contain', 'Logout')


  })
})