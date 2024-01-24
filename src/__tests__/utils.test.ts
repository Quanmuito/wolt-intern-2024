import {
    getCartValueSurcharge,
    getDeliveryDistanceSurcharge,
    getNumberOfItemsSurcharge,
    isRushHour
} from 'utils';

const cartValueCases = [
    [5.0, 5.0],
    [8.9, 1.1],
    [9.9, 0.1],
    [10.0, 0.0],
    [10.1, 0.0],
    [11.0, 0.0],
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
    [900, 2.0],
    [1000, 2.0],
    [1001, 3.0],
    [1499, 3.0],
    [1500, 3.0],
    [1501, 4.0],
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
    [4, 0.0],
    [5, 0.5],
    [10, 3.0],
    [13, 5.7],
    [14, 6.2],
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
