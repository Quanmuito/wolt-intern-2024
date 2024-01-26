import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from 'components';
import { getDeliveryFee } from 'calculator';
import { FormValues } from 'types';
import {
    TYPE_DATETIME,
    TYPE_NUMBER,
    TYPE_TEXT,
    isZero
} from 'utils';
import style from 'style/style.module.css';

export default function App() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<FormValues>();
    const [fee, setFee] = useState<number>(0);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
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
            <form className={ style.center } onSubmit={ handleSubmit(onSubmit) }>
                <div className={ style.wrapper }>
                    <div className={ style.container }>
                        <div className={ style.title }>Delivery Fee Calculator</div>
                        <Input
                            id="cartValue"
                            label="Cart value (€)"
                            type={ TYPE_TEXT }
                            description="Value of the shopping cart in euros."
                            options={ register("cartValue", { valueAsNumber: true }) }
                            errorMessage={ errors.cartValue?.message ?? '' }
                        />
                        <Input
                            id="deliveryDistance"
                            label="Delivery distance (meters)"
                            type={ TYPE_NUMBER }
                            description="The distance between the store and location of customer in meters."
                            options={ register("deliveryDistance", { valueAsNumber: true }) }
                            errorMessage={ errors.deliveryDistance?.message ?? '' }
                        />
                        <Input
                            id="numberOfItems"
                            label="Number of items"
                            type={ TYPE_NUMBER }
                            description="The number of items in the shopping cart of customer."
                            options={ register("numberOfItems", { valueAsNumber: true }) }
                            errorMessage={ errors.numberOfItems?.message ?? '' }
                        />
                        <Input
                            id="orderTime"
                            label="Order time (datetime)"
                            type={ TYPE_DATETIME }
                            description="The date/time when the order is being made"
                            options={ register("orderTime", { valueAsDate: true }) }
                            errorMessage={ errors.orderTime?.message ?? '' }
                        />
                        <div className={ style.group } style={ { border: 'none' } }>
                            <input type="submit" className={ style.button } value="Calculate delivery price" />
                        </div>
                        <div className={ style.result }>
                            <div className={ style.line }>Total delivery fee</div>
                            <div className={ style.line } data-test-id="fee">{ fee.toFixed(2) }</div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
