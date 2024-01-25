const DELIVERY_FEE_MINIMUM = 0.00; // €
const DELIVERY_FEE_MAXIMUM = 15.00; // €
const CART_VALUE_MINIMUM = 10.00; // €
const CART_VALUE_MAXIMUM = 200.00; // €
const CART_VALUE_SURCHARGE_MINIMUM = 0.00; // €
const DELIVERY_DISTANCE_MINIMUM = 1000; // m
const DELIVERY_DISTANCE_INTERVAL = 500; // m
const DELIVERY_DISTANCE_SURCHARGE_MINIMUM = 2.00; // €
const DELIVERY_DISTANCE_SURCHARGE_INTERVAL = 1.00; // €
const ITEM_NUMBER_SURCHARGE_MINIMUM = 0.00; // €
const ITEM_NUMBER_SURCHARGE_INTERVAL = 0.50; // €
const ITEM_NUMBER_FREE = 4;
const ITEM_NUMBER_BULK = 12;
const ITEM_NUMBER_BULK_SURCHARGE = 1.20; // €
const RUSH_HOUR_DAY = 5;
const RUSH_HOURS_START = 15;
const RUSH_HOURS_END = 19;
const RUSH_HOUR_MULTIPLIER = 1.20;

export const getCartValueSurcharge = (cartValue: number): number => {
    if (cartValue >= CART_VALUE_MINIMUM) {
        return CART_VALUE_SURCHARGE_MINIMUM;
    }
    return CART_VALUE_MINIMUM - cartValue;
};

export const getDeliveryDistanceSurcharge = (deliveryDistance: number): number => {
    if (deliveryDistance <= DELIVERY_DISTANCE_MINIMUM) {
        return DELIVERY_DISTANCE_SURCHARGE_MINIMUM;
    }

    const ratio = deliveryDistance / DELIVERY_DISTANCE_INTERVAL;
    const multiplier = Math.ceil(ratio) - 2;
    return DELIVERY_DISTANCE_SURCHARGE_MINIMUM + multiplier * DELIVERY_DISTANCE_SURCHARGE_INTERVAL;
};

export const getNumberOfItemsSurcharge = (numberOfItems: number): number => {
    if (numberOfItems <= ITEM_NUMBER_FREE) {
        return ITEM_NUMBER_SURCHARGE_MINIMUM;
    }

    const exceeded = numberOfItems - ITEM_NUMBER_FREE;
    const exceededSurcharge = exceeded * ITEM_NUMBER_SURCHARGE_INTERVAL;

    if (numberOfItems > ITEM_NUMBER_BULK) {
        return exceededSurcharge + ITEM_NUMBER_BULK_SURCHARGE;
    }
    return exceededSurcharge;
};

export const isRushHour = (orderTime: string): boolean => {
    const date = new Date(orderTime);
    const day = date.getDay();
    const hour = date.getHours();

    if (day !== RUSH_HOUR_DAY) {
        return false;
    }

    //  Before 3PM or after 7PM
    if (hour < RUSH_HOURS_START || hour >= RUSH_HOURS_END) {
        return false;
    }

    return true;
};

export const getDeliveryFee = (
    cartValue: number,
    deliveryDistance: number,
    numberOfItems: number,
    orderTime: string
): number => {
    if (cartValue >= CART_VALUE_MAXIMUM) {
        return DELIVERY_FEE_MINIMUM;
    }

    const cartValueSurcharge = getCartValueSurcharge(cartValue);
    const deliveryDistanceSurcharge = getDeliveryDistanceSurcharge(deliveryDistance);
    const itemNumberSurcharge = getNumberOfItemsSurcharge(numberOfItems);
    const deliveryFee = cartValueSurcharge + deliveryDistanceSurcharge + itemNumberSurcharge;

    if (isRushHour(orderTime)) {
        const rushHourFee = deliveryFee * RUSH_HOUR_MULTIPLIER;
        return (rushHourFee < DELIVERY_FEE_MAXIMUM) ? rushHourFee : DELIVERY_FEE_MAXIMUM;
    }

    return (deliveryFee < DELIVERY_FEE_MAXIMUM) ? deliveryFee : DELIVERY_FEE_MAXIMUM;
};
