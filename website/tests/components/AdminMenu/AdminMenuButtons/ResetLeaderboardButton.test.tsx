import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RenderResult, act, fireEvent, render } from '@testing-library/react';
import ResetLeaderboardButton from '../../../../src/components/AdminMenu/AdminMenuButtons/ResetLeaderboardButton';

describe('admin add update scenario', () => {

    let output: RenderResult;

    let mockedFunction = jest.fn();

    const renderComponent = () => {
        return render(
            <MemoryRouter>
                <ResetLeaderboardButton />
            </MemoryRouter>
        );
    }

    it('should contain the button', () => {
        output = renderComponent()

        const button = output.getByTestId('reset-leaderboard')

        expect(button).toBeTruthy()
        expect(button.className).toBe('undefined-admin-menu-button')
    })

    it('should display the popup', () => {
        output = renderComponent()

        const button = output.getByTestId('reset-leaderboard')

        fireEvent.click(button)

        const popup = output.getByTestId('reset-leaderboard-popup')

        expect(popup).toBeTruthy()
    })

    it('should close the popup', () => {
        output = renderComponent()

        const button = output.getByTestId('reset-leaderboard')

        fireEvent.click(button)

        const popupButton = output.getByTestId('reset-leaderboard-popup-close-button')

        expect(popupButton).toBeTruthy()

        fireEvent.click(popupButton)

        const popup = output.queryByTestId('reset-leaderboard-popup')

        expect(popup).toBeFalsy()
    })
});