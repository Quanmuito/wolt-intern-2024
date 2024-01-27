import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { InputLabel } from 'components/Inputs/InputLabel';

beforeEach(() => {
    cleanup();
});

test('Test render InputLabel', async () => {
    render(<InputLabel id="test" label="Test label" options={ {} } />);
    expect(await screen.findByText(/test label/i)).toBeInTheDocument();
});
