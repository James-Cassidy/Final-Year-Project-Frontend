import { RenderResult, act, fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as router from 'react-router';
import axios from 'axios';
import React from 'react';
import AdminMenu from '../../src/pages/AdminMenu';

const navigate = jest.fn();
const getAll = jest.fn()

describe('Tests for the admin menu', () => {

    let output: RenderResult;

    const renderComponent = () => {
        return render(
            <MemoryRouter>
                <AdminMenu />
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

    it('Wrapper is present and contains correct class', async () => {
        act(() =>{
            output = renderComponent()
        })

        const comp = output.queryByTestId('admin-menu-wrapper');

        await waitFor(() => {
            expect(comp).toBeTruthy();
        })
    });
});
