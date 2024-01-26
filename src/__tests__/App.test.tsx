import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

beforeEach(() => {
    render(<App />);
});

test('Test render only', async () => {
    expect(await screen.findByText(/delivery fee calculator/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/order time/i)).toBeInTheDocument();
    expect(await screen.findByText(/total delivery fee/i)).toBeInTheDocument();
});

describe('Test cart value input', () => {
    const cartValueCases: [string, string][] = [
        ['10', '10'],
        ['200', '200'],
        ['20.', '20.'],
        ['20.6', '20.6'],
        ['40.6', '40.6'],
    ];
    test.each(cartValueCases)(
        'Input is %p and display value should be %p',
        async (input, expected) => {
            const cartValueInput = await screen.findByLabelText(/cart value/i);
            expect(cartValueInput).toBeInTheDocument();

            userEvent.clear(cartValueInput);
            userEvent.type(cartValueInput, input);
            userEvent.keyboard('{Enter}');
            expect(cartValueInput).toHaveValue(expected);
        }
    );

    const invalidCardValueCases: [string, RegExp][] = [
        ['8.9.1', /invalid input. error: cart value should be a float number./i],
        ['-8', /invalid input. error: cart value should be positive./i],
    ];
    test.each(invalidCardValueCases)(
        'Input is %p and error should be %p',
        async (input, pattern) => {
            const cartValueInput = await screen.findByLabelText(/cart value/i);
            expect(cartValueInput).toBeInTheDocument();

            userEvent.clear(cartValueInput);
            userEvent.type(cartValueInput, input);
            userEvent.keyboard('{Enter}');
            const error = await screen.findByText(pattern);
            expect(error).toBeInTheDocument();
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
        ['1501,', 1501],
    ];
    test.each(deliveryDistanceCases)(
        'Input is %p and display value should be %p',
        async (input, expected) => {
            const deliveryDistanceInput = await screen.findByLabelText(/delivery distance/i);
            expect(deliveryDistanceInput).toBeInTheDocument();

            userEvent.clear(deliveryDistanceInput);
            userEvent.type(deliveryDistanceInput, input);
            expect(deliveryDistanceInput).toHaveValue(expected);
        }
    );

    const invalidDeliveryDistanceCases: [string, RegExp][] = [
        ['-500', /invalid input. Error: delivery distance should be positive./i],
    ];
    test.each(invalidDeliveryDistanceCases)(
        'Input is %p and error should be %p',
        async (input, pattern) => {
            const deliveryDistanceInput = await screen.findByLabelText(/delivery distance/i);
            expect(deliveryDistanceInput).toBeInTheDocument();

            userEvent.clear(deliveryDistanceInput);
            userEvent.type(deliveryDistanceInput, input);
            userEvent.keyboard('{Enter}');
            const error = await screen.findByText(pattern);
            expect(error).toBeInTheDocument();
        }
    );
});

describe('Test user event on number of items input', () => {
    const numberOfItemsCases: [string, number][] = [
        ['1', 1],
        ['4', 4],
        ['5', 5],
        ['6', 6],
        ['12', 12],
        ['13', 13],
        ['13,', 13],
    ];
    test.each(numberOfItemsCases)(
        'Number of item is %p and display value should be %p',
        async (input, expected) => {
            const numberOfItemsInput = await screen.findByLabelText(/number of items/i);
            expect(numberOfItemsInput).toBeInTheDocument();

            userEvent.clear(numberOfItemsInput);
            userEvent.type(numberOfItemsInput, input);
            expect(numberOfItemsInput).toHaveValue(expected);
        }
    );

    const invalidNumberOfItemsCases: [string, RegExp][] = [
        ['-5', /invalid input. Error: number of items should be positive./i],
    ];
    test.each(invalidNumberOfItemsCases)(
        'Input is %p and error should be %p',
        async (input, pattern) => {
            const numberOfItemsInput = await screen.findByLabelText(/number of items/i);
            expect(numberOfItemsInput).toBeInTheDocument();

            userEvent.clear(numberOfItemsInput);
            userEvent.type(numberOfItemsInput, input);
            userEvent.keyboard('{Enter}');
            const error = await screen.findByText(pattern);
            expect(error).toBeInTheDocument();
        }
    );
});
