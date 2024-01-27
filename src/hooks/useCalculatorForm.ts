import { useState } from 'react';
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { CONFIG, isRushHour, getDeliveryFee } from 'calculator';
import { FormValues } from 'types';

type UseCalculatorForm = {
    useFormReturn: UseFormReturn<FormValues>,
    onSubmit: SubmitHandler<FormValues>,
    tooltips: {[index: string]: string},
    fee: string
}

const defaultValues: FormValues = {
    cartValue: 0,
    deliveryDistance: 0,
    numberOfItems: 0,
    orderTime: new Date().toISOString().slice(0, 16),
};

export const useCalculatorForm = (): UseCalculatorForm => {
    const useFormReturn = useForm<FormValues>({ defaultValues: defaultValues });
    const validate = (data: FormValues): boolean => {
        if (Number.isNaN(data.cartValue)) {
            useFormReturn.setError('cartValue', {
                type: 'manual',
                message: 'Cart value should be a float number.',
            });
            return false;
        }

        if (data.cartValue < 0) {
            useFormReturn.setError('cartValue', {
                type: 'manual',
                message: 'Cart value should be positive.',
            });
            return false;
        }

        if (data.deliveryDistance < 0) {
            useFormReturn.setError('deliveryDistance', {
                type: 'manual',
                message: 'Delivery distance should be positive.',
            });
            return false;
        }

        if (data.numberOfItems < 0) {
            useFormReturn.setError('numberOfItems', {
                type: 'manual',
                message: 'Number of items should be positive.',
            });
            return false;
        }

        return true;
    };

    const [fee, setFee] = useState<number>(0);
    const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
        // await new Promise((resolve) => setTimeout(resolve, 500)); // For loading

        const empty = data.cartValue === 0 && data.numberOfItems === 0;
        if (!validate(data) || empty) {
            setFee(0);
            return;
        }

        /** When everything is valid */
        const newFee: number = getDeliveryFee(
            data.cartValue,
            data.deliveryDistance,
            data.numberOfItems,
            data.orderTime
        );
        setFee(newFee);
    };

    return {
        useFormReturn: useFormReturn,
        onSubmit: onSubmit,
        tooltips: getTooltips(useFormReturn.watch()),
        fee: fee.toFixed(2),
    };
};

const getTooltipForCartValue = (current: number): string => {
    if (!Number.isNaN(current) && current >= 0) {
        const remain = CONFIG.CART_VALUE.MAX - current;
        return remain > 0
            ? `${remain}€ more for free delivery`
            : 'Free delivery!';
    }
    return '200€ for free delivery';
};

const getTooltipForDeliveryDistance = (current: number): string => {
    if (!Number.isNaN(current) && Number.isInteger(current) && current > 0) {
        const remain = CONFIG.DISTANCE.MIN - current;
        return remain >= 0
            ? 'Minimum surcharge added'
            : 'Minimum surchage under 1000m';
    }
    return 'Minimum surchage under 1000m';
};

const getTooltipForNumberOfItems = (current: number): string => {
    if (!Number.isNaN(current) && Number.isInteger(current) && current >= 0) {
        if (current <= CONFIG.NUMBER.FREE) {
            const remain = CONFIG.NUMBER.FREE - current;
            return `${remain} left free of charge`;
        }

        if (current <= CONFIG.NUMBER.BULK) {
            const remain = CONFIG.NUMBER.BULK - current;
            return `${remain} left till bulk charge`;
        }

        return 'Bulk charge added';
    }
    return 'Free under 4, bulk over 12';
};

const getTooltipForOrderTime = (current: string): string => (
    isRushHour(current) ? 'Rush hour selected!' : 'No surcharge'
);

const getTooltips = (currentValue: FormValues): {[index: string]: string} => ({
    cartValue: getTooltipForCartValue(currentValue.cartValue),
    deliveryDistance: getTooltipForDeliveryDistance(currentValue.deliveryDistance),
    numberOfItems: getTooltipForNumberOfItems(currentValue.numberOfItems),
    orderTime: getTooltipForOrderTime(currentValue.orderTime),
});
