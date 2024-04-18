/// <reference types="cypress" />
import { ADMIN_LOGIN, SCREEN_SIZE } from "../../../config/constants.cy"
import environment from "../../../config/environment"

const usernameInputId = '#username-input'
const passwordInputId = '#password-input'
const submitButtonId = '#admin-login-submit-button'
const adminMenuTextareaId = '#admin-menu-json-editor'
const scenarioSelectDropDownId = '#scenario-select'
const confirmationInputId = '#confirmation-input'

describe('Admin Login page', () => {
    beforeEach(()=> {
        cy.visit(environment.frontendURL)
        cy.viewport(SCREEN_SIZE.width, SCREEN_SIZE.height)
        cy.contains('Admin Login').click()
        cy.get(usernameInputId).type(ADMIN_LOGIN.email)
        cy.get(passwordInputId).type(ADMIN_LOGIN.password)
        cy.get(submitButtonId).click()
        cy.get('#delete-scenario').click()
    })

    describe('Verify popup contents', () => {
        it('Should contain the popup title', () => {
            cy.contains('Delete Scenario')
        })

        it('Should contain a prompt for the user to use the dropdown to select a scenario', () => {
            cy.contains('Enter the title of the scenario which you want to delete.*')
        })

        it('Should contain the drop down options', () => {
            cy.get(scenarioSelectDropDownId)
        })

        it('Should contain the confirmation text input', () => {
            cy.get(confirmationInputId)
        })

        it('Should contain prompt to enter the confirmation text', () => {
            cy.contains('To confirm enter permanently delete into the below text box.')
        })

        it('Should contain the permanently delete warning', () => {
            cy.contains('*Deleting is permenant and cannot be undone')
        })

        it('Should contain the proceed button', () => {
            cy.contains('Proceed')
        })

        it('Should contain back button', () => {
            cy.contains('Back')
        })
    })

    describe('Validate proceed validation', () => {
        it('Proceed button should be disabled if Select is empty and confirmation check is empty', () => {
            cy.contains('Proceed').should('be.disabled')
        })

        it('Proceed should be disabled if the select is not empty but the confirmation check is empty', () => {
            cy.get(scenarioSelectDropDownId).select('SQL Injection')
            cy.contains('Proceed').should('be.disabled')
        })

        it('Proceed should be disabled if the select is empty but the confirmation check has been entered', () => {
            cy.get(confirmationInputId).type('Permanently Delete')
            cy.contains('Proceed').should('be.disabled')
        })

        it('Proceed should be enabled if the select is not empty and the confirmation check has been entered', () => {
            cy.get(scenarioSelectDropDownId).select('SQL Injection')
            cy.get(confirmationInputId).type('permanently delete')
            cy.contains('Proceed').should('be.enabled')
        })
    })

    describe('Navigation Tests', () => {
        it('Should bring the user back to the admin menu', () => {
            cy.contains('Back').click()
        })
    })
})