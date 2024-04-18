import React from 'react';
import { render } from '@testing-library/react';
import CustomClockLoader from '../../../src/components/LoadingClock/LoadingClock';

describe('Tests for the loading clock', () => {
    it(' Should update something', () => {
        const clock = render(<CustomClockLoader />);
        expect(clock).toBeTruthy();
    });
});