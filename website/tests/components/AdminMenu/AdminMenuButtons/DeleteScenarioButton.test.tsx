import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RenderResult, act, fireEvent, render } from '@testing-library/react';
import DeleteScenario from '../../../../src/components/AdminMenu/AdminMenuButtons/DeleteScenarioButton';

describe('admin add update scenario', () => {

    let output: RenderResult;

    let mockedFunction = jest.fn();

    const renderComponent = () => {
        return render(
            <MemoryRouter>
                <DeleteScenario scenarios={['test', 'test2']} />
            </MemoryRouter>
        );
    }

    it('should contain the button', () => {
        output = renderComponent()

        const button = output.getByTestId('delete-scenario')

        expect(button).toBeTruthy()
        expect(button.className).toBe('undefined-admin-menu-button')
    })

    it('should display the popup', () => {
        output = renderComponent()

        const button = output.getByTestId('delete-scenario')

        fireEvent.click(button)

        const popup = output.getByTestId('delete-scenario-popup')

        expect(popup).toBeTruthy()
    })

    it('should close the popup', () => {
        output = renderComponent()

        const button = output.getByTestId('delete-scenario')

        fireEvent.click(button)

        const popupButton = output.getByTestId('delete-scenario-popup-close-button')

        expect(popupButton).toBeTruthy()

        fireEvent.click(popupButton)

        const popup = output.queryByTestId('delete-scenario-popup')

        expect(popup).toBeFalsy()
    })
});