import React from 'react';
import { RenderResult, fireEvent, render } from '@testing-library/react';
import TitleBar from '../../../src/components/TitleBar/TitleBar';
import { MemoryRouter } from 'react-router-dom';
import { AccountContext } from '../../../src/auth/Account';
import { LoadingContext } from '../../../src/components/LoadingContext/LoadingContext';

describe('Tests for the TitleBar', () => {

    let output: RenderResult;

    const renderComponent = (authenticated: boolean, loading: boolean) => {
        return render (
            // Mocks the router
            <MemoryRouter>
                <LoadingContext.Provider value={{
                    loading: loading,
                    updateLoading: jest.fn()
                }}>
                    {/* Mocks the user account context */}
                    <AccountContext.Provider value={{
                        authenticate: jest.fn(),
                        isLoggedIn: jest.fn().mockReturnValue(authenticated),
                        getSession: jest.fn(),
                        logout: jest.fn()
                    }}>
                        {/* Renders the titlebar component */}
                        <TitleBar />
                    </AccountContext.Provider>
                </LoadingContext.Provider>
            </MemoryRouter>
        )
    }

    describe('verify buttons displayed for an authenticated user', () => {

        beforeEach(() => {
            output = renderComponent(true, false)
        })

        it('should display the title', () => {
            // get the title
            const title = output.getByTestId('titlebar-title');
    
            // verify the title renders as expected
            expect(title).toBeTruthy();
            expect(title.innerHTML).toBe('Hack Attack')
            expect(title.className).toBe('Title')
        });
    
        it('should display the home button', () => {
            // Gets the button
            const button = output.getByTestId('title-bar-navigation-home')
    
            // verify the button renders as expected
            expect(button).toBeTruthy()
            expect(button.innerHTML).toBe('Home')
            expect(button.className).toBe('undefined-title-bar-button')
        })
    
        it('should render the leaderboard button', () => {
            // gets the button
            const button = output.getByTestId('title-bar-navigation-leaderboard')
    
            //verify the button renders as expected
            expect(button).toBeTruthy()
            expect(button.innerHTML).toBe('Leaderboard')
            expect(button.className).toBe('undefined-title-bar-button')
        })
    
        it('should render the settings button', () => {
            // gets the button
            const button = output.getByTestId('title-bar-navigation-settings')
    
            // verify the button renders as expected
            expect(button).toBeTruthy()
            expect(button.innerHTML).toBe('Settings')
            expect(button.className).toBe('undefined-title-bar-button')
        })

        it('should display the admin menu button', () => {
            // get button
            const button = output.getByTestId('title-bar-navigation-admin-menu')

            // verifyt the button renders as expected
            expect(button).toBeTruthy()
            expect(button.innerHTML).toBe('Admin Menu')
            expect(button.className).toBe('undefined-title-bar-button')
        })

        it('should display the logout button', () => {
            // get button
            const button = output.getByTestId('title-bar-navigation-logout')

            // verifyt the button renders as expected
            expect(button).toBeTruthy()
            expect(button.innerHTML).toBe('Logout')
            expect(button.className).toBe('undefined-title-bar-button')
        })
    })

    describe('verify buttons displayed for an unauthenticated user',() => {

        beforeEach(() => {
            output = renderComponent(false, false)
        })

        it('should display the title', () => {
            // get the title
            const title = output.getByTestId('titlebar-title');
    
            // verify the title renders as expected
            expect(title).toBeTruthy();
            expect(title.innerHTML).toBe('Hack Attack')
            expect(title.className).toBe('Title')
        });
    
        it('should display the home button', () => {
            // Gets the button
            const button = output.getByTestId('title-bar-navigation-home')
    
            // verify the button renders as expected
            expect(button).toBeTruthy()
            expect(button.innerHTML).toBe('Home')
            expect(button.className).toBe('undefined-title-bar-button')
        })
    
        it('should render the leaderboard button', () => {
            // gets the button
            const button = output.getByTestId('title-bar-navigation-leaderboard')
    
            //verify the button renders as expected
            expect(button).toBeTruthy()
            expect(button.innerHTML).toBe('Leaderboard')
            expect(button.className).toBe('undefined-title-bar-button')
        })
    
        it('should render the settings button', () => {
            // gets the button
            const button = output.getByTestId('title-bar-navigation-settings')
    
            // verify the button renders as expected
            expect(button).toBeTruthy()
            expect(button.innerHTML).toBe('Settings')
            expect(button.className).toBe('undefined-title-bar-button')
        })

        it('should display the Admin Login button', () => {
            // get button
            const button = output.getByTestId('title-bar-navigation-login')

            // verify button renders as expected

            expect(button).toBeTruthy()
            expect(button.innerHTML).toBe('Admin Login')
            expect(button.className).toBe('undefined-title-bar-button')
        })

        it('should display the Help button', () => {
            // get button
            const button = output.getByTestId('title-bar-navigation-help')

            // verify button renders as expected

            expect(button).toBeTruthy()
            expect(button.innerHTML).toBe('Help')
            expect(button.className).toBe('undefined-title-bar-button')
        })
    })

    describe('verify the loading clock is displayed when the app is loading', () => {
        beforeEach(() => {
            output = renderComponent(false, true)
        })

        it('should display the loading clock when loading is true', () => {
            const loadingClock = output.getByTestId('loading-clock')

            expect(loadingClock).toBeTruthy()
        })
    })
});
