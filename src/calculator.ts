import { FRIDAY } from 'utils';

const DELIVERY_FEE_MINIMUM = 0.0; // €
const DELIVERY_FEE_MAXIMUM = 15.0; // €
const CART_VALUE_MINIMUM = 10.0; // €
const CART_VALUE_MAXIMUM = 200.0; // €
const CART_VALUE_SURCHARGE_MINIMUM = 0.0; // €
const DELIVERY_DISTANCE_MINIMUM = 1000; // m
const DELIVERY_DISTANCE_INTERVAL = 500; // m
const DELIVERY_DISTANCE_SURCHARGE_MINIMUM = 2.0; // €
const DELIVERY_DISTANCE_SURCHARGE_INTERVAL = 1.0; // €
const ITEM_NUMBER_SURCHARGE_MINIMUM = 0.0; // €
const ITEM_NUMBER_SURCHARGE_INTERVAL = 0.5; // €
const ITEM_NUMBER_FREE = 4;
const ITEM_NUMBER_BULK = 12;
const ITEM_NUMBER_BULK_SURCHARGE = 1.2; // €
const RUSH_HOURS_START = 15;
const RUSH_HOURS_END = 19;
const RUSH_HOUR_MULTIPLIER = 1.2;

export const validate = (): boolean => {
    return true;
};

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

    let ratio = deliveryDistance / DELIVERY_DISTANCE_INTERVAL;
    let multiplier = Math.ceil(ratio) - 2;
    return DELIVERY_DISTANCE_SURCHARGE_MINIMUM + multiplier * DELIVERY_DISTANCE_SURCHARGE_INTERVAL;
};

export const getItemNumberSurcharge = (numberOfItems: number): number => {
    if (numberOfItems <= ITEM_NUMBER_FREE) {
        return ITEM_NUMBER_SURCHARGE_MINIMUM;
    }

    let exceeded = numberOfItems - ITEM_NUMBER_FREE;
    let exceededSurcharge = exceeded * ITEM_NUMBER_SURCHARGE_INTERVAL;

    if (numberOfItems > ITEM_NUMBER_BULK) {
        exceededSurcharge += ITEM_NUMBER_BULK_SURCHARGE;
    }
    return exceededSurcharge;
};

export const isRushHour = (orderTime: string): boolean => {
    let date = new Date(orderTime);
    let day = date.getDay();
    let hour = date.getHours();

    if (day !== FRIDAY) {
        return false;
    }

    //  Before 3PM or after 7PM
    if (hour < RUSH_HOURS_START || hour > RUSH_HOURS_END) {
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

    let cartValueSurcharge = getCartValueSurcharge(cartValue);
    let deliveryDistanceSurcharge = getDeliveryDistanceSurcharge(deliveryDistance);
    let itemNumberSurcharge = getItemNumberSurcharge(numberOfItems);
    let deliveryFee = cartValueSurcharge + deliveryDistanceSurcharge + itemNumberSurcharge;
    if (isRushHour(orderTime)) {
        deliveryFee *= RUSH_HOUR_MULTIPLIER;
    }

    return (deliveryFee < DELIVERY_FEE_MAXIMUM) ? deliveryFee : DELIVERY_FEE_MAXIMUM;
};
