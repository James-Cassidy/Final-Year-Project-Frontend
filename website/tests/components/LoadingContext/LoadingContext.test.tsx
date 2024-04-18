import React, { useContext } from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { RenderResult, act, fireEvent, render, waitFor } from '@testing-library/react';
import DeleteScenarioPopUp from '../../../src/components/popups/DeleteScenarioPopUp';
import * as router from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader, LoadingContext } from '../../../src/components/LoadingContext/LoadingContext';

const Test = () => {
    
    const { loading, updateLoading } = useContext(LoadingContext)

    const handleUpdateLoading = () => {
        updateLoading(!loading)
    }
    return (
        <>
            <button data-testid='loading-swap-button' onClick={handleUpdateLoading}></button>
            { loading ? <p data-testid='loading'></p> : <p data-testid='not-loading'></p>}
        </>
    )
}

describe('loading context', () => {

    let output: RenderResult;

    let mockedFunction = jest.fn();
    let mockedGet = jest.fn()
    let mockedNavigate = jest.fn()
    let mockedError = jest.fn()

    const renderComponent = () => {
        return render(
            <Loader>
                <Test />
            </Loader>
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

    it('should render the component with the context', () => {
        output = renderComponent()

        expect(output).toBeTruthy()
    })

    it('should render the not loading <p>', () => {
        output = renderComponent()

        const notLoading = output.getByTestId('not-loading')

        expect(notLoading).toBeTruthy()
    })

    it('should render the loading <p>', async () => {
        output = renderComponent()

        const button = output.getByTestId('loading-swap-button')

        act(() => {
            fireEvent.click(button)
        })

        const loading = output.queryByTestId('loading')

        await waitFor(() => {
            expect(loading).toBeTruthy()
        })
    })
});
