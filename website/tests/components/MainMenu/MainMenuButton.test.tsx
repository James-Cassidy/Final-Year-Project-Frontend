import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RenderResult, act, fireEvent, render } from '@testing-library/react';
import MainMenuButton from '../../../src/components/MainMenu/MainMenuButton';

describe('admin add update scenario', () => {

    let output: RenderResult;

    let mockedFunction = jest.fn();

    const renderComponent = () => {
        return render(
            <MemoryRouter>
                <MainMenuButton id='test-button' text='Test Button' method={mockedFunction} />
            </MemoryRouter>
        );
    }

    it('should contain the button', () => {
        output = renderComponent()

        const button = output.getByTestId('test-button')

        expect(button).toBeTruthy()
        expect(button.className).toBe('undefined-main-menu-button')
        expect(button.id).toBe('test-button')
    })

    it('calls function on click', () => {
        output = renderComponent()

        const button = output.getByTestId('test-button')

        fireEvent.click(button)

        expect(mockedFunction).toHaveBeenCalled()
    })
});
