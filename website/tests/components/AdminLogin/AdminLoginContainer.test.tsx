import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RenderResult, act, fireEvent, render, waitFor } from '@testing-library/react';
import AdminLoginContainer from '../../../src/components/AdminLogin/AdminLoginContainer';
import { AccountContext } from '../../../src/auth/Account'
import toast from 'react-hot-toast';
import * as router from 'react-router';

describe('admin add update scenario', () => {

    const usernameInputId = 'username-input'
    const passwordInputId = 'password-input'
    const buttonId = 'admin-login-submit-button'
    
    const mockError = jest.fn()
    const mockNavigation = jest.fn()

    let output: RenderResult;

    let mockAuthenticate = jest.fn();

    const renderComponent = () => {
        return render(
            <MemoryRouter>
                <AccountContext.Provider value={{authenticate: mockAuthenticate, logout: jest.fn(), getSession: jest.fn(), isLoggedIn: jest.fn()}} >
                    <AdminLoginContainer  />
                </AccountContext.Provider>
            </MemoryRouter>
        );
    }

    beforeEach(() => {
        jest.spyOn(toast, 'error').mockImplementation(mockError)
        jest.spyOn(router, 'useNavigate').mockImplementation(mockNavigation)
        output = renderComponent()
    })

    it('should render the component', () => {
        const container = output.getByTestId('admin-login-container')

        expect(container).toBeTruthy()
        expect(container.className).toBe('undefined-admin-login-menu-container')
    })

    describe('verify validation', () => {
        it('login button should be enabled if the username and password fields are filled', () => {
            const usernameInput = output.getByTestId(usernameInputId)

            act(() => {
                fireEvent.change(usernameInput, { target: { value: 'username '}})
            })

            const passwordInput = output.getByTestId(passwordInputId)

            act(() => {
                fireEvent.change(passwordInput, { target: { value: 'password' }})
            })

            const button = output.getByTestId(buttonId) as HTMLButtonElement

            expect(button.disabled).toBe(false)
        })

        it('login button should be disabled if the username and password fields are empty', () => {
            const button = output.getByTestId(buttonId) as HTMLButtonElement

            expect(button.disabled).toBe(true)
        })

        it('login button should be disabled if the username is empty', () => {


            const passwordInput = output.getByTestId(passwordInputId)

            act(() => {
                fireEvent.change(passwordInput, { target: { value: 'password' }})
            })

            const button = output.getByTestId(buttonId) as HTMLButtonElement

            expect(button.disabled).toBe(true)
        })

        it('login button should be disabled if the password fields are empty', () => {
            const usernameInput = output.getByTestId(usernameInputId)

            act(() => {
                fireEvent.change(usernameInput, { target: { value: 'username '}})
            })

            const button = output.getByTestId(buttonId) as HTMLButtonElement

            expect(button.disabled).toBe(true)
        })
    })

    describe('verify button functionality', () => {

        let button: HTMLButtonElement;

        beforeEach(() => {
            const usernameInput = output.getByTestId(usernameInputId)

            act(() => {
                fireEvent.change(usernameInput, { target: { value: 'username '}})
            })

            const passwordInput = output.getByTestId(passwordInputId)

            act(() => {
                fireEvent.change(passwordInput, { target: { value: 'password' }})
            })

            button = output.getByTestId(buttonId) as HTMLButtonElement
        })

        it('should call backend to validate the user', async () => {
            mockAuthenticate.mockResolvedValue({})
            act(() => {
                fireEvent.click(button)
            })

            await waitFor(() => {
                expect(mockAuthenticate).toHaveBeenCalled()
                expect(mockNavigation).toHaveBeenCalled()
            })
        })

        it('should output an error if the user is not valid', async () => {
            mockAuthenticate.mockRejectedValueOnce(new Error('Error'))
            act(() => {
                fireEvent.click(button)
            })

            await waitFor(() => {
                expect(mockError).toHaveBeenCalled()
            })
        })
    })
});