/// <reference types="cypress" />
import { ADMIN_LOGIN, SCREEN_SIZE } from "../../../config/constants.cy"

const usernameInputId = '#username-input'
const passwordInputId = '#password-input'
const submitButtonId = '#admin-login-submit-button'

describe('Admin Login page', () => {
    beforeEach(()=> {
        cy.visit(Cypress.env('url'))
        cy.viewport(SCREEN_SIZE.width, SCREEN_SIZE.height)
        cy.contains('Admin Login').click()
    })

    describe('Verify Page Content', () => {
        it('Should contain the container title', () => {
            cy.contains('Admin Users');
        })

        it('Should contain the username prompt', () => {
            cy.contains('Username');
        })

        it('Should contain the username input', () => {
            cy.get(usernameInputId)
        })

        it('Should contain the password prompt', () => {
            cy.contains('Password')
        })

        it('Should contain the password input', () => {
            cy.get(passwordInputId)
        })

        it('Should contain the button for logging in', () => {
            cy.contains('Login')
        })
    })

    describe('Verify validation', () => {
        it('Login button should be disabled until the user has typed in a username and password', () => {
            cy.get(submitButtonId).should('be.disabled')
        })

        it('login button should be disabled if the user has only typed in a password', () => {
            cy.get(usernameInputId).type(ADMIN_LOGIN.email)
            cy.get(submitButtonId).should('be.disabled')
        })

        it('login button should be disabled if the user has only typed in a password', () => {
            cy.get(passwordInputId).type(ADMIN_LOGIN.password)
            cy.get(submitButtonId)
        })

        it('login button should be enabled when the user has entered a username and password', () => {
            cy.get(usernameInputId).type(ADMIN_LOGIN.email)
            cy.get(passwordInputId).type(ADMIN_LOGIN.password)
            cy.get(submitButtonId).should('be.enabled')
        })
    })

    describe('User authentication', () => {
        it('Should block a user with valid password but invalid username', () => {
            cy.get(usernameInputId).type("Test")
            cy.get(passwordInputId).type(ADMIN_LOGIN.password)
            cy.get(submitButtonId).click()
            cy.contains('Incorrect Username or Password')
        })

        it('Should block a user with valid username and invalid password', () => {
            cy.get(usernameInputId).type(ADMIN_LOGIN.email)
            cy.get(passwordInputId).type('invalid')
            cy.get(submitButtonId).click()
            cy.contains('Incorrect Username or Password')
        })

        it('Should allow access when a user logs in with a valid username and password', () => {
            cy.get(usernameInputId).type(ADMIN_LOGIN.email)
            cy.get(passwordInputId).type(ADMIN_LOGIN.password)
            cy.get(submitButtonId).click()
            cy.contains('View Scenario')
            cy.contains('Reset the leaderboard')
        })
    })
})