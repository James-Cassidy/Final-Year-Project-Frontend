import React from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { RenderResult, act, fireEvent, render, waitFor } from '@testing-library/react';
import * as router from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import App from '../src/App'

describe('App tests', () => {

    let output: RenderResult;

    let mockedFunction = jest.fn();
    let mockedGet = jest.fn()
    let mockedNavigate = jest.fn()
    let mockedError = jest.fn()

    const renderComponent = () => {
        return render(
            <App />
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

    it('renders the app', () => {
        output = renderComponent()

        expect(output).toBeTruthy()
    })
});
