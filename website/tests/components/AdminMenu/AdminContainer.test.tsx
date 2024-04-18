import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RenderResult, act, findByText, fireEvent, render, waitFor } from '@testing-library/react';
import AdminContainer from '../../../src/components/AdminMenu/AdminContainer';
import axios from 'axios'
import toast from 'react-hot-toast';

const mockPost = jest.fn()
const mockError = jest.fn()
const mockGet = jest.fn()

describe('admin container', () => {

    let output: RenderResult;

    const renderComponent = () => {
        return render(
            <MemoryRouter>
                <AdminContainer />
            </MemoryRouter>
        );
    }

    beforeEach(() => {
        jest.spyOn(axios, 'post').mockImplementation(mockPost)
        jest.spyOn(axios, 'get').mockImplementation(mockGet)
        jest.spyOn(toast, 'error').mockImplementation(mockError)
    })

    it('should render the component', () => {
        output = renderComponent()

        expect(output).toBeTruthy()
    })

    it('should render the wrapper', () => {
        output = renderComponent()

        const wrapper = output.getByTestId('admin-menu-wrapper')

        expect(wrapper).toBeTruthy()
        expect(wrapper.className).toBe('undefined-admin-menu-container')
    })

    it('should render the options wrapper', () => {
        output = renderComponent()

        const wrapper = output.getByTestId('admin-menu-options-container')

        expect(wrapper).toBeTruthy()
        expect(wrapper.className).toBe('admin-menu-options')
    })

    describe('render the admin options', () => {
        it('should render the delete button', () => {
            output = renderComponent()
    
            const button = output.getByTestId('delete-scenario')
    
            expect(button).toBeTruthy()
            expect(button.className).toBe('undefined-admin-menu-button')
        })

        it('should render the view scenario button', () => {
            output = renderComponent()
    
            const button = output.getByTestId('view-scenario')
    
            expect(button).toBeTruthy()
            expect(button.className).toBe('undefined-admin-menu-button')
        })

        it('should render the reset leaderboard button', () => {
            output = renderComponent()
    
            const button = output.getByTestId('reset-leaderboard')
    
            expect(button).toBeTruthy()
            expect(button.className).toBe('undefined-admin-menu-button')
        })

        it('should render the submit button', () => {
            output = renderComponent()
    
            const button = output.getByTestId('admin-submit-button')
    
            expect(button).toBeTruthy()
            expect(button.className).toBe('undefined-admin-menu-button-right')
        })
    })

    it('should display the popup when the submit button is clicked', async () => {
        output = renderComponent()
    
        const button = output.getByTestId('admin-submit-button')

        output.getByText('Invalid JSON')

        const textEditor = output.getByTestId('admin-menu-json-editor')

        fireEvent.change(textEditor, { target: { value: "{}" }})
        
        output.getByText('Valid JSON')

        fireEvent.click(button)

        act(() => {
            const popup = output.getByTestId('submit-scenario-popup')
            expect(popup).toBeTruthy()
        })
    })

    it('should close the popup when close button clicked', async () => {
        output = renderComponent()
    
        const button = output.getByTestId('admin-submit-button')

        output.getByText('Invalid JSON')

        const textEditor = output.getByTestId('admin-menu-json-editor')

        fireEvent.change(textEditor, { target: { value: "{}" }})
        
        output.getByText('Valid JSON')

        fireEvent.click(button)

        act(() => {
            const popup = output.getByTestId('submit-scenario-popup')
            expect(popup).toBeTruthy()
        })

        const closeButton = output.getByTestId('submit-scenario-popup-close-button')
        
        fireEvent.click(closeButton)

        const popupExists = output.queryByTestId('submit-scenario-popup')

        expect(popupExists).toBeFalsy()
    })


    it('should display an error if the backend service returns an error', async () => {
        mockGet.mockRejectedValueOnce(new Error('Test Error'))

        output = renderComponent()

        await waitFor(() => {
            expect(mockError).toHaveBeenCalledWith('Test Error')
        })
    })

});