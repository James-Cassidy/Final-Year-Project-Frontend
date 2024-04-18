import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RenderResult, act, fireEvent, render, waitFor } from '@testing-library/react';
import * as router from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import FiftyFiftyPopUp from '../../../src/components/popups/FiftyFiftyPopUp';

describe('delete scenario', () => {

    let output: RenderResult;

    let mockedFunction = jest.fn();

    const popupId = 'fiftyfifty-popup'

    const renderComponent = (open: boolean) => {
        return render(
            <MemoryRouter>
                <FiftyFiftyPopUp open={open} onClose={mockedFunction} />
            </MemoryRouter>
        );
    }

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('Should display the popup when open is true', () => {
        output = renderComponent(true)

        const popup = output.getByTestId(popupId)

        expect(popup).toBeTruthy()
    })

    it('should not display the popup when open is false', () => {
        output = renderComponent(false)

        const popup = output.queryByTestId(popupId)

        expect(popup).toBeFalsy
    })

    it('verify contents', () => {
        output = renderComponent(true)

        const title = output.getByText('FiftyFifty')

        expect(title).toBeTruthy()

        const prompt = output.getByText('Contacting a cyber specialist now')

        expect(prompt).toBeTruthy()
    })

    it('closes the popup when back is pressed', async () => {
        output = renderComponent(true)

        const backButton = output.getByTestId('fiftyfifty-popup-close-button')

        act(() => {
            fireEvent.click(backButton)
        })

        await waitFor(() => {
            expect(mockedFunction).toHaveBeenCalled()
        })
    })
});
