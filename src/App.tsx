import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    InputText,
    InputNumber,
    InputDatetime,
    InputLabel,
    InputFeedback,
    InputSubmit
} from 'components';
import { getDeliveryFee } from 'calculator';
import { FormValues } from 'types';
import { isZero } from 'utils';
import style from 'style/style.module.css';

const FORM_FIELDS: {[index: string]: keyof FormValues} = {
    CART_VALUE: 'cartValue',
    DELIVERY_DISTANCE: 'deliveryDistance',
    NUMBER_OF_ITEMS: 'numberOfItems',
    ORDER_TIME: 'orderTime',
};

const defaultValues: FormValues = {
    cartValue: 0,
    deliveryDistance: 0,
    numberOfItems: 0,
    orderTime: new Date().toISOString().slice(0, 16),
};

export default function App() {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormValues>({
        defaultValues: defaultValues,
    });
    const [fee, setFee] = useState<number>(0);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (isNaN(data.cartValue)) {
            setError(FORM_FIELDS.CART_VALUE, {
                type: 'manual',
                message: 'Cart value should be a float number.',
            });
            return;
        }

        if (data.cartValue < 0) {
            setError(FORM_FIELDS.CART_VALUE, {
                type: 'manual',
                message: 'Cart value should be positive.',
            });
            return;
        }

        if (data.deliveryDistance < 0) {
            setError(FORM_FIELDS.DELIVERY_DISTANCE, {
                type: 'manual',
                message: 'Delivery distance should be positive.',
            });
            return;
        }

        if (data.numberOfItems < 0) {
            setError(FORM_FIELDS.NUMBER_OF_ITEMS, {
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
                        <div className={ style.group }>
                            <InputLabel
                                id={ FORM_FIELDS.CART_VALUE }
                                label="Cart value (€)"
                                options={ { className: style.label } }
                            />
                            <InputText
                                id={ FORM_FIELDS.CART_VALUE }
                                options={ {
                                    ...register(FORM_FIELDS.CART_VALUE, { valueAsNumber: true }),
                                    className: style.input,
                                    'data-test-id': FORM_FIELDS.CART_VALUE,
                                } }
                            />
                            <InputFeedback
                                id={ FORM_FIELDS.CART_VALUE }
                                description="Value of the shopping cart in euros."
                                error={ errors.cartValue?.message }
                                options={ {
                                    className: !errors.cartValue?.message ? style.description : style.invalid,
                                } }
                            />
                        </div>

                        <div className={ style.group }>
                            <InputLabel
                                id={ FORM_FIELDS.DELIVERY_DISTANCE }
                                label="Delivery distance (meters)"
                                options={ { className: style.label } }
                            />
                            <InputNumber
                                id={ FORM_FIELDS.DELIVERY_DISTANCE }
                                options={ {
                                    ...register(FORM_FIELDS.DELIVERY_DISTANCE, { valueAsNumber: true }),
                                    className: style.input,
                                    'data-test-id': FORM_FIELDS.DELIVERY_DISTANCE,
                                } }
                            />
                            <InputFeedback
                                id={ FORM_FIELDS.DELIVERY_DISTANCE }
                                description="The distance between the store and location of customer in meters."
                                error={ errors.deliveryDistance?.message }
                                options={ {
                                    className: !errors.deliveryDistance?.message ? style.description : style.invalid,
                                } }
                            />
                        </div>

                        <div className={ style.group }>
                            <InputLabel
                                id={ FORM_FIELDS.NUMBER_OF_ITEMS }
                                label="Number of items"
                                options={ { className: style.label } }
                            />
                            <InputNumber
                                id={ FORM_FIELDS.NUMBER_OF_ITEMS }
                                options={ {
                                    ...register(FORM_FIELDS.NUMBER_OF_ITEMS, { valueAsNumber: true }),
                                    className: style.input,
                                    'data-test-id': FORM_FIELDS.NUMBER_OF_ITEMS,
                                } }
                            />
                            <InputFeedback
                                id={ FORM_FIELDS.NUMBER_OF_ITEMS }
                                description="The number of items in the shopping cart of customer."
                                error={ errors.numberOfItems?.message }
                                options={ {
                                    className: !errors.numberOfItems?.message ? style.description : style.invalid,
                                } }
                            />
                        </div>

                        <div className={ style.group }>
                            <InputLabel
                                id={ FORM_FIELDS.ORDER_TIME }
                                label="Order time (datetime)"
                                options={ { className: style.label } }
                            />
                            <InputDatetime
                                id={ FORM_FIELDS.ORDER_TIME }
                                options={ {
                                    ...register(FORM_FIELDS.ORDER_TIME, { valueAsDate: true }),
                                    className: style.input,
                                    'data-test-id': FORM_FIELDS.ORDER_TIME,
                                } }
                            />
                            <InputFeedback
                                id={ FORM_FIELDS.ORDER_TIME }
                                description="The date/time when the order is being made"
                                error={ errors.orderTime?.message }
                                options={ {
                                    className: style.description,
                                } }
                            />
                        </div>

                        <div className={ style.group } style={ { border: 'none', padding: '1rem 5rem' } }>
                            <InputSubmit
                                id="submit"
                                options={ {
                                    className: style.button,
                                    value: `${isSubmitting ? 'Calculating' : 'Calculate delivery price'}`,
                                    disabled: isSubmitting,
                                } }
                            />
                        </div>

                        <div className={ style.result }>
                            <p className={ style.line }>Total delivery fee (€)</p>
                            <p className={ style.line } data-test-id="fee">{ fee.toFixed(2) }</p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
