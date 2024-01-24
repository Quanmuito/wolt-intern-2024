import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Test render only', async () => {
    render(<App />);
    expect(await screen.findByText(/delivery fee calculator/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/total delivery fee/i)).toBeInTheDocument();
});

describe('Test cart value input', () => {
    const cartValueCases: [string, number][] = [
        ['10', 10],
        ['200', 200],
        ['20.6', 20.6],
        ['40.6', 40.6],
    ];
    test.each(cartValueCases)(
        'Cart value is %p and display value should be %p',
        async (input, expected) => {
            render(<App />);
            let cartValueInput = await screen.findByLabelText(/cart value/i);
            expect(cartValueInput).toBeInTheDocument();

            userEvent.type(cartValueInput, input);
            expect(cartValueInput).toHaveValue(expected);
        }
    );

    test('Test input invalid', async () => {
        render(<App />);
        let deliveryDistanceInput = await screen.findByLabelText(/delivery distance/i);
        expect(deliveryDistanceInput).toBeInTheDocument();

        userEvent.type(deliveryDistanceInput, '-1000.5');
        let errorMessage = await screen.findByText(/invalid input. error: please input a float/i);
        expect(errorMessage).toBeInTheDocument();
    });
});

describe('Test user event on delivery distance input', () => {
    const deliveryDistanceCases: [string, number][] = [
        ['500', 500],
        ['1000', 1000],
        ['1200', 1200],
        ['1499', 1499],
        ['1500', 1500],
        ['1501', 1501],
    ];
    test.each(deliveryDistanceCases)(
        'Delivery distance is %p and display value should be %p',
        async (input, expected) => {
            render(<App />);
            let deliveryDistanceInput = await screen.findByLabelText(/delivery distance/i);
            expect(deliveryDistanceInput).toBeInTheDocument();

            userEvent.type(deliveryDistanceInput, input);
            expect(deliveryDistanceInput).toHaveValue(expected);
        }
    );

    test('Test input float instead of integer', async () => {
        render(<App />);
        let deliveryDistanceInput = await screen.findByLabelText(/delivery distance/i);
        expect(deliveryDistanceInput).toBeInTheDocument();

        userEvent.type(deliveryDistanceInput, '1000.5');
        let errorMessage = await screen.findByText(/invalid input. error: please input an integer/i);
        expect(errorMessage).toBeInTheDocument();
    });
});

describe('Test user event on number of items input', () => {
    const numberOfItemsCases: [string, number][] = [
        ['1', 1],
        ['4', 4],
        ['5', 5],
        ['6', 6],
        ['12', 12],
        ['13', 13],
    ];
    test.each(numberOfItemsCases)(
        'Number of item is %p and display value should be %p',
        async (input, expected) => {
            render(<App />);
            let numberOfItemsInput = await screen.findByLabelText(/number of items/i);
            expect(numberOfItemsInput).toBeInTheDocument();

            userEvent.type(numberOfItemsInput, input);
            expect(numberOfItemsInput).toHaveValue(expected);
        }
    );

    test('Test input float instead of integer', async () => {
        render(<App />);
        let numberOfItemsInput = await screen.findByLabelText(/number of items/i);
        expect(numberOfItemsInput).toBeInTheDocument();

        userEvent.type(numberOfItemsInput, '13.5');
        let errorMessage = await screen.findByText(/invalid input. error: please input an integer/i);
        expect(errorMessage).toBeInTheDocument();
    });
});
