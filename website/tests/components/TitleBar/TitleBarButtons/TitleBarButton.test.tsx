import React from 'react';
import { RenderResult, fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TitleBarButton from '../../../../src/components/TitleBar/TitleBarButtons/TitleBarButton';

describe('TitleBarButton', () => {

    let output: RenderResult;
    const mockMethod = jest.fn();

    const renderComponent = () => {
        return render (
            <TitleBarButton id='test' text='Test Button' method={mockMethod} />
        )
    }

    it('Should generate a title bar button component', () => {
        output = renderComponent();

        const button = output.getByTestId('title-bar-navigation-test')

        expect(button).toBeTruthy()
    })

    
    it('should have the correct className', () => {
        output = renderComponent();

        const button = output.getByTestId('title-bar-navigation-test')

        expect(button.className).toBe('undefined-title-bar-button')
    })

    it('should call the method when the button is clicked', () => {
        output = renderComponent();

        const button = output.getByTestId('title-bar-navigation-test')

        fireEvent.click(button)

        expect(mockMethod).toHaveBeenCalled()
    })

    it('should contain the button label', () => {
        output = renderComponent();

        const button = output.getByTestId('title-bar-navigation-test')

        expect(button.innerHTML).toBe('Test Button')
    })
});
