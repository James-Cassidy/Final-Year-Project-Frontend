/// <reference types="cypress" />
import { SCREEN_SIZE } from "../../../config/constants.cy"
import environment from "../../../config/environment"

describe('Leaderboard page', () => {
    beforeEach(()=> {
        cy.visit(environment.frontendURL)
        cy.viewport(SCREEN_SIZE.width, SCREEN_SIZE.height)
        cy.contains('Leaderboard').click()
    })

    it('Should verify that the page title is present', () => {
        cy.contains("Leaderboard")
    })

    describe('Should verify that all the scenario attempt', () => {
        it('Should contain SQL Injection', () => {
            cy.contains('SQL Injection')
        })

        it('Should contain Distributed Denial of Service', () => {
            cy.contains('Distributed Denial of Service')
        })

        it('Should contain Cross Site Scripting', () => {
            cy.contains('Cross Site Scripting')
        })

        it('Should contain Buffer Overflow', () => {
            cy.contains('Buffer Overflow')
        })
    })

    describe('Should verify that all of column headers are present', () => {
        it('Should verify that Nickname is present', () => {
            cy.contains("Nickname")
        })

        it('Should verify that Score is present', () => {
            cy.contains("Score")
        })

        it('Should verify that the Total Questions is present', () => {
            cy.contains("Total Questions")
        })

        it('Should verify that the Number Answered is present', () => {
            cy.contains("Number Answered")
        })

        it('Should verify that the Correct Answers is present', () => {
            cy.contains("Correct Answers")
        })

        it('Should verify that the Wrong Answers is present', () => {
            cy.contains("Wrong Answers")
        })

        it('Should verify that the Hints Used is present', () => {
            cy.contains("Hints Used")
        })

        it('Should verify that 50/50s used is present', () => {
            cy.contains('50/50s Used')
        })
    })
})