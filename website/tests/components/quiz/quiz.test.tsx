import { RenderResult, act, fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import * as router from 'react-router';
import { MemoryRouter } from 'react-router';
import Play from '../../../src/components/quiz/Play'

const testData = {
    score: 12,
    numberOfQuestions: 32,
    numberOfAnsweredQuestions: 12,
    correctAnswers: 12,
    wrongAnswers: 11,
    hintsUsed: 12,
    fiftyFiftyUsed: 5
}

jest.mock('../../assets/audio/correct-answer.mp3');
jest.mock('../../assets/audio/wrong-answer.mp3');
jest.mock('../../assets/audio/button-sound.mp3');

describe('Tests for the quiz page', () => {

    const mockPost = jest.fn()
    const mockSuccess = jest.fn().mockResolvedValue({})
    const mockError = jest.fn()
    const mockNavigate = jest.fn()

    const mockLocation = jest.fn().mockReturnValue({
        state: {
            title: 'Test',
            questions: [{
                optionA: 'optionA',
                optionB: 'optionB',
                optionC: 'optionC',
                optionD: 'optionD',
                answer: 'optionA',
                question: 'question1',
                stage: "test"
            },{
                optionA: 'optionA',
                optionB: 'optionB',
                optionC: 'optionC',
                optionD: 'optionD',
                answer: 'optionA',
                question: 'question2',
                stage: "test"
            }]
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
        return render (
            <MemoryRouter>
                <Play />
            </MemoryRouter>
        )
    }

    beforeEach(() => {
        output = renderComponent();
    })

    it('should verify that the component renders', () => {
        expect(output).toBeTruthy();
    });

    it('should verify that the questions container renders', () => {
        const container = output.getByTestId('questions-container')
        expect(container).toBeTruthy()
    })

    describe('verify that the options are displayed correctly', () => {
        it('should display option A', () => {
            const optionA = output.getByTestId('option-a')
            expect(optionA.innerHTML).toBe('optionA')
        })

        it('should display option B', () => {
            const optionB = output.getByTestId('option-b')
            expect(optionB.innerHTML).toBe('optionB')
        })

        it('should display option C', () => {
            const optionC = output.getByTestId('option-c')
            expect(optionC.innerHTML).toBe('optionC')
        })

        it('should display option D', () => {
            const optionD = output.getByTestId('option-d')
            expect(optionD.innerHTML).toBe('optionD')
        })
    })

    it('should inform the user if the answer is correct or not', async () => {
        const optionA = output.getByTestId('option-a')
        
        act(() => {
            fireEvent.click(optionA)
        })
        
        await waitFor(() => {
            expect(mockSuccess).toHaveBeenCalled()
        })
    })

    it('should handle fifty fifty', () => {
        const fiftyFiftyButton = output.getByTestId('fiftyfifty-button')
    
        act(() => {
            fireEvent.click(fiftyFiftyButton)
        })

        const optionA = output.getByTestId('option-a') as HTMLParagraphElement
        const optionB = output.getByTestId('option-b') as HTMLParagraphElement
        const optionC = output.getByTestId('option-c') as HTMLParagraphElement
        const optionD = output.getByTestId('option-d') as HTMLParagraphElement

        const optionList = [optionA, optionB, optionC, optionD]
        const filteredOptions = optionList.filter(option => option.style.visibility === 'hidden')

        expect(filteredOptions.length).toBe(2)
    })

    it('should handle hint', () => {
        const fiftyFiftyButton = output.getByTestId('hint-button')
    
        act(() => {
            fireEvent.click(fiftyFiftyButton)
        })

        const optionA = output.getByTestId('option-a') as HTMLParagraphElement
        const optionB = output.getByTestId('option-b') as HTMLParagraphElement
        const optionC = output.getByTestId('option-c') as HTMLParagraphElement
        const optionD = output.getByTestId('option-d') as HTMLParagraphElement

        const optionList = [optionA, optionB, optionC, optionD]
        const filteredOptions = optionList.filter(option => option.style.visibility === 'hidden')

        expect(filteredOptions.length).toBe(1)
    })

    it('should handle displaying the next question', async () => {
        const optionA = output.getByTestId('option-a') as HTMLParagraphElement

        act(() => {
            fireEvent.click(optionA)
        })

        const question1 = output.queryByText('question1')

        await waitFor(() => {
            expect(question1).toBeFalsy()
        })

        const question2 = output.queryByText('question2')

        await waitFor(() => {
            expect(question2).toBeTruthy()
        })

    })
});
