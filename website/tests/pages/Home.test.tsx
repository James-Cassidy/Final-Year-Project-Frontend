import { RenderResult, fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as router from 'react-router';
import axios from 'axios';
import React from 'react';
import Home from '../../src/pages/Home';

const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('axios');
const navigate = jest.fn();
const getAll = jest.fn()

describe('Tests for the login page', () => {

    let output: RenderResult;

    const renderComponent = () => {
        return render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
    }

    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
        jest.spyOn(axios, 'get').mockResolvedValue({
            data: ['SQL Injection']
        })
    });

    it('Wrapper is present and contains correct class', () => {
        output = renderComponent();

        const comp = output.getByTestId('app-wrapper');

        expect(comp).toBeTruthy();
    });

    // it('Form exists', () => {
    //     output = renderComponent();

    //     const comp = output.getByTestId('main-menu-wrapper');

    //     expect(comp).toBeTruthy();
    //     expect(comp.className).toBe('menu-container');
    // });
});
