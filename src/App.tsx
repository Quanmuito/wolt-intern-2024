import React from 'react';
import { useCalculatorForm } from 'hooks/useCalculatorForm';
import {
    InputText,
    InputNumber,
    InputDatetime,
    InputSubmit,
    InputLabel,
    InputFeedback
} from 'components';
import style from 'style/style.module.css';

export default function App() {
    const { useFormReturn, onSubmit, tooltips, fee } = useCalculatorForm();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useFormReturn;

    const renderCartValueInput = (): JSX.Element => (
        <div className={ style.group }>
            <div className={ style.labelGroup }>
                <InputLabel
                    id="cartValue"
                    label="Cart value (€)"
                    options={ { className: style.label } }
                />
                <span className={ style.tooltip }>
                    { tooltips.cartValue }
                </span>
            </div>
            <InputText
                id="cartValue"
                options={ {
                    ...register('cartValue', { valueAsNumber: true }),
                    className: style.input,
                    'data-test-id': 'cartValue',
                } }
            />
            <InputFeedback
                id="cartValue"
                description="Value of the shopping cart in euros."
                error={ errors.cartValue?.message }
                options={ {
                    className: !errors.cartValue?.message ? style.description : style.invalid,
                } }
            />
        </div>
    );

    const renderDeliveryDistanceInput = (): JSX.Element => (
        <div className={ style.group }>
            <div className={ style.labelGroup }>
                <InputLabel
                    id="deliveryDistance"
                    label="Delivery distance (meters)"
                    options={ { className: style.label } }
                />
                <span className={ style.tooltip }>
                    { tooltips.deliveryDistance }
                </span>
            </div>
            <InputNumber
                id="deliveryDistance"
                options={ {
                    ...register('deliveryDistance', { valueAsNumber: true }),
                    className: style.input,
                    'data-test-id': 'deliveryDistance',
                } }
            />
            <InputFeedback
                id="deliveryDistance"
                description="The distance between the store and location of customer in meters."
                error={ errors.deliveryDistance?.message }
                options={ {
                    className: !errors.deliveryDistance?.message ? style.description : style.invalid,
                } }
            />
        </div>
    );

    const renderNumberOfItemInput = (): JSX.Element => (
        <div className={ style.group }>
            <div className={ style.labelGroup }>
                <InputLabel
                    id="numberOfItems"
                    label="Number of items"
                    options={ { className: style.label } }
                />
                <span className={ style.tooltip }>
                    { tooltips.numberOfItems }
                </span>
            </div>
            <InputNumber
                id="numberOfItems"
                options={ {
                    ...register('numberOfItems', { valueAsNumber: true }),
                    className: style.input,
                    'data-test-id': 'numberOfItems',
                } }
            />
            <InputFeedback
                id="numberOfItems"
                description="The number of items in the shopping cart of customer."
                error={ errors.numberOfItems?.message }
                options={ {
                    className: !errors.numberOfItems?.message ? style.description : style.invalid,
                } }
            />
        </div>
    );

    const renderOrderTimeInput = (): JSX.Element => (
        <div className={ style.group }>
            <div className={ style.labelGroup }>
                <InputLabel
                    id="orderTime"
                    label="Order time (datetime)"
                    options={ { className: style.label } }
                />
                <span className={ style.tooltip }>
                    { tooltips.orderTime }
                </span>
            </div>
            <InputDatetime
                id="orderTime"
                options={ {
                    ...register('orderTime', { valueAsDate: true }),
                    className: style.input,
                    'data-test-id': 'orderTime',
                } }
            />
            <InputFeedback
                id="orderTime"
                description="The datetime when the order is being made"
                error={ errors.orderTime?.message }
                options={ {
                    className: style.description,
                } }
            />
        </div>
    );

    const renderSubmitInput = (): JSX.Element => (
        <div className={ style.buttonGroup }>
            <InputSubmit
                id="submit"
                options={ {
                    className: style.button,
                    value: `${isSubmitting ? 'Calculating' : 'Calculate delivery price'}`,
                    disabled: isSubmitting,
                } }
            />
        </div>
    );

    return (
        <div className="App">
            <form className={ style.center } onSubmit={ handleSubmit(onSubmit) }>
                <div className={ style.wrapper }>
                    <div className={ style.container }>
                        <div className={ style.title }>Delivery Fee Calculator</div>

                        { renderCartValueInput() }
                        { renderDeliveryDistanceInput() }
                        { renderNumberOfItemInput() }
                        { renderOrderTimeInput() }
                        { renderSubmitInput() }

                        <div className={ style.result }>
                            <p className={ style.line }>Total delivery fee (€)</p>
                            <p
                                className={ style.line }
                                data-test-id="fee"
                                data-testid="fee"
                            >{ fee }</p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
