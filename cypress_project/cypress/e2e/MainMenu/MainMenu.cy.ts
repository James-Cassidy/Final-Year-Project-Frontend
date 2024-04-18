/// <reference types="cypress" />
import environment from "../../../config/environment"

describe('Test Main Menu', () => {

  beforeEach(() => {
    cy.visit(environment.frontendURL)
  })

  it('Should visit page and check the title is valid', () => {
    cy.visit(environment.frontendURL)
    cy.title().should('eq','Hack Attack')
  })

  it('Should contain button for SQL Injection', () => {
    cy.contains("SQL Injection")
  })

  it('Should contain button for Buffer Overflow', () => {
    cy.contains("Buffer Overflow")
  })

  it('Should contain button for DDOS Attacks', () => {
    cy.contains("Distributed Denial of Service")
  })

  it('Should contain button for Cross Site Scripting', () => {
    cy.contains("Cross Site Scripting")
  })

  it('Should contain the game title in the title bar', () => {
    cy.contains('Hack Attack')
  })
})