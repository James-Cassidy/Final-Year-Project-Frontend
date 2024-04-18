import { RenderResult, fireEvent, render, waitFor } from '@testing-library/react';
import SendEmail from '../../../../src/components/quiz/QuizSummary/SendEmail';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

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
        return render(<SendEmail 
            score={testData.score}
            numberOfQuestions={testData.numberOfQuestions}
            numberOfAnsweredQuestions={testData.numberOfAnsweredQuestions}
            correctAnswers={testData.correctAnswers}
            wrongAnswers={testData.wrongAnswers}
            hintsUsed={testData.hintsUsed}
            fiftyFiftyUsed={testData.fiftyFiftyUsed}
            time={23}
            />)
    }

    it('should render the email component', () => {
        output = renderComponent();

        const container = output.getByTestId('send-email-container');

        expect(container).toBeTruthy()
    })

    it('should call the backend service when an email is sent', async () => {
        output = renderComponent();

        const container = output.getByTestId('send-email-container');

        expect(container).toBeTruthy()

        const textEntry = output.getByTestId('send-email-text-input') as HTMLInputElement;

        fireEvent.change(textEntry, { target: { value: 'Pass' }})

        expect(textEntry.value).toBe('Pass')

        const emailButton = output.getByTestId('send-email-button')

        fireEvent.click(emailButton)

        await waitFor(() => {
            expect(mockPost).toHaveBeenCalled()
            expect(mockSuccess).toHaveBeenCalled()
        })
    })

    it('should call the backend service when an email is sent', async () => {
        mockPost.mockRejectedValueOnce(new Error('Error'))

        output = renderComponent();

        const container = output.getByTestId('send-email-container');

        expect(container).toBeTruthy()

        const textEntry = output.getByTestId('send-email-text-input') as HTMLInputElement;

        fireEvent.change(textEntry, { target: { value: 'Pass' }})

        expect(textEntry.value).toBe('Pass')

        const emailButton = output.getByTestId('send-email-button')

        fireEvent.click(emailButton)

        await waitFor(() => {
            expect(mockPost).toHaveBeenCalled()
            expect(mockError).toHaveBeenCalled()
        })
    })
});