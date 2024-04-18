/// <reference types="cypress" />
import { ADMIN_LOGIN, SCREEN_SIZE } from "../../../config/constants.cy"
import environment from "../../../config/environment"

const usernameInputId = '#username-input'
const passwordInputId = '#password-input'
const submitButtonId = '#admin-login-submit-button'
const selectId = '#scenario-select'

describe('Admin Login page', () => {
    beforeEach(()=> {
        cy.visit(environment.frontendURL)
        cy.viewport(SCREEN_SIZE.width, SCREEN_SIZE.height)
        cy.contains('Admin Login').click()
        cy.get(usernameInputId).type(ADMIN_LOGIN.email)
        cy.get(passwordInputId).type(ADMIN_LOGIN.password)
        cy.get(submitButtonId).click()
        cy.contains('View Scenario').click()
    })

    describe('Verify popup contents', () => {
 
        it('Should contain the popup title', () => {
            cy.contains('View Scenario')
        })

        it('Should contain the title of the scenario which you want to load', () => {
            cy.contains('Select the title of the scenario which you want to load.')
        })

        it('Should contain the dropdown', () => {
            cy.get(selectId)
        })
    })

    describe('Verify validation', () => {
        it('Proceed button should be disabled until a scenario is selected', () => {
            cy.contains('Proceed').should('be.disabled')
        })

        it('Proceed button should be disabled until a scenario is selected', () => {
            cy.get(selectId).select('SQL Injection')
            cy.contains('Proceed').should('be.enabled')
        })
    })

    describe('Verify the navigation', () => {
        it('should navigate the user back to the admin menu', () => {
            cy.contains('Back').click()
            cy.contains('Delete a Scenario')
        })
    })
})