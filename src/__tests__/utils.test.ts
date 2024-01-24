import {
    getCartValueSurcharge,
    getDeliveryDistanceSurcharge,
    getNumberOfItemsSurcharge,
    isRushHour,
    getDeliveryFee
} from 'utils';

const cartValueCases = [
    [5.00, 5.00],
    [8.90, 1.10],
    [9.90, 0.10],
    [10.00, 0.00],
    [10.10, 0.00],
    [11.00, 0.00],
];
describe('Test get cart value surcharge', () => {
    test.each(cartValueCases)(
        'Cart value is %p and surcharge amount should be %p',
        (cartValue, surcharge) => {
            let result = getCartValueSurcharge(cartValue);
            expect(result.toFixed(2)).toEqual(surcharge.toFixed(2));
        }
    );
});

const deliveryDistanceCases = [
    [900, 2.00],
    [1000, 2.00],
    [1001, 3.00],
    [1499, 3.00],
    [1500, 3.00],
    [1501, 4.00],
];
describe('Test get delivery distance surcharge', () => {
    test.each(deliveryDistanceCases)(
        'Delivery distance is %p and surcharge amount should be %p',
        (deliveryDistance, surcharge) => {
            let result = getDeliveryDistanceSurcharge(deliveryDistance);
            expect(result.toFixed(2)).toEqual(surcharge.toFixed(2));
        }
    );
});

const numberOfItemsCases = [
    [4, 0.00],
    [5, 0.50],
    [10, 3.00],
    [13, 5.70],
    [14, 6.20],
];
describe('Test get number of items surcharge', () => {
    test.each(numberOfItemsCases)(
        'Number of items is %p and surcharge amount should be %p',
        (numberOfItems, surcharge) => {
            let result = getNumberOfItemsSurcharge(numberOfItems);
            expect(result.toFixed(2)).toEqual(surcharge.toFixed(2));
        }
    );
});

const rushHourCases: [string, boolean][] = [
    ['2024-01-25T12:30', false], // not Fri, not rush hour
    ['2024-01-25T15:30', false], // not Fri, rush hour
    ['2024-01-26T12:30', false], // Fri, before rush hour
    ['2024-01-26T15:30', true],
    ['2024-01-26T16:30', true],
    ['2024-01-26T17:30', true],
    ['2024-01-26T18:30', true],
    ['2024-01-26T19:30', false], // Fri, after rush hour
    ['2024-01-26T20:30', false], // Fri, after rush hour
];
describe('Test check rush hour', () => {
    test.each(rushHourCases)(
        'Input timestamp is %p and result should be %p',
        (timestamp, expected) => {
            let result = isRushHour(timestamp);
            expect(result).toBe(expected);
        }
    );
});

const deliveryFeeCases: [number, number, number, string, number][] = [
    [0.00, 0, 0, '2024-01-25T12:30', 0.00], // Default
    [5.00, 0, 0, '2024-01-25T12:30', 7.00],
    [7.70, 0, 0, '2024-01-25T12:30', 4.30],
    [10.00, 0, 0, '2024-01-25T12:30', 2.0],
    [20.00, 0, 0, '2024-01-25T12:30', 2.0],
    [20.00, 500, 0, '2024-01-25T12:30', 2.0],
    [20.00, 1000, 0, '2024-01-25T12:30', 2.0],
    [20.00, 1499, 0, '2024-01-25T12:30', 3.0],
    [20.00, 1500, 0, '2024-01-25T12:30', 3.0],
    [20.00, 1501, 0, '2024-01-25T12:30', 4.0],
    [20.00, 1501, 2, '2024-01-25T12:30', 4.0],
    [20.00, 1501, 4, '2024-01-25T12:30', 4.0],
    [20.00, 1501, 5, '2024-01-25T12:30', 4.5],
    [20.00, 1501, 7, '2024-01-25T12:30', 5.5],
    [20.00, 1501, 12, '2024-01-25T12:30', 8.0],
    [20.00, 1501, 13, '2024-01-25T12:30', 9.7],
    [20.00, 1501, 13, '2024-01-26T17:30', 11.64],
];
describe('Test get delivery fee', () => {
    test.each(deliveryFeeCases)(
        'Inputs: cartValue %p, distance %p, items %p, date %p and fee shoulld be %p',
        (cartValue, deliveryDistance, numberOfItems, orderTime, fee) => {
            let result = getDeliveryFee(cartValue, deliveryDistance, numberOfItems, orderTime);
            expect(result.toFixed(2)).toBe(fee.toFixed(2));
        }
    );
});
