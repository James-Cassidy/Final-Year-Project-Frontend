/// <reference types="cypress" />
import environment from "../../../../config/environment"

describe('Quiz Instructions Page', () => {

  describe('SQL Injection', () => {

    beforeEach(() => {
      cy.visit(environment.frontendURL)
      cy.contains('SQL Injection').click()
    })

    it('Should contain the page title', () => {
      cy.contains('How to play')
      cy.contains('SQL Injection')
    })

    it('Should contain instructions for the game', () => {
      cy.contains('Each scenerio has a duration of 3 minutes and ends as soon the timer ends')
      cy.contains('Each scenario consists of 7 questions')
      cy.contains('Select the option you believe answers the question most accurately by clicking on it. An explaination to the answer will be given if you are right or wrong')
      cy.contains('Each game has 2 lifelines:')
      cy.contains('2 50/50 Chance')
      cy.contains('5 Hints')
      cy.contains('Select a 50/50 lifeline by clicking on the icon')
      cy.contains('Select a hint by clicking on the icon')
      cy.contains('The timer starts as soon as you are loaded into a scenario.')
    })

    it('Should contain a back button', () => {
      cy.contains('Back to main menu')
    })

    it('Back button should take the user back to the main menu page', () => {
      cy.contains('Back to main menu').click()
      cy.contains('Leaderboard')
    })

    it('Should contain a Play Quiz button', () => {
      cy.contains('Next')
    })

    it('Play button should take the user to the first question of the game', () => {
      cy.contains('Next').click()
      cy.contains('Context')
    })

  })
})
