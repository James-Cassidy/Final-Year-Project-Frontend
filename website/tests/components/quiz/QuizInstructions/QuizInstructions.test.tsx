import { RenderResult, fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import QuizSummary from '../../../../src/components/quiz/QuizSummary/QuizSummary';
import * as router from 'react-router';
import QuizInstructions from '../../../../src/components/quiz/QuizInstructions/QuizInstructions';

const testData = {
    score: 12,
    numberOfQuestions: 32,
    numberOfAnsweredQuestions: 12,
    correctAnswers: 12,
    wrongAnswers: 11,
    hintsUsed: 12,
    fiftyFiftyUsed: 5
}

describe('Tests for the login page', () => {

    const mockPost = jest.fn()
    const mockSuccess = jest.fn().mockResolvedValue({})
    const mockError = jest.fn()
    const mockNavigate = jest.fn()
    const mockLocation = jest.fn().mockReturnValue({
        state: {
            title: 'Test',
            questions: 'Test'
        }
    })

    let output: RenderResult;

    beforeEach(() => {
        jest.spyOn(axios, 'post').mockImplementation(mockPost)
        jest.spyOn(toast, 'success').mockImplementation(mockSuccess)
        jest.spyOn(toast, 'error').mockImplementation(mockError)
        jest.spyOn(router, 'useNavigate').mockImplementation(mockNavigate)
        jest.spyOn(router, 'useLocation').mockImplementation(mockLocation)
    });

    const renderComponent = () => {
        return render(<QuizInstructions />)
    }

    it('verifies that the component renders', async () => {
        output = renderComponent()

        const table = output.getByTestId('menu-container')

        expect(table).toBeTruthy()
    })


});