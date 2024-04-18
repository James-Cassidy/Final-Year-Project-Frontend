import React, { useContext, useEffect, useState } from 'react';
import { render, fireEvent, waitFor, RenderResult, act } from '@testing-library/react';
import { Account, AccountContext } from '../../src/auth/Account'
import * as AWS from 'amazon-cognito-identity-js'
import userPool from '../../src/auth/userPool';

const testData = {
    score: 12,
    numberOfQuestions: 32,
    numberOfAnsweredQuestions: 12,
    correctAnswers: 12,
    wrongAnswers: 11,
    hintsUsed: 12,
    fiftyFiftyUsed: 5
}

const Test = () => {

    const { authenticate, getSession, logout } = useContext(AccountContext)

    const authenticateButtonHandler = async () => {
        const res = await authenticate('test_user', 'test_account')
    }

    const getSessionHandler = async () => {
        await getSession()
    }

    const logoutHandler = async () => {
        logout()
    }

    return (
        <>
            <button data-testid={'authenticate-button'} onClick={authenticateButtonHandler} ></button>
            <button data-testid={'get-session-button'} onClick={getSessionHandler} ></button>
            <button data-testid={'logout-button'} onClick={logoutHandler} ></button>
        </>
    )
}

describe('tests for account context', () => {

    let output: RenderResult;

    const mockUser = jest.fn()
    const mockUserPool = jest.fn()
    const mockGetSession = jest.fn()
    const mockGetCurrentUser = jest.fn()
    const mockSignout = jest.fn()
    

    mockUserPool.mockReturnValue({
        getCurrentUser: jest.fn().mockReturnValue({
            signOut: mockSignout
        })
    })

    mockGetCurrentUser.mockReturnValue({ 
        user: 'username',
        getSession: mockGetSession,
        signOut: mockSignout
    })

    const authenticateUser = jest.fn().mockImplementation((auth: any, callback: any) => {
        callback.onSuccess({
            getAccessToken: jest.fn().mockReturnValue({
                getJwtToken: jest.fn()
            }),
            getIdToken: jest.fn().mockReturnValue({
                getJwtToken: jest.fn()
            }),
        })
    })

    mockUser.mockReturnValue({
        authenticateUser: authenticateUser,
        signOut: mockSignout
    })

    mockGetSession.mockImplementation((callback) => {
        return { session: 'test session'}
    })

    const renderComponent = () => {
        return render(
        <Account>
            <Test />
        </Account>)
    }

    beforeEach(() => {
        jest.spyOn(AWS, 'CognitoUserPool').mockImplementation(mockUserPool)
        jest.spyOn(AWS, 'CognitoUser').mockImplementation(mockUser)
        jest.spyOn(userPool, 'getCurrentUser').mockImplementation(mockGetCurrentUser)
    })

    it('verifies account is authenticated', async () => {
        output = renderComponent()

        const button = output.getByTestId('authenticate-button')

        act(() => {
            fireEvent.click(button)
        })

        await waitFor(() => {
            expect(authenticateUser).toHaveBeenCalled()
        })
    })

    it('test get session function', async () => {
        output = renderComponent()

        const button = output.getByTestId('get-session-button')

        act(() => {
            fireEvent.click(button)
        })

        await waitFor(() => {
            expect(mockGetCurrentUser).toHaveBeenCalled()
            expect(mockGetSession).toHaveBeenCalled()
        })
    })

    it('test logout function', async () => {
        output = renderComponent()

        const button = output.getByTestId('logout-button')

        act(() => {
            fireEvent.click(button)
        })

        await waitFor(() => {
            expect(mockGetCurrentUser).toHaveBeenCalled()
            expect(mockSignout).toHaveBeenCalled()
        })
    })
});