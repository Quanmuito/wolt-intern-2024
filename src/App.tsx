import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from 'components';
import { getDeliveryFee } from 'calculator';
import { AppState, FormFields, InputDetails } from 'types';
import {
    TYPE_DATETIME,
    TYPE_INT,
    TYPE_FLOAT,
    isZero
} from 'utils';

const INPUT_DETAILS: InputDetails[] = [
    {
        id: 'cartValue',
        label: 'Cart value (€)',
        type: TYPE_FLOAT,
        description: 'Value of the shopping cart in euros.',
    },
    {
        id: 'deliveryDistance',
        label: 'Delivery distance (meters)',
        type: TYPE_INT,
        description: 'The distance between the store and location of customer in meters.',
    },
    {
        id: 'numberOfItems',
        label: 'Number of items',
        type: TYPE_INT,
        description: 'The number of items in the shopping cart of customer.',
    },
    {
        id: 'orderTime',
        label: 'Order time (datetime)',
        type: TYPE_DATETIME,
        description: 'The date/time when the order is being made',
    },
];

export default function App() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<FormFields>();
    const [appState, setAppState] = useState<AppState>({
        cartValue: 0,
        deliveryDistance: 0,
        numberOfItems: 0,
        orderTime: new Date().toISOString().slice(0, 16),
    });

    const getResult = (): number => {
        if (isZero(appState.cartValue) && isZero(appState.numberOfItems)) {
            return 0;
        }
        return getDeliveryFee(appState);
    };

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        if (isNaN(data.cartValue)) {
            setError('cartValue', {
                type: 'manual',
                message: 'Cart value should be a number.',
            });
        } else {
            setAppState({ ...data });
        }
    };

    const renderInput = (inputDetails: InputDetails): JSX.Element => {
        return (
            <Input
                key={ inputDetails.id }
                label={ inputDetails.label }
                id={ inputDetails.id }
                type={ inputDetails.type }
                description={ inputDetails.description }
                register={ register }
                errorMessage={ errors[inputDetails.id]?.message ?? '' }
                { ...(inputDetails.type === TYPE_DATETIME) ? { datetime: true } : {} }
            />
        );
    };

    return (
        <div className="App">
            <main>
                <div>
                    <h1>Delivery Fee Calculator</h1>
                    <form onSubmit={ handleSubmit(onSubmit) }>
                        {
                            INPUT_DETAILS.map((inputDetails) => renderInput(inputDetails))
                        }
                        <button type="submit">Calculate price</button>
                        <Input
                            label="Total Delivery Fee (€)"
                            id="fee"
                            type={ TYPE_FLOAT }
                            description="Total cost of delivery in euros"
                            readOnly
                            value={ getResult().toFixed(2) }
                        />
                    </form>
                </div>
            </main>
        </div>
    );
}
