import { RenderResult, fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as router from 'react-router';
import axios from 'axios';
import React from 'react';
import AdminLogin from '../../src/pages/AdminLogin';

const navigate = jest.fn();
const getAll = jest.fn()

describe('Tests for the admin login page', () => {

    let output: RenderResult;

    const renderComponent = () => {
        return render(
            <MemoryRouter>
                <AdminLogin />
            </MemoryRouter>
        );
    }

    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
        jest.spyOn(axios, 'get').mockResolvedValue({
            data: ['SQL Injection']
        })
        jest.spyOn(axios, 'post').mockImplementation(getAll)
    });

    it('Wrapper is present and contains correct class', () => {
        output = renderComponent();

        const comp = output.getByTestId('admin-login-container');

        expect(comp).toBeTruthy();
    });
});
