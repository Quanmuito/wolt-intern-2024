import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Test render heading', async () => {
    render(<App />);
    expect(await screen.findByText(/delivery fee calculator/i)).toBeInTheDocument();

    expect(await screen.findByLabelText(/number of items/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/order time/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/total delivery fee/i)).toBeInTheDocument();
});

describe('Test cart value input', () => {
    const cartValueCases: [string, number][] = [
        ['10', 10],
        ['200', 200],
        ['20.6', 20.6],
        ['40,6', 40.6],
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
