import React from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { RenderResult, act, fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import LeaderboardPopUp from '../../../src/components/popups/LeaderboardPopUp'
import * as router from 'react-router';
import toast from 'react-hot-toast';

const scenarios = ['SQL Injection', 'Buffer Overflow', 'Cross Site Scripting']

describe('get leaderboard for scenario', () => {

    let output: RenderResult;

    let mockedFunction = jest.fn();
    let mockedRenderLeaderboard = jest.fn()
    let mockedError = jest.fn()

    const renderComponent = () => {
        return render(
            <LeaderboardPopUp />
        );
    }

    beforeEach(() => {
        jest.spyOn(axios, 'get').mockImplementation(mockedRenderLeaderboard)

        jest.spyOn(axios, 'post').mockImplementation(mockedFunction)
        jest.spyOn(toast, 'error').mockImplementation(mockedError)
    })

    it('should contain buttons for each scenario', async () => {
        mockedRenderLeaderboard.mockResolvedValue({"username":"username","scenarioName":"scenarioName","score":"score","numberOfQuestions": "numberOfQuestions","numberOfAnsweredQuestions": "numberOfAnsweredQuestions","correctAnswers":"correctAnswers","wrongAnswers":"wrongAnswers","hintsUsed":"hintsUsed", "fiftyFiftyUsed":"fiftyFiftyUsed", "time":"time"})
        mockedRenderLeaderboard.mockResolvedValueOnce({data:scenarios})

        act(() => {
            output = renderComponent()            
        })

        await waitFor(() => {
            expect(output.queryByTestId('loading-clock')).toBeFalsy()
        })

        const sqlInjectionButton = output.getByText('SQL Injection')
        fireEvent.click(sqlInjectionButton)

        expect(sqlInjectionButton).toBeTruthy()
    })

    it('should output an error message when an invalid response is returned', async () => {
        mockedRenderLeaderboard.mockRejectedValueOnce(new Error('Test Error'))

        act(() => {
            output = renderComponent()
        })

        await waitFor(() => {
            expect(mockedError).toHaveBeenCalled()
            expect(mockedError).toHaveBeenCalledWith('Test Error')
        })
    })
});