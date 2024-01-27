import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputText, InputNumber, InputSubmit } from 'components/Inputs';

beforeEach(() => {
    cleanup();
});

describe('Test InputFeedback', () => {
    test('Test render InputText', async () => {
        render(<InputText id="test" options={ { value: 'Test text value', 'aria-label': 'Test input', onChange: () => {} } } />);
        const input = await screen.findByRole('textbox', { name: 'Test input' });

        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('Test text value');
    });

    test('Test user event of InputText', async () => {
        render(<InputText id="test" options={ { value: '', 'aria-label': 'Test input', onChange: () => {} } } />);
        const input = await screen.findByRole('textbox', { name: 'Test input' });

        userEvent.clear(input);
        userEvent.type(input, 'User type');
        expect(input).toHaveValue('User type');
    });
});

describe('Test InputNumber', () => {
    test('Test render InputNumber', async () => {
        render(<InputNumber id="test" options={ { value: 5, 'aria-label': 'Test input', onChange: () => {} } } />);
        const input = await screen.findByRole('textbox', { name: 'Test input' });

        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(5);
    });

    test('Test render InputNumber', async () => {
        render(<InputNumber id="test" options={ { value: 0, 'aria-label': 'Test input', onChange: () => {} } } />);
        const input = await screen.findByRole('textbox', { name: 'Test input' });

        userEvent.clear(input);
        userEvent.type(input, '15');
        expect(input).toHaveValue(15);
    });
});

test('Test render InputSubmit', async () => {
    render(<InputSubmit id="test" options={ { value: 'Submit form', 'aria-label': 'Test input' } } />);
    const input = await screen.findByRole('textbox', { name: 'Test input' });

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Submit form');
});
