import React from 'react';
import { RenderResult, fireEvent, render, waitFor } from '@testing-library/react';
import TitleBarHelpButton from '../../../../src/components/TitleBar/TitleBarButtons/TitleBarHelpButton';

describe('TitleBarHelpButton', () => {

    let output: RenderResult;

    const buttonId = 'title-bar-navigation-help'

    const renderComponent = () => {
        return render (
            <TitleBarHelpButton />
        )
    }

    it('Should generate a title bar button component', () => {
        output = renderComponent();

        const button = output.getByTestId(buttonId)

        expect(button).toBeTruthy()
    })

    
    it('should have the correct className', () => {
        output = renderComponent();

        const button = output.getByTestId(buttonId)

        expect(button.className).toBe('undefined-title-bar-button')
    })

    it('should contain the button label', () => {
        output = renderComponent();

        const button = output.getByTestId(buttonId)

        expect(button.innerHTML).toBe('Help')
    })

    it('should open the pop up when the button is clicked', () => {
        output = renderComponent();

        const button = output.getByTestId(buttonId)

        fireEvent.click(button)

        const popup = output.getByTestId('help-popup') 
        const popupText = output.getByTestId('help-popup-text') 

        expect(popup).toBeTruthy()
        expect(popupText).toBeTruthy()
    })

    it('should close the pop up when the button is not clicked', async () => {
        output = renderComponent();

        const button = output.getByTestId(buttonId)

        fireEvent.click(button)

        const popup = output.queryByTestId('help-popup')

        const popupCloseButton = output.getByTestId('help-popup-close-button')

        fireEvent.click(popupCloseButton)

        await waitFor(() => {
            expect(output.queryByTestId('help-popup'))
        })
    })
});

