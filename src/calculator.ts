
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

export const getDeliveryDistanceSurcharge = (distance: number): number => {
    if (distance <= DELIVERY_DISTANCE_MINIMUM) {
        return DELIVERY_DISTANCE_SURCHARGE_MINIMUM;
    }

    let ratio = distance / DELIVERY_DISTANCE_INTERVAL;
    let multiplier = Math.ceil(ratio) - 2;
    return DELIVERY_DISTANCE_SURCHARGE_MINIMUM + multiplier * DELIVERY_DISTANCE_SURCHARGE_INTERVAL;
};

export const getItemNumberSurcharge = (itemNumber: number): number => {
    if (itemNumber <= ITEM_NUMBER_FREE) {
        return ITEM_NUMBER_SURCHARGE_MINIMUM;
    }

    let exceeded = itemNumber - ITEM_NUMBER_FREE;
    let exceededSurcharge = exceeded * ITEM_NUMBER_SURCHARGE_INTERVAL;

    if (itemNumber > ITEM_NUMBER_BULK) {
        exceededSurcharge += ITEM_NUMBER_BULK_SURCHARGE;
    }
    return exceededSurcharge;
};

export const getDeliveryFee = (
    cartValue: number,
    distance: number,
    itemNumber: number,
    isRushHour = false
): number => {
    if (cartValue >= CART_VALUE_MAXIMUM) {
        return DELIVERY_FEE_MINIMUM;
    }

    let cartValueSurcharge = getCartValueSurcharge(cartValue);
    let deliveryDistanceSurcharge = getDeliveryDistanceSurcharge(distance);
    let itemNumberSurcharge = getItemNumberSurcharge(itemNumber);
    let deliveryFee = cartValueSurcharge + deliveryDistanceSurcharge + itemNumberSurcharge;
    if (isRushHour) {
        deliveryFee *= RUSH_HOUR_MULTIPLIER;
    }

    return (deliveryFee < DELIVERY_FEE_MAXIMUM) ? deliveryFee : DELIVERY_FEE_MAXIMUM;
};
