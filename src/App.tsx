import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from 'components';
import { getDeliveryFee } from 'calculator';
import { InputFields, InputDetails } from 'types';
import {
    TYPE_DATETIME,
    TYPE_NUMBER,
    TYPE_TEXT,
    isZero
} from 'utils';
import style from 'style/style.module.css';

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

export default function App() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<InputFields>();
    const [fee, setFee] = useState<number>(0);

    const onSubmit: SubmitHandler<InputFields> = (data) => {
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

        if (isZero(data.cartValue) && isZero(data.numberOfItems)) {
            setFee(0);
        } else {
            setFee(getDeliveryFee(data.cartValue, data.deliveryDistance, data.numberOfItems, data.orderTime));
        }
    };

    return (
        <div className="App">
            <main className={ style.main }>
                <div className={ style.container }>
                    <h1 className={ style.title }>Delivery Fee Calculator</h1>
                    <form className={ style.form } onSubmit={ handleSubmit(onSubmit) }>
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
                        <button className={ style.submit } type="submit">
                            <h3>Calculate delivery price</h3>
                        </button>
                        <div className={ style.result }>
                            <h3>Total delivery fee (€)</h3>
                            <h3 data-test-id="fee">{ fee.toFixed(2) }</h3>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
