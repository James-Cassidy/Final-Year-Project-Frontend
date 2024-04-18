import { RenderResult, act, fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import QuizSummary from '../../../../src/components/quiz/QuizSummary/QuizSummary';
import * as router from 'react-router';

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
            score: 12,
            numberOfQuestions: 12,
            numberOfAnsweredQuestions: 32,
            correctAnswers: 12,
            wrongAnswers: 12,
            hintsUsed: 12,
            minutes: 12,
            fiftyFiftyUsed: 12,
            seconds: 12
        }
    })

    let output: RenderResult;

    beforeEach(() => {
        jest.spyOn(axios, 'post').mockImplementation(mockPost)
        jest.spyOn(toast, 'success').mockImplementation(mockSuccess)
        jest.spyOn(toast, 'error').mockImplementation(mockError)
        jest.spyOn(router, 'useNavigate').mockReturnValue(mockNavigate)
        jest.spyOn(router, 'useLocation').mockImplementation(mockLocation)
    });

    const renderComponent = () => {
        return render(<QuizSummary />)
    }

    beforeEach(() => {
        output = renderComponent()
    })

    it('verifies that the component renders', async () => {

        const table = output.getByTestId('results-table')

        expect(table).toBeTruthy()
    })

    it('verifies that the page navigates away when the home button is clicked', async () => {
        const button = output.getByTestId('summary-home-button')

        act(() => {
            fireEvent.click(button)
        })

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/')
        })
    })

    it('verifies that the remark is calculated depending on score', () => {
        
    })


});