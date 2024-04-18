/// <reference types="cypress" />
import { ADMIN_LOGIN, SCREEN_SIZE } from "../../../config/constants.cy"
import environment from "../../../config/environment"

const usernameInputId = '#username-input'
const passwordInputId = '#password-input'
const submitButtonId = '#admin-login-submit-button'
const adminMenuTextareaId = '#admin-menu-json-editor'

describe('Admin Login page', () => {
    beforeEach(()=> {
        cy.visit(environment.frontendURL)
        cy.viewport(SCREEN_SIZE.width, SCREEN_SIZE.height)
        cy.contains('Admin Login').click()
        cy.get(usernameInputId).type(ADMIN_LOGIN.email)
        cy.get(passwordInputId).type(ADMIN_LOGIN.password)
        cy.get(submitButtonId).click()
    })

    describe('Verify page content', () => {

        it('Should contain delete a scenario button', () => {
            cy.contains('Delete a Scenario')
        })

        it('Should contain the view scenario button', () => {
            cy.contains('View Scenario')
        })

        it('Should contain the reset leaderboard button', () => {
            cy.contains('Reset the leaderboard')
        })

        it('Should contain instructions for how to update the JSON files', () => {
            cy.contains('Instructions')
            cy.contains('Use the text box below to enter the questions for a playthrough eg. SQL Injection')
            cy.contains('Using the title of an existing playthrough will update its questions.')
            cy.contains('The expected format is outlined below, update the JSON with the new values')
        })

        it('Should contain a label checking the status of the JSON', () => {
            cy.contains('Invalid JSON')
        })

        it('Should contain a submit button', () => {
            cy.contains('Submit Scenario')
        })

        it('Should contain the JSON text editor', () => {
            cy.get(adminMenuTextareaId)
        })
    })

    describe('JSON editor validation', () => {
        it('Submit button should be disabled when JSON is invalid', () => {
            cy.contains('Invalid JSON')
            cy.contains('Submit Scenario').should('be.disabled')
        })

        it('Should be enabled once a valid JSON is entered', () => {
            cy.get(adminMenuTextareaId).type('{}')
            cy.contains('Valid JSON')
            cy.contains('Submit Scenario').should('be.enabled')
        })
    })
})