import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RenderResult, act, fireEvent, render } from '@testing-library/react';
import AddUpdateScenario from '../../../src/components/AdminMenu/AddUpdateScenario';

describe('admin add update scenario', () => {

    let output: RenderResult;

    let mockedSetValue = jest.fn();
    let mockedSetScenario = jest.fn()

    const renderComponent = () => {
        return render(
            <MemoryRouter>
                <AddUpdateScenario scenario={''} setScenario={mockedSetScenario} value={''} setValue={mockedSetValue} />
            </MemoryRouter>
        );
    }

    it('should render the component', () => {
        output = renderComponent()

        expect(output).toBeTruthy()
    })

    it('should render the wrapper', () => {
        output = renderComponent()

        const wrapper = output.getByTestId('scenario-wrapper')

        expect(wrapper).toBeTruthy()
        expect(wrapper.className).toBe('scenario-wrapper')
    })

    it('should render the container', () => {
        output = renderComponent()

        const container = output.getByTestId('scenario-container')

        expect(container).toBeTruthy()
        expect(container.className).toBe('scenario-container')
    })

    it('should contain the scenario instructions', () => {
        output = renderComponent()

        const instructions = output.getByTestId('admin-scenario-instructions')

        expect(instructions).toBeTruthy()
        expect(instructions.className).toBe("admin-instructions")
    })

    it('should contain the text area for updating the scenario', () => {
        output = renderComponent()

        const textEditor = output.getByTestId('admin-menu-json-editor')

        expect(textEditor).toBeTruthy()
        expect(textEditor.className).toBe('admin-scenario-edit-box')
    })

    it('should update the text box when a user enters data', () => {
        output = renderComponent()

        const textEditor = output.getByTestId('admin-menu-json-editor') as HTMLTextAreaElement

        fireEvent.change(textEditor, { target: { value: "new value" }})

        expect(mockedSetScenario).toHaveBeenCalledTimes(1)
        expect(mockedSetValue).toHaveBeenCalled()
    })
});