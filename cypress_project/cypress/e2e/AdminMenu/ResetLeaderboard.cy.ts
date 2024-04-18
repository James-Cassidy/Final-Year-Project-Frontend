/// <reference types="cypress" />
import { ADMIN_LOGIN, SCREEN_SIZE } from "../../../config/constants.cy"
import environment from "../../../config/environment"

const usernameInputId = '#username-input'
const passwordInputId = '#password-input'
const submitButtonId = '#admin-login-submit-button'
const resetLeaderboardCheckInputId = '#reset-leader-board-check-input'

describe('Admin Login page', () => {
    beforeEach(()=> {
        cy.visit(environment.frontendURL)
        cy.viewport(SCREEN_SIZE.width, SCREEN_SIZE.height)
        cy.contains('Admin Login').click()
        cy.get(usernameInputId).type(ADMIN_LOGIN.email)
        cy.get(passwordInputId).type(ADMIN_LOGIN.password)
        cy.get(submitButtonId).click()
        cy.contains('Reset the leaderboard').click()
    })

    describe('Verify popup contents', () => {
        it('Should contain the popup title', () => {
            cy.contains('Reset Leaderboard')
        })

        it('should contain the prompt for the user', () => {
            cy.contains('This will empty the results from the database removing all user results')
        })

        it('Should contain prompt for the check', () => {
            cy.contains('To confirm enter permanently delete into the below text box')
        })

        it('Should contain a deletion warning', () => {
            cy.contains('*Deleting is permanent and cannot be undone')
        })

        it('contains the input', () => {
            cy.get(resetLeaderboardCheckInputId)
        })
    })

    describe('Verify the navigation', () => {
        it('should navigate the user back to the admin menu', () => {
            cy.contains('Back').click()
            cy.contains('Delete a Scenario')
        })
    })

    describe('verify validation', () => {
        it('proceed button should be disabled if check is not entered', () => {
            cy.get(resetLeaderboardCheckInputId).type('permanently delete')
            cy.contains('Proceed').should('be.enabled')
        })
        
        it('proceed button should be disabled if check is not entered', () => {
            cy.contains('Proceed').should('be.disabled')
        })
    })
})