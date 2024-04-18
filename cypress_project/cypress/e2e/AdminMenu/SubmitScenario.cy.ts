/// <reference types="cypress" />
import { ADMIN_LOGIN, SCREEN_SIZE } from "../../../config/constants.cy"
import environment from "../../../config/environment"

const usernameInputId = '#username-input'
const passwordInputId = '#password-input'
const submitButtonId = '#admin-login-submit-button'
const adminMenuTextareaId = '#admin-menu-json-editor'
const submitInputId = '#input-submit-check'

describe('Submit Scenario Pop Up', () => {
    beforeEach(()=> {
        cy.visit(environment.frontendURL)
        cy.viewport(SCREEN_SIZE.width, SCREEN_SIZE.height)
        cy.contains('Admin Login').click()
        cy.get(usernameInputId).type(ADMIN_LOGIN.email)
        cy.get(passwordInputId).type(ADMIN_LOGIN.password)
        cy.get(submitButtonId).click()
        cy.get(adminMenuTextareaId).type('{}')
        cy.contains('Valid JSON')
        cy.contains('Submit Scenario').click()
    })

    describe('Verify page content', () => {

        it('Should contain delete a scenario button', () => {
            cy.contains('Delete a Scenario')
        })

        it('should contain prompt for the user about submitting', () => {
            cy.contains('Submitting the updated scenario will over-write any existing questions.')
        })

        it('should contain a prompt to confirm the scenario', () => {
            cy.contains('Enter confirm to confirm you want to update the scenario.')
        })

        it('should contain the check input', () => {
            cy.get(submitInputId)
        })

    })

    describe('Verify validation', () => {
        it('Proceed button should be disabled until a scenario is selected', () => {
            cy.contains('Proceed').should('be.disabled')
        })

        it('Proceed button should be disabled until a scenario is selected', () => {
            cy.get(submitInputId).type('confirm')
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