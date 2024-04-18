/// <reference types="cypress" />
import environment from "../../../config/environment"

describe('Test Settings Pop Up', () => {

    beforeEach(() => {
      cy.visit(environment.frontendURL)
      cy.contains('Settings').click()
    })
  
    it('Should contain the Settings title', () => {
      cy.contains('Settings')
    })

    it('Should contain High Contrast Mode', () => {
      cy.contains("High Contrast Mode")
    })

    it('Should contain Dark Mode', () => {
      cy.contains("Dark Mode")
    })
  
    it('Should contain the Back button to close the pop-up', () => {
      cy.contains('Back')
    })
  
    it('Should click the Back button and check that the pop-up is closed', () => {
      cy.contains('Back').click()
  
      cy.get('popup').should('not.exist')
    })
  })