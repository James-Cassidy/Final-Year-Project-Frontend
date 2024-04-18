import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RenderResult, fireEvent, render } from '@testing-library/react';
import HelpPopUp from '../../../src/components/popups/HelpPopUp';

describe('help popups test', () => {

    let output: RenderResult;

    let mockedFunction = jest.fn();

    const renderComponent = () => {
        return render(
            <MemoryRouter>
                <HelpPopUp open={true} onClose={mockedFunction} />
            </MemoryRouter>
        );
    }

    it('Should display the help popup with correct instructions', () => {
        output = renderComponent();

        const popup = output.getByTestId('help-popup');
        expect(popup).toBeTruthy();

        const popupText = output.getByTestId('help-popup-text');

        expect(popup.innerHTML).toContain("To pick a game scenario, select one of the options on the home page.")
        expect(popup.innerHTML).toContain("Current Scenario options are:")
        expect(popup.innerHTML).toContain("To change your settings, click the Settings button on the navigation bar at the top of the screen.")
        expect(popup.innerHTML).toContain("To view how other players have done, view the leaderboards, by clicking the Leaderboard button at the top of the screen.")
        expect(popup.innerHTML).toContain('To close pop ups, click the "Back" button at the bottom of the pop up.')
        expect(popupText.innerHTML).toContain("SQL Injection")
        expect(popupText.innerHTML).toContain("Distributed Denial of Service")
        expect(popupText.innerHTML).toContain("Cross Site Scripting")
        expect(popupText.innerHTML).toContain("Buffer Overflow")
    });

    it('Should contain the pop up title', () => {
        output = renderComponent()

        const popupTitle = output.getByTestId('pop-up-title')
        
        expect(popupTitle).toBeTruthy()
        expect(popupTitle.innerHTML).toBe('Help')
    })

    it('Should display the help popup', () => {
        output = renderComponent();

        const popup = output.getByTestId('help-popup');
        expect(popup).toBeTruthy();

        const popupButton = output.getByTestId('help-popup-close-button');
        expect(popupButton).toBeTruthy();

        fireEvent.click(popupButton);

        expect(mockedFunction).toHaveBeenCalled();
    });
});