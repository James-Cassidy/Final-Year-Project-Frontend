import React from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { RenderResult, act, fireEvent, render, waitFor } from '@testing-library/react';
import DeleteScenarioPopUp from '../../../src/components/popups/DeleteScenarioPopUp';
import * as router from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';

describe('delete scenario', () => {

    let output: RenderResult;

    let mockedFunction = jest.fn();
    let mockedGet = jest.fn()
    let mockedNavigate = jest.fn()
    let mockedError = jest.fn()

    const renderComponent = (open: boolean) => {
        return render(
            <MemoryRouter>
                <DeleteScenarioPopUp scenarios={['Sql Injection', 'Buffer Overflow']} open={open} onClose={mockedFunction} />
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

        const popup = output.queryByTestId('delete-scenario-popup')

        expect(popup).toBeTruthy()
    })

    it('should render the popup if open is false', () => {
        output = renderComponent(false)

        const popup = output.queryByTestId('delete-scenario-popup')

        expect(popup).toBeFalsy()
    })

    describe('verify validation', () => {
        it('proceed button should be disabled if both fields are empty', () => {
            output = renderComponent(true)

            const popup = output.getByTestId('proceed-close-button') as HTMLButtonElement

            expect(popup.disabled).toBe(true)
        })

        it('proceed button should be enabled if both fields are filled', async () => {
            output = renderComponent(true)

            const select = output.getByTestId('scenario-select') as HTMLSelectElement

            act(() => {
                fireEvent.change(select, { target: { value: 'Sql Injection' }})
            })

            const checkInput = output.getByTestId('confirmation-input')

            act(() => {
                fireEvent.change(checkInput, { target: { value: 'permanently delete' }})
            })

            const popupProceedButton = output.getByTestId('proceed-close-button') as HTMLButtonElement

            await waitFor(() => {
                expect(popupProceedButton.disabled).toBe(false)
            })
        })

        it('proceed button should be disabled if only a title has been selected', async () => {
            output = renderComponent(true)

            const select = output.getByTestId('scenario-select') as HTMLSelectElement

            act(() => {
                fireEvent.change(select, { target: { value: 'Sql Injection' }})
            })

            const popupProceedButton = output.getByTestId('proceed-close-button') as HTMLButtonElement

            await waitFor(() => {
                expect(popupProceedButton.disabled).toBe(true)
            })
        })

        it('proceed button should be disabled if only the check has been entered', async () => {
            output = renderComponent(true)

            const checkInput = output.getByTestId('confirmation-input')

            act(() => {
                fireEvent.change(checkInput, { target: { value: 'permanently delete' }})
            })

            const popupProceedButton = output.getByTestId('proceed-close-button') as HTMLButtonElement

            await waitFor(() => {
                expect(popupProceedButton.disabled).toBe(true)
            })
        })
    })

    it('should close the popup when back is clicked', async () => {
        output = renderComponent(true)

        const backButton = output.getByTestId('delete-scenario-popup-close-button')

        act(() => {
            fireEvent.click(backButton)
        })

        await waitFor(() => {
            expect(mockedFunction).toHaveBeenCalled()
        })
    })

    describe('proceed button functionality', () => {

        let proceedButton: HTMLButtonElement;

        beforeEach( async () => {
            output = renderComponent(true)
    
            const select = output.getByTestId('scenario-select') as HTMLSelectElement
    
            act(() => {
                fireEvent.change(select, { target: { value: 'Sql Injection' }})
            })
    
            const checkInput = output.getByTestId('confirmation-input')
    
            act(() => {
                fireEvent.change(checkInput, { target: { value: 'permanently delete' }})
            })

            proceedButton = output.getByTestId('proceed-close-button') as HTMLButtonElement

            await waitFor(() => {
                expect(proceedButton.disabled).toBe(false)
            })
        })


        it('should close the popup and call the backend when proceed is clicked', async () => {

            fireEvent.click(proceedButton)

            await waitFor(() => {
                expect(mockedGet).toHaveBeenCalled()
                expect(mockedFunction).toHaveBeenCalled()
            })
        })
    
        it('should display an error if the backend returns a 400', async () => {
            mockedGet.mockRejectedValue(new Error('Error'))            

            fireEvent.click(proceedButton)

            await waitFor(() => {
                expect(mockedError).toHaveBeenCalledWith('Error')
            })
        })
    })
});
