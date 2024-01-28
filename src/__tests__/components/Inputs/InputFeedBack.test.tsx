import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { InputFeedback, InputFeedbackDescription, InputFeedbackError } from 'components/Inputs/InputFeedback';

beforeEach(() => {
    cleanup();
});

afterEach(() => {
    cleanup();
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
