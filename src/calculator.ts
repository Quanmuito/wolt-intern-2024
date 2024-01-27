type Config = {
    [index: string]: number
}
export const CONFIG: {[index: string]: Config} = {
    FEE: {
        MAX: 15,
    },
    CART_VALUE: {
        MIN: 10,
        MAX: 200,
    },
    DISTANCE: {
        MIN: 1000,
        INTERVAL: 500,
        SURCHARGE_MIN: 2,
        SURCHARGE_INTERVAL: 1,
    },
    NUMBER: {
        INTERVAL: 0.5,
        FREE: 4,
        BULK: 12,
        BULK_SURCHARGE: 1.2,
    },
    RUSH_HOUR: {
        DAY: 5,
        START: 15,
        END: 19,
        MULTIPLIER: 1.2,
    },
};

export const getCartValueSurcharge = (cartValue: number): number => {
    const difference = CONFIG.CART_VALUE.MIN - cartValue;
    return (difference > 0) ? difference : 0;
};

export const getDeliveryDistanceSurcharge = (deliveryDistance: number): number => {
    const multiplier = Math.ceil(deliveryDistance / CONFIG.DISTANCE.INTERVAL) - 2;
    return (multiplier < 0)
        ? CONFIG.DISTANCE.SURCHARGE_MIN
        : CONFIG.DISTANCE.SURCHARGE_MIN + multiplier * CONFIG.DISTANCE.SURCHARGE_INTERVAL;
};

export const getNumberOfItemsSurcharge = (numberOfItems: number): number => {
    const exceeded = numberOfItems - CONFIG.NUMBER.FREE;
    const multiplier = (exceeded > 0) ? exceeded : 0;
    const surCharge = CONFIG.NUMBER.INTERVAL * multiplier;

    return (numberOfItems <= CONFIG.NUMBER.BULK)
        ? surCharge
        : surCharge + CONFIG.NUMBER.BULK_SURCHARGE;
};

export const isRushHour = (orderTime: string): boolean => {
    const date = new Date(orderTime);
    // Friday after 3PM and before 7PM
    return date.getDay() === CONFIG.RUSH_HOUR.DAY
        && date.getHours() >= CONFIG.RUSH_HOUR.START
        && date.getHours() < CONFIG.RUSH_HOUR.END;
};

const getFinalFee = (fee: number): number => (fee < CONFIG.FEE.MAX) ? fee : CONFIG.FEE.MAX;
export const getDeliveryFee = (
    cartValue: number,
    deliveryDistance: number,
    numberOfItems: number,
    orderTime: string
): number => {
    if (cartValue >= CONFIG.CART_VALUE.MAX) return 0;

    const cartValueSurcharge = getCartValueSurcharge(cartValue);
    const deliveryDistanceSurcharge = getDeliveryDistanceSurcharge(deliveryDistance);
    const itemNumberSurcharge = getNumberOfItemsSurcharge(numberOfItems);

    const deliveryFee = cartValueSurcharge + deliveryDistanceSurcharge + itemNumberSurcharge;
    return isRushHour(orderTime)
        ? getFinalFee(deliveryFee * CONFIG.RUSH_HOUR.MULTIPLIER)
        : getFinalFee(deliveryFee);
};
