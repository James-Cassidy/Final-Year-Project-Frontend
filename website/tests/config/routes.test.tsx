import React from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { RenderResult, act, fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import * as router from 'react-router';
import toast from 'react-hot-toast';
import { AccountContext } from '../../src/auth/Account';
import RenderRoutes from '../../src/config/routes';

const scenarios = ['SQL Injection', 'Buffer Overflow', 'Cross Site Scripting']

describe('admin add update scenario', () => {

    let output: RenderResult;

    let mockedNavigate = jest.fn();
    let mockAuthenticate = jest.fn()
    let mockedError = jest.fn()

    const renderComponent = () => {
        return render(
            <MemoryRouter>
                <AccountContext.Provider value={{authenticate: mockAuthenticate, isLoggedIn: jest.fn(), logout: jest.fn(), getSession: jest.fn()}} >
                    <RenderRoutes />
                </AccountContext.Provider>
            </MemoryRouter>
        );
    }

    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(mockedNavigate)
        jest.spyOn(toast, 'error').mockImplementation(mockedError)
    })

    it('should contain admin login', () => {
        output = renderComponent()

        console.log(output.container.innerHTML)
    })
});
