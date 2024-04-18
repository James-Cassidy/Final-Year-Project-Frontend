/// <reference types="cypress" />
import { ADMIN_LOGIN, SCREEN_SIZE } from "../../../config/constants.cy"
import environment from "../../../config/environment"

describe('Titlebar', () => {
    beforeEach(()=> {
        cy.visit(environment.frontendURL)
        cy.viewport(SCREEN_SIZE.width, SCREEN_SIZE.height)
    })

    describe('Verify Title Bar Contents', () => {

        it('Should contain the "Hack Attack" Title', () => {
            cy.contains("Hack Attack")
        })

        it('Should contain the "Home" button', () => {
            cy.contains("Home")
        })

        it('Should contain the "Settings" button', () => {
            cy.contains("Settings")
        })

        it('Should contain the "Help" button', () => {
            cy.contains("Help")
        })

        it('Should contain the "Admin Login" button', () => {
            cy.contains("Admin Login")
        })
    })

    describe('Test button navigation', () => {
        it('Should navigate to the "Admin Login"', () => {
            cy.contains("Admin Login").click()
            cy.contains("Admin Users")
        })

        it('Should navigate back to home page', () => {
            // Navigate away from home pages
            cy.contains("Admin Login").click()
            cy.contains("Admin Users")
            // Navigate back to home page
            cy.contains("Home").click()
            cy.contains("SQL Injection")
            cy.contains("Cross Site Scripting")
        })
    })
})