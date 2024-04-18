import React from 'react';
import { RenderResult, fireEvent, render, waitFor } from '@testing-library/react';
import TitleBarSettingsButton from '../../../../src/components/TitleBar/TitleBarButtons/TitleBarSettingsButton';

describe('title bar settings button', () => {

    const buttonId = 'title-bar-navigation-settings'

    let output: RenderResult;

    const renderComponent = () => {
        return render (
            <TitleBarSettingsButton />
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

        expect(button.innerHTML).toBe('Settings')
    })

    it('should open the pop up when the button is clicked', () => {
        output = renderComponent();

        const button = output.getByTestId(buttonId)

        fireEvent.click(button)

        const popup = output.getByTestId('settings-popup') 
        const popupText = output.getByTestId('settings-popup-text') 

        expect(popup).toBeTruthy()
        expect(popupText).toBeTruthy()
    })

    it('should close the pop up when the close button is clicked', async () => {
        output = renderComponent();

        const button = output.getByTestId(buttonId)

        fireEvent.click(button)

        await waitFor(() => {
            expect(output.getByTestId('settings-popup')).toBeTruthy()
        })

        const closeButton = output.getByTestId('settings-popup-close-button')

        fireEvent.click(closeButton)

        await waitFor(() => {
            expect(output.queryByTestId('settings-popup')).toBeFalsy()
        })
    })
});

