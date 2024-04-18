import { RenderResult, fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import QuizSummaryTable from '../../../../src/components/quiz/QuizSummary/QuizSummaryTable';

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

    let output: RenderResult;

    beforeEach(() => {
        jest.spyOn(axios, 'post').mockImplementation(mockPost)
        jest.spyOn(toast, 'success').mockImplementation(mockSuccess)
        jest.spyOn(toast, 'error').mockImplementation(mockError)
    });

    const renderComponent = () => {
        return render(<QuizSummaryTable results={{
            scenario: 'Test',
            score: 24,
            numberOfQuestions: 10,
            numberOfAnsweredQuestions: 8,
            correctAnswers: 7,
            wrongAnswers: 1,
            hintsUsed: 2,
            fiftyFiftyUsed: 1,
            minutes: 2,
            seconds: 12
        }} remark={'Test Remark'} />)
    }

    it('verifies that the component renders', async () => {
        output = renderComponent()

        const table = output.getByTestId('results-table')

        expect(table).toBeTruthy()
    })


});