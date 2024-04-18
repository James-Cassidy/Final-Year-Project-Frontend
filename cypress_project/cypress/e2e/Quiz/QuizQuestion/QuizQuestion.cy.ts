/// <reference types="cypress" />
import environment from "../../../../config/environment"

describe('Quiz Instructions Page', () => {

  describe('SQL Injection', () => {

    beforeEach(() => {
      cy.visit(environment.frontendURL)
      cy.contains('SQL Injection').click()
      cy.contains('Next').click()
      cy.contains('Start the quiz').click()
    })

    it('Should contain the page title', () => {
        cy.contains('SQL Injection')
    })

    it('Should contain the skip button', () => {
        cy.contains('Skip')
    })

    it('Should contain 4 options', () => {
        cy.get('.option').should('exist').then((buttons) => {
            if (buttons.length == 4) {
                expect(true).to.be.true
            } else {
                expect(true).to.be.false
            }
        })
    })
  })
})
