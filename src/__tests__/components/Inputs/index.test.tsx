import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import {
    InputText,
    InputNumber,
    InputDatetime,
    InputSubmit
} from 'components/Inputs';

beforeEach(() => {
    cleanup();
});
test('Test render InputText', async () => {
    render(<InputText id="test" options={ { value: 'Test text value', 'aria-label': 'Test input', onChange: () => {} } } />);
    const input = await screen.findByRole('textbox', { name: 'Test input' });

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Test text value');
});

test('Test render InputNumber', async () => {
    render(<InputNumber id="test" options={ { value: 5, onChange: () => {} } } />);
    const input = await screen.findByRole('spinbutton');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(5);
});

test('Test render InputDatetime', async () => {
    render(<InputDatetime id="test" options={ { value: '2020-05-12T23:50:21.817', onChange: () => {} } } />);
    const input = await screen.findByRole('spinbutton');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('2020-05-12T23:50:21.817');
});

test('Test render InputSubmit', async () => {
    render(<InputSubmit id="test" options={ { value: 'Submit form' } } />);
    const input = await screen.findByText('Submit form');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Submit form');
});
