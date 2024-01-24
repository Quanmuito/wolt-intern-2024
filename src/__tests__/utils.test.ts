import { getCartValueSurcharge } from 'utils';

describe('Test get cart value surcharge', () => {
    test('Test cart value less than 10', () => {
        expect(getCartValueSurcharge(8.9)).toEqual(1.0);
    });
});
