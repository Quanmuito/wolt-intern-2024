import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Test render', () => {
    test('Test heading', async () => {
        render(<App />);
        expect(await screen.findByText(/delivery fee calculator/i)).toBeInTheDocument();

        expect(await screen.findByLabelText(/delivery distance/i)).toBeInTheDocument();
        expect(await screen.findByLabelText(/number of items/i)).toBeInTheDocument();
        expect(await screen.findByLabelText(/order time/i)).toBeInTheDocument();
        expect(await screen.findByLabelText(/total delivery fee/i)).toBeInTheDocument();
    });

    test('Test cart value input', async () => {
        render(<App />);
        let input = await screen.findByLabelText(/cart value/i);
        let description = await screen.findByText(/value of the shopping cart in euros/i);
        expect(input).toBeInTheDocument();
        expect(description).toBeInTheDocument();

        userEvent.type(input, '10');
        let result1 = await screen.findByLabelText(/total delivery fee/i);
        expect(result1).toHaveValue('2,00');

        userEvent.type(input, '200');
        let result2 = await screen.findByLabelText(/total delivery fee/i);
        expect(result2).toHaveValue('0,00');
    });
});
