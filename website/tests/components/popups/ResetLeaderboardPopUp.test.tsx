import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RenderResult, act, fireEvent, render, waitFor } from '@testing-library/react';
import * as router from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import ResetLeaderboardPopup from '../../../src/components/popups/ResetLeaderboardPopUp';


describe('reset leaderboard scenario', () => {

    let output: RenderResult;

    let mockedFunction = jest.fn();
    let mockedGet = jest.fn()
    let mockedNavigate = jest.fn()
    let mockedError = jest.fn()

    const popupId = 'reset-leaderboard-popup'

    const renderComponent = (open: boolean) => {
        return render(
            <MemoryRouter>
                <ResetLeaderboardPopup open={open} onClose={mockedFunction} />
            </MemoryRouter>
        );
    }

    beforeEach(() => {
        jest.spyOn(axios, 'get').mockImplementation(mockedGet)
        jest.spyOn(router, 'useNavigate').mockImplementation(mockedNavigate)
        jest.spyOn(toast, 'error').mockImplementation(mockedError)
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should render the popup if open is true', () => {
        output = renderComponent(true)

        const popup = output.queryByTestId(popupId)

        expect(popup).toBeTruthy()
    })

    it('should render the popup if open is false', () => {
        output = renderComponent(false)

        const popup = output.queryByTestId(popupId)

        expect(popup).toBeFalsy()
    })

    describe('verify validation', () => {
        it('should be enabled if the check is entered', async () => {
            output = renderComponent(true)

            const checkInput = output.getByTestId('reset-leaderboard-check-input') as HTMLInputElement

            act(() => {
                fireEvent.change(checkInput, { target: { value: 'permanently delete' }})
            })

            const proceedButton = output.getByTestId('proceed-close-button') as HTMLButtonElement

            await waitFor(() => {
                expect(proceedButton.disabled).toBe(false)
            })
        })

        it('should be disabled if the check is not entered', async () => {
            output = renderComponent(true)

            const proceedButton = output.getByTestId('proceed-close-button') as HTMLButtonElement

            await waitFor(() => {
                expect(proceedButton.disabled).toBe(true)
            })
        })
    })

    describe('checks that the proceed function acts as expected', () => {

        let proceedButton: HTMLButtonElement

        beforeEach( async () => {
            output = renderComponent(true)

            const checkInput = output.getByTestId('reset-leaderboard-check-input') as HTMLInputElement

            act(() => {
                fireEvent.change(checkInput, { target: { value: 'permanently delete' }})
            })

           proceedButton = output.getByTestId('proceed-close-button') as HTMLButtonElement

            await waitFor(() => {
                expect(proceedButton.disabled).toBe(false)
            })
        })

        it('should be enabled if the check is entered', async () => {

            fireEvent.click(proceedButton)

            await waitFor(() => {
                expect(mockedGet).toHaveBeenCalled()
            })
        })

        it('should output an error if the backend service returns a 400', async () => {
            mockedGet.mockRejectedValueOnce(new Error('Test'))

            fireEvent.click(proceedButton)

            await waitFor(() => {
                expect(mockedError).toHaveBeenCalledWith('Test')
            })
        })
    })
});
