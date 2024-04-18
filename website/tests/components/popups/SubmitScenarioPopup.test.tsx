import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RenderResult, act, fireEvent, render, waitFor } from '@testing-library/react';
import SubmitScenarioPopUp from '../../../src/components/popups/SubmitScenarioPopUp';
import * as router from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';

describe('delete scenario', () => {

    let output: RenderResult;

    let mockedFunction = jest.fn();
    let mockedPost = jest.fn()
    let mockedNavigate = jest.fn()
    let mockedError = jest.fn()
    let mockedSuccess = jest.fn()

    const popupId = 'submit-scenario-popup'

    const renderComponent = (open: boolean) => {
        return render(
            <MemoryRouter>
                <SubmitScenarioPopUp scenario={JSON.stringify({
                    title: 'Test',
                    questions: [
                        {

                        }
                    ]
                })} open={open} onClose={mockedFunction} />
            </MemoryRouter>
        );
    }

    beforeEach(() => {
        jest.spyOn(axios, 'post').mockImplementation(mockedPost)
        jest.spyOn(router, 'useNavigate').mockImplementation(mockedNavigate)
        jest.spyOn(toast, 'error').mockImplementation(mockedError)
        jest.spyOn(toast, 'success').mockImplementation(mockedSuccess)
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

        it('proceed button should be disabled if check has not been entered', () => {
            output = renderComponent(true)

            const proceedButton = output.getByTestId('proceed-close-button') as HTMLButtonElement
            
            expect(proceedButton.disabled).toBe(true)
        })

        it('proceed button should be disabled if check has not been entered', async () => {
            output = renderComponent(true)

            const checkInput = output.getByTestId('input-submit-check') as HTMLInputElement

            act(() => {
                fireEvent.change(checkInput, { target: { value: 'confirm' }})
            })

            const proceedButton = output.getByTestId('proceed-close-button') as HTMLButtonElement
            
            await waitFor(() => {
                expect(proceedButton.disabled).toBe(false)
            })
        })
        
    })

    it('should close the popup when back is clicked', async () => {
        output = renderComponent(true)

        const backButton = output.getByTestId('submit-scenario-popup-close-button')

        act(() => {
            fireEvent.click(backButton)
        })

        await waitFor(() => {
            expect(mockedFunction).toHaveBeenCalled()
        })
    })

    describe('proceed button functionality', () => {

        let proceedButton: HTMLButtonElement;

        beforeEach(async () => {
            output = renderComponent(true)

            const checkInput = output.getByTestId('input-submit-check') as HTMLInputElement

            act(() => {
                fireEvent.change(checkInput, { target: { value: 'confirm' }})
            })

            proceedButton = output.getByTestId('proceed-close-button') as HTMLButtonElement
            
            await waitFor(() => {
                expect(proceedButton.disabled).toBe(false)
            })
        })

        it('proceed button should send a post request containing the scenario to the backend', async () => {
            
            fireEvent.click(proceedButton)

            await waitFor(() => {
                expect(mockedPost).toHaveBeenCalled()
                expect(mockedFunction).toHaveBeenCalled()
                expect(mockedSuccess).toHaveBeenCalledWith('Successfully updated')
            })
        })

        it('proceed button display an error if it fails to post the scenario', async () => {
            mockedPost.mockRejectedValueOnce(new Error('Test Error'))

            fireEvent.click(proceedButton)

            await waitFor(() => {
                expect(mockedError).toHaveBeenCalledWith('Test Error')
            })
        })
    })
});
