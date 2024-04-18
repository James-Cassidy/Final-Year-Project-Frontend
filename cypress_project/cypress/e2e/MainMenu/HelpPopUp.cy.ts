/// <reference types="cypress" />
import environment from "../../../config/environment"

describe('Test Help Pop Up', () => {

  beforeEach(() => {
    cy.visit(environment.frontendURL)
    cy.contains('Help').click()
  })

  it('Should contain the Help title', () => {
    cy.contains('Help')
  })

  it('Should containg message to help the user understand how to use the page', () => {
    cy.contains("To pick a game scenario, select one of the options on the home page.")
    cy.contains("Current Scenario options are:")
    cy.contains("SQL Injection")
    cy.contains("Distributed Denial of Service")
    cy.contains("Buffer Overflow")
    cy.contains("To change your settings, click the Settings button on the navigation bar at the top of the screen")
    cy.contains("To view how other players have done, view the leaderboards, by clicking the Leaderboard button at the top of the screen.")
    cy.contains('To close pop ups, click the "Back" button at the bottom of the pop up.')
  })

  it('Should contain the Back button to close the pop-up', () => {
    cy.contains('Back')
  })

  it('Should click the Back button and check that the pop-up is closed', () => {
    cy.get('#pop-up-close-button').click()

    cy.get('popup').should('not.exist')
  })
})