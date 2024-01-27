import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

beforeEach(() => {
    render(<App />);
});

test('Test render', async () => {
    expect(await screen.findByText(/delivery fee calculator/i)).toBeInTheDocument();
    expect(await screen.findByText(/calculate delivery price/i)).toBeInTheDocument();
    expect(await screen.findByText(/total delivery fee/i)).toBeInTheDocument();
});

describe('Test cart value input', () => {
    test('Test render input', async () => {
        expect(await screen.findByText(/200€ more for free delivery/i)).toBeInTheDocument();
        expect(await screen.findByLabelText(/cart value/i)).toBeInTheDocument();
        expect(await screen.findByText(/value of the shopping cart in euros./i)).toBeInTheDocument();
    });

    const cartValueCases: [string, string][] = [
        ['0', '0'],
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

    const tooltipCartValueCases: [string, string|RegExp][] = [
        ['', /200€ for free delivery/i],
        ['6', /194€ more for free delivery/i],
        ['8.9', /191.1€ more for free delivery/i],
        ['100', /100€ more for free delivery/i],
        ['300', /free delivery!/i],
        ['-30', /200€ for free delivery/i],
    ];
    test.each(tooltipCartValueCases)(
        'Input is %p and tooltip should be %p',
        async (input, expected) => {
            const cartValueInput = await screen.findByLabelText(/cart value/i);
            expect(cartValueInput).toBeInTheDocument();

            userEvent.clear(cartValueInput);
            userEvent.type(cartValueInput, input);

            const tooltip = await screen.findByText(expected);
            expect(tooltip).toBeInTheDocument();
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
    test('Test render input', async () => {
        expect(await screen.findByText(/minimum surchage under 1000m/i)).toBeInTheDocument();
        expect(await screen.findByLabelText(/delivery distance/i)).toBeInTheDocument();
        expect(await screen.findByText(/the distance between the store and location of customer in meters./i)).toBeInTheDocument();
    });

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

    const tooltipDeliveryDistanceCases: [string, RegExp][] = [
        ['', /minimum surchage under 1000m/i],
        ['300', /minimum surcharge added/i],
        ['500', /minimum surcharge added/i],
        ['1000', /minimum surcharge added/i],
        ['1000.', /minimum surchage under 1000m/i],
        ['1000.6', /minimum surchage under 1000m/i],
        ['1200', /minimum surchage under 1000m/i],
        ['-1200', /minimum surchage under 1000m/i],
    ];
    test.each(tooltipDeliveryDistanceCases)(
        'Input is %p and tooltip should be %p',
        async (input, expected) => {
            const deliveryDistanceInput = await screen.findByLabelText(/delivery distance/i);
            expect(deliveryDistanceInput).toBeInTheDocument();

            userEvent.clear(deliveryDistanceInput);
            userEvent.type(deliveryDistanceInput, input);

            const tooltip = await screen.findByText(expected);
            expect(tooltip).toBeInTheDocument();
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
    test('Test render input', async () => {
        expect(await screen.findByText(/4 left free of charge/i)).toBeInTheDocument();
        expect(await screen.findByLabelText(/number of items/i)).toBeInTheDocument();
        expect(await screen.findByText(/The number of items in the shopping cart of customer./i)).toBeInTheDocument();
    });

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

    const tooltipNumberOfItemsCases: [string, RegExp][] = [
        ['', /free under 4, bulk over 12/i],
        ['2', /2 left free of charge/i],
        ['3', /1 left free of charge/i],
        ['5', /7 left till bulk charge/i],
        ['8', /4 left till bulk charge/i],
        ['14', /bulk charge added/i],
        ['14.', /free under 4, bulk over 12/i],
        ['14.6', /free under 4, bulk over 12/i],
        ['-5', /free under 4, bulk over 12/i],
    ];
    test.each(tooltipNumberOfItemsCases)(
        'Input is %p and tooltip should be %p',
        async (input, expected) => {
            const numberOfItemsInput = await screen.findByLabelText(/number of items/i);
            expect(numberOfItemsInput).toBeInTheDocument();

            userEvent.clear(numberOfItemsInput);
            userEvent.type(numberOfItemsInput, input);

            const tooltip = await screen.findByText(expected);
            expect(tooltip).toBeInTheDocument();
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

describe('Test user event on order time input', () => {
    test('Test render input', async () => {
        expect(await screen.findByLabelText(/order time/i)).toBeInTheDocument();
        expect(await screen.findByText(/The datetime when the order is being made/i)).toBeInTheDocument();
    });
});
