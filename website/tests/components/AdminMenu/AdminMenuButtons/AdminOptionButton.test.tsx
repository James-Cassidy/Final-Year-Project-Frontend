import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RenderResult, act, fireEvent, render } from '@testing-library/react';
import AdminOptionButton from '../../../../src/components/AdminMenu/AdminMenuButtons/AdminOptionButton';

describe('admin add update scenario', () => {

    let output: RenderResult;

    let mockedFunction = jest.fn();

    const renderComponent = () => {
        return render(
            <MemoryRouter>
                <AdminOptionButton id={'test-button'} title={'Test Title'} method={mockedFunction} />
            </MemoryRouter>
        );
    }

    it('should render the button', () => {
        output = renderComponent()

        expect(output).toBeTruthy()
    })

    it('should render the button title', () => {
        output = renderComponent()

        const button = output.getByText('Test Title')

        expect(button.innerHTML).toBe('Test Title')
    })

    it('button should contain the id', () => {
        output = renderComponent()

        const button = output.getByText('Test Title')

        expect(button.id).toBe('test-button')
    })

    it('should contain the button class', () => {
        output = renderComponent()

        const button = output.getByText('Test Title')

        expect(button.className).toBe('undefined-admin-menu-button')
    })
});