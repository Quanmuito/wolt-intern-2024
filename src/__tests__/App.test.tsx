import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Test render', () => {
    test('Render App', async () => {
        render(<App />);
        expect(await screen.findByText(/delivery fee calculator/i)).toBeInTheDocument();
        expect(await screen.findByLabelText(/cart value/i)).toBeInTheDocument();
        expect(await screen.findByLabelText(/delivery distance/i)).toBeInTheDocument();
        expect(await screen.findByLabelText(/number of items/i)).toBeInTheDocument();
        expect(await screen.findByLabelText(/order time/i)).toBeInTheDocument();
        expect(await screen.findByLabelText(/total delivery fee/i)).toBeInTheDocument();
    });
});
