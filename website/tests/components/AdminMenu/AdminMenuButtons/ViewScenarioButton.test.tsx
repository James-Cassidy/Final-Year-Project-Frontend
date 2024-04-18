import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RenderResult, act, fireEvent, render } from '@testing-library/react';
import ViewScenarioButton from '../../../../src/components/AdminMenu/AdminMenuButtons/ViewScenarioButton';

describe('view scenario', () => {

    let output: RenderResult;

    let mockedFunction = jest.fn();

    const renderComponent = () => {
        return render(
            <MemoryRouter>
                <ViewScenarioButton scenarios={['test', 'test2']} setScenario={mockedFunction}/>
            </MemoryRouter>
        );
    }

    it('should contain the button', () => {
        output = renderComponent()

        const button = output.getByTestId('view-scenario')

        expect(button).toBeTruthy()
        expect(button.className).toBe('undefined-admin-menu-button')
    })

    it('should display the popup', () => {
        output = renderComponent()

        const button = output.getByTestId('view-scenario')

        fireEvent.click(button)

        const popup = output.getByTestId('view-scenario-popup')

        expect(popup).toBeTruthy()
    })

    it('should close the popup', () => {
        output = renderComponent()

        const button = output.getByTestId('view-scenario')

        fireEvent.click(button)

        const popupButton = output.getByTestId('view-scenario-popup-close-button')

        expect(popupButton).toBeTruthy()

        fireEvent.click(popupButton)

        const popup = output.queryByTestId('view-scenario-popup')

        expect(popup).toBeFalsy()
    })
});
