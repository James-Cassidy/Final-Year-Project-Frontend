import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RenderResult, act, fireEvent, render, waitFor } from '@testing-library/react';
import ViewScenarioPopup from '../../../src/components/popups/ViewScenarioPopUp';
import * as router from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';

describe('view scenario popup', () => {

    let output: RenderResult;

    let mockedFunction = jest.fn();
    let mockedGet = jest.fn()
    let mockedNavigate = jest.fn()
    let mockedError = jest.fn()
    let mockedSuccess = jest.fn()
    let mockedSetScenario = jest.fn()

    const popupId = 'view-scenario-popup'

    const renderComponent = (open: boolean) => {
        return render(
            <MemoryRouter>
                <ViewScenarioPopup open={open} onClose={mockedFunction} setScenario={mockedSetScenario} scenarios={['SQL Injection', 'Cross Site Scripting']} />
            </MemoryRouter>
        );
    }

    beforeEach(() => {
        jest.spyOn(axios, 'get').mockImplementation(mockedGet)
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

            const checkInput = output.getByTestId('scenario-select') as HTMLSelectElement

            act(() => {
                fireEvent.change(checkInput, { target: { value: 'SQL Injection' }})
            })

            const proceedButton = output.getByTestId('proceed-close-button') as HTMLButtonElement
            
            await waitFor(() => {
                expect(proceedButton.disabled).toBe(false)
            })
        })
        
    })

    it('should close the popup when back is clicked', async () => {
        output = renderComponent(true)

        const backButton = output.getByTestId('view-scenario-popup-close-button')

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

            const checkInput = output.getByTestId('scenario-select') as HTMLSelectElement

            act(() => {
                fireEvent.change(checkInput, { target: { value: 'SQL Injection' }})
            })

            proceedButton = output.getByTestId('proceed-close-button') as HTMLButtonElement
            
            await waitFor(() => {
                expect(proceedButton.disabled).toBe(false)
            })
        })

        it('proceed button should send a post request containing the scenario to the backend', async () => {
            mockedGet.mockResolvedValue({
                data: {
                    title: 'Test',
                    questions: []
                }
            })

            fireEvent.click(proceedButton)

            await waitFor(() => {
                expect(mockedGet).toHaveBeenCalled()
                expect(mockedSuccess).toHaveBeenCalledWith('Scenario successfully retrieved')
                expect(mockedFunction).toHaveBeenCalled()

            })
        })

        it('proceed button display an error if it fails to post the scenario', async () => {
            mockedGet.mockRejectedValueOnce(new Error('Test Error'))

            fireEvent.click(proceedButton)

            await waitFor(() => {
                expect(mockedError).toHaveBeenCalledWith('Test Error')
            })
        })
    })
});
