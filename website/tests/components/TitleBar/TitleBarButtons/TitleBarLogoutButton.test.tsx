import React from 'react';
import { RenderResult, fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import * as router from 'react-router';
import TitleBarLogoutButton from '../../../../src/components/TitleBar/TitleBarButtons/TitleBarLogoutButton';

const navigate = jest.fn();
const mockFunction = jest.fn();

describe('TitleBarLeaderboardButton', () => {

    const buttonId = 'title-bar-navigation-logout'

    let output: RenderResult;

    const renderComponent = () => {
        return render (
            <MemoryRouter>
                <TitleBarLogoutButton method={mockFunction} />
            </MemoryRouter>
        )
    }

    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    });

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

        expect(button.innerHTML).toBe('Logout')
    })

    it('should navigate back to the main menu on click', () => {
        output = renderComponent()

        const button = output.getByTestId(buttonId)

        fireEvent.click(button)

        expect(navigate).toHaveBeenCalled()
        expect(navigate).toHaveBeenCalledWith('/')
        expect(mockFunction).toHaveBeenCalled()
    })
});