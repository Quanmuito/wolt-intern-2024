const DELIVERY_FEE_MAX = 15; // €

const CART_VALUE_MIN = 10; // €
const CART_VALUE_MAX = 200.00; // €

const DISTANCE_INTERVAL = 500; // m
const DISTANCE_SURCHARGE_MIN = 2; // €
const DISTANCE_SURCHARGE_INTERVAL = 1; // €

const NUMBER_INTERVAL = 0.5; // €
const NUMBER_FREE = 4;
const NUMBER_BULK = 12;
const NUMBER_BULK_SURCHARGE = 1.2; // €

const RUSH_HOUR_DAY = 5;
const RUSH_HOURS_START = 15;
const RUSH_HOURS_END = 19;
const RUSH_HOUR_MULTIPLIER = 1.2;

export const getCartValueSurcharge = (cartValue: number): number => {
    const difference = CART_VALUE_MIN - cartValue;
    return (difference > 0) ? difference : 0;
};

export const getDeliveryDistanceSurcharge = (deliveryDistance: number): number => {
    const multiplier = Math.ceil(deliveryDistance / DISTANCE_INTERVAL) - 2;
    return (multiplier < 0)
        ? DISTANCE_SURCHARGE_MIN
        : DISTANCE_SURCHARGE_MIN + multiplier * DISTANCE_SURCHARGE_INTERVAL;
};

export const getNumberOfItemsSurcharge = (numberOfItems: number): number => {
    const exceeded = numberOfItems - NUMBER_FREE;
    const multiplier = (exceeded > 0) ? exceeded : 0;
    const surCharge = NUMBER_INTERVAL * multiplier;

    return (numberOfItems <= NUMBER_BULK)
        ? surCharge
        : surCharge + NUMBER_BULK_SURCHARGE;
};

export const isRushHour = (orderTime: string): boolean => {
    const date = new Date(orderTime);
    // Friday after 3PM and before 7PM
    return date.getDay() === RUSH_HOUR_DAY
        && date.getHours() >= RUSH_HOURS_START
        && date.getHours() < RUSH_HOURS_END;
};

const getFinalFee = (fee: number): number => (fee < DELIVERY_FEE_MAX) ? fee : DELIVERY_FEE_MAX;
export const getDeliveryFee = (
    cartValue: number,
    deliveryDistance: number,
    numberOfItems: number,
    orderTime: string
): number => {
    if (cartValue >= CART_VALUE_MAX) return 0;

    const cartValueSurcharge = getCartValueSurcharge(cartValue);
    const deliveryDistanceSurcharge = getDeliveryDistanceSurcharge(deliveryDistance);
    const itemNumberSurcharge = getNumberOfItemsSurcharge(numberOfItems);

    const deliveryFee = cartValueSurcharge + deliveryDistanceSurcharge + itemNumberSurcharge;
    return isRushHour(orderTime)
        ? getFinalFee(deliveryFee * RUSH_HOUR_MULTIPLIER)
        : getFinalFee(deliveryFee);
};
