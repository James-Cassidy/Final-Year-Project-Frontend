import React from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { RenderResult, act, fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import MainMenuContainer from '../../../src/components/MainMenu/MainMenuContainer';
import * as router from 'react-router';
import toast from 'react-hot-toast';

const scenarios = ['SQL Injection', 'Buffer Overflow', 'Cross Site Scripting']

describe('admin add update scenario', () => {

    let output: RenderResult;

    let mockedFunction = jest.fn();
    let mockedNavigate = jest.fn();
    let mockedGet = jest.fn()
    let mockedError = jest.fn()

    const renderComponent = () => {
        return render(
            <MemoryRouter>
                <MainMenuContainer />
            </MemoryRouter>
        );
    }

    beforeEach(() => {
        jest.spyOn(axios, 'get').mockImplementation(mockedGet)

        jest.spyOn(axios, 'post').mockImplementation(mockedFunction)
        jest.spyOn(router, 'useNavigate').mockImplementation(mockedNavigate)
        jest.spyOn(toast, 'error').mockImplementation(mockedError)
    })

    it('should contain buttons for each scenario', async () => {
        mockedGet.mockResolvedValueOnce({data:scenarios})

        act(() => {
            output = renderComponent()
        })

        await waitFor(() => {
            expect(output.queryByTestId('loading-clock')).toBeFalsy()
        })

        const sqlInjectionButton = output.getByTestId('SQL Injection')
        const bufferOverflow = output.getByTestId('Buffer Overflow')
        const crossSiteButton = output.getByTestId('Cross Site Scripting')

        expect(sqlInjectionButton).toBeTruthy()
        expect(bufferOverflow).toBeTruthy()
        expect(crossSiteButton).toBeTruthy()
    })

    it('should navigate away to the scenario when clicked', async () => {
        mockedGet.mockResolvedValue({data:{
            questions: []
        }})
        mockedGet.mockResolvedValueOnce({data:scenarios})

        act(() => {
            output = renderComponent()
        })

        await waitFor(() => {
            expect(output.queryByTestId('loading-clock')).toBeFalsy()
        })

        const sqlInjectionButton = output.getByTestId('SQL Injection')
        expect(sqlInjectionButton).toBeTruthy()

        act(() => {
            fireEvent.click(sqlInjectionButton)
        })

        expect(mockedNavigate).toHaveBeenCalled()
    })


    it('should contain the loading clock until the response is retrieved', () => {
        act(() => {
            output = renderComponent()
        })

        expect(output.queryByTestId('loading-clock')).toBeTruthy()
    })

    it('should output an error message when an invalid response is returned', async () => {
        mockedGet.mockRejectedValueOnce(new Error('Test Error'))

        act(() => {
            output = renderComponent()
        })

        await waitFor(() => {
            expect(mockedError).toHaveBeenCalled()
            expect(mockedError).toHaveBeenCalledWith('Test Error')
        })
    })
});
