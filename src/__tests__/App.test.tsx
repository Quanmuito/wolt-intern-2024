import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Setup test', () => {
    test('Render App', async () => {
        render(<App />);
        expect(await screen.findByText(/hello world/i)).toBeInTheDocument();
    });
});
