/* eslint-disable no-undef */
describe('template spec', () => {
  it('passes', () => {
    cy.login("test@test.fr", "Test123$")

    //attendre 1 seconde
    cy.wait(1000)

    cy.viewport(1024, 768)

    cy.get('button[id="addshow"]').click()


    cy.get('input[id="film"]').check()
    
    cy.get('input[id="title"]').type('test')

    cy.get('textarea[id="description"]').type('test')

    cy.get('input[id="duration"]').type('test')

    cy.get('input[id="director"]').type('test')

    cy.get('input[id="cast"]').type('test')

    cy.get('input[id="country"]').type('test')

    cy.get('input[id="releasedate"]').type('test')

    cy.get('input[id="duration"]').type('test')

    cy.get('input[id="typeshow"]').type('test')

    cy.get('button[id="submit"]').click()

    

    

    

    






  })
})