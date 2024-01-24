import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Test render', () => {
    test('Test heading', async () => {
        render(<App />);
        expect(await screen.findByText(/delivery fee calculator/i)).toBeInTheDocument();

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
        expect(input).toHaveValue(10);

        userEvent.type(input, '20,6');
        expect(input).toHaveValue(20.60);

        userEvent.type(input, '200');
        expect(input).toHaveValue(200);
    });

    test('Test delivery distance input', async () => {
        render(<App />);
        let input = await screen.findByLabelText(/delivery distance/i);
        let description = await screen.findByText(/the distance between the store and location of customer in meters/i);
        expect(input).toBeInTheDocument();
        expect(description).toBeInTheDocument();

        userEvent.type(input, '1000');
        expect(input).toHaveValue(1000);

        userEvent.type(input, '1500');
        expect(input).toHaveValue(1500);

        userEvent.type(input, '1000.5');
        let errorText = await screen.findByText(/invalid input error: please input an integer/i);
        expect(errorText).toBeInTheDocument();
    });
});
