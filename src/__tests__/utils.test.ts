import { getCartValueSurcharge } from 'utils';

describe('Test get cart value surcharge', () => {
    test('Test cart value less than 10', () => {
        expect(getCartValueSurcharge(8.9).toFixed(2)).toEqual(1.1.toFixed(2));
    });
});
