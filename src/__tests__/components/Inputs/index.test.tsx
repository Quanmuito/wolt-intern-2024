import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import {
    InputText,
    InputNumber,
    InputDatetime,
    InputSubmit,
    InputLabel,
    InputFeedback,
    InputFeedbackDescription,
    InputFeedbackError
} from 'components/Inputs';

beforeEach(() => {
    cleanup();
});

afterEach(() => {
    cleanup();
});

test('Test render InputText', async () => {
    render(<InputText id="test" options={ { value: 'Test text value', 'data-testid': 'input', onChange: () => {} } } />);
    const input = await screen.findByTestId('input');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Test text value');
});

test('Test render InputNumber', async () => {
    render(<InputNumber id="test" options={ { value: 5, 'data-testid': 'input', onChange: () => {} } } />);
    const input = await screen.findByTestId('input');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(5);
});

test('Test render InputDatetime', async () => {
    render(<InputDatetime id="test" options={ { value: '2024-01-25T12:30:00.000', 'data-testid': 'input', onChange: () => {} } } />);
    const input = await screen.findByTestId('input');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('2024-01-25T12:30');
});

test('Test render InputSubmit', async () => {
    render(<InputSubmit id="test" options={ { value: 'Submit form' } } />);
    const input = await screen.findByText('Submit form');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Submit form');
});

test('Test render InputLabel', async () => {
    render(<InputLabel id="test" label="Test label" options={ {} } />);
    expect(await screen.findByText(/test label/i)).toBeInTheDocument();
});

test('Test render InputFeedbackDescription', async () => {
    render(<InputFeedbackDescription id="test" description="Test description" options={ {} } />);
    expect(await screen.findByText(/test description/i)).toBeInTheDocument();
});

test('Test render InputFeedbackError', async () => {
    render(<InputFeedbackError id="test" error="Test error message" options={ {} } />);
    expect(await screen.findByText(/test error message/i)).toBeInTheDocument();
});

describe('Test render InputFeedback', () => {
    test('Render InputFeedback with description only', async () => {
        render(<InputFeedback id="test" description="Test description" options={ {} } />);
        expect(await screen.findByText(/test description/i)).toBeInTheDocument();
    });

    test('Render InputFeedback with error only', async () => {
        render(<InputFeedback id="test" description="" error="Test error message" options={ {} } />);
        expect(await screen.findByText(/test error message/i)).toBeInTheDocument();
    });

    test('Render InputFeedback with both description and error', async () => {
        render(<InputFeedback id="test" description="Test description" error="Test error message" options={ {} } />);
        expect(await screen.findByText(/test error message/i)).toBeInTheDocument();
    });
});
