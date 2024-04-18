/// <reference types="cypress" />
import environment from "../../../config/environment"

describe('Test Title Bar Menu', () => {

  beforeEach(() => {
    cy.visit(environment.frontendURL)
  })

  it('Should visit page and check the title is valid', () => {
    cy.visit(environment.frontendURL)
    cy.title().should('eq','Hack Attack')
  })

  it('Should contain a button for help', () => {
    cy.contains('Help')
  })

  it('Should contain a button for Leaderboard', () => {
    cy.contains('Leaderboard')
  })

  it('Should contain a button for settings', () => {
    cy.contains('Settings')
  })

  it('Should contain the game title in the title bar', () => {
    cy.contains('Hack Attack')
  })
})