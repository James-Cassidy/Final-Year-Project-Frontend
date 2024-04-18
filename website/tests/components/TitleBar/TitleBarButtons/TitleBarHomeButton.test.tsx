import React from 'react';
import { RenderResult, fireEvent, render } from '@testing-library/react';
import TitleBarHelpButton from '../../../../src/components/TitleBar/TitleBarButtons/TitleBarHelpButton';
import { MemoryRouter } from 'react-router';
import TitleBarHomeButton from '../../../../src/components/TitleBar/TitleBarButtons/TitleBarHomeButton';
import * as router from 'react-router';

const navigate = jest.fn();
describe('TitleBarHomeButton', () => {

    let output: RenderResult;

    const buttonId = 'title-bar-navigation-home'

    const renderComponent = () => {
        return render (
            <MemoryRouter>
                <TitleBarHomeButton />
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

        expect(button.innerHTML).toBe('Home')
    })

    it('should navigate to the home page if clicked', () => {
        output = renderComponent();

        const button = output.getByTestId(buttonId)

        fireEvent.click(button)

        expect(navigate).toHaveBeenCalled()
        expect(navigate).toHaveBeenCalledWith('/')
    })
});
