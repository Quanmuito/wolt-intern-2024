import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from 'components';
import { getDeliveryFee } from 'calculator';
import { AppState, InputDetails } from 'types';
import {
    TYPE_DATETIME,
    TYPE_NUMBER,
    TYPE_TEXT,
    isZero
} from 'utils';

const INPUT_DETAILS: InputDetails[] = [
    {
        id: 'cartValue',
        label: 'Cart value (€)',
        type: TYPE_TEXT,
        description: 'Value of the shopping cart in euros.',
    },
    {
        id: 'deliveryDistance',
        label: 'Delivery distance (meters)',
        type: TYPE_NUMBER,
        description: 'The distance between the store and location of customer in meters.',
    },
    {
        id: 'numberOfItems',
        label: 'Number of items',
        type: TYPE_NUMBER,
        description: 'The number of items in the shopping cart of customer.',
    },
    {
        id: 'orderTime',
        label: 'Order time (datetime)',
        type: TYPE_DATETIME,
        description: 'The date/time when the order is being made',
    },
];

const initialState: AppState = {
    cartValue: 0,
    deliveryDistance: 0,
    numberOfItems: 0,
    orderTime: new Date().toISOString().slice(0, 16),
};

export default function App() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<AppState>();
    const [appState, setAppState] = useState<AppState>(initialState);

    const getResult = (): number => {
        if (isZero(appState.cartValue) && isZero(appState.numberOfItems)) {
            return 0;
        }
        return getDeliveryFee(
            appState.cartValue,
            appState.deliveryDistance,
            appState.numberOfItems,
            appState.orderTime
        );
    };

    const onSubmit: SubmitHandler<AppState> = (data) => {
        if (isNaN(data.cartValue)) {
            setError('cartValue', {
                type: 'manual',
                message: 'Cart value should be a float number.',
            });
            return;
        }

        if (data.cartValue < 0) {
            setError('cartValue', {
                type: 'manual',
                message: 'Cart value should be positive.',
            });
            return;
        }

        if (data.deliveryDistance < 0) {
            setError('deliveryDistance', {
                type: 'manual',
                message: 'Delivery distance should be positive.',
            });
            return;
        }

        if (data.numberOfItems < 0) {
            setError('numberOfItems', {
                type: 'manual',
                message: 'Number of items should be positive.',
            });
            return;
        }

        setAppState({ ...data });
    };

    return (
        <div className="App">
            <h1>Delivery Fee Calculator</h1>
            <form onSubmit={ handleSubmit(onSubmit) }>
                {
                    INPUT_DETAILS.map(({ id, label, type, description }) => (
                        <Input
                            key={ id }
                            id={ id }
                            label={ label }
                            type={ type }
                            description={ description }
                            register={ register }
                            errorMessage={ errors[id]?.message ?? '' }
                            datetime={ type === TYPE_DATETIME }
                        />
                    ))
                }
                <button type="submit">Calculate price</button>
                <div data-test-id="fee">Total delivery fee: { getResult().toFixed(2) }</div>
            </form>
        </div>
    );
}
