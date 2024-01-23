import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { DatePicker, Input } from 'components';
import { AppState } from 'types';
import {
    getAppState,
    TYPE_INT,
    TYPE_FLOAT,
    TYPE_DATETIME
} from 'utils';

export default function App() {
    const [state, setState] = useState<AppState>(getAppState());

    return (
        <div className="App">
            <div className="container">
                <div className="input-group">
                    <Input
                        label="Cart value (€)"
                        id="cartValue"
                        type={ TYPE_FLOAT }
                        value={ state.inputs.cartValue }
                        valid={ state.validate.cartValue }
                        description="Value of the shopping cart in euros."
                        setState={ setState }
                    />
                </div>
                <div className="input-group">
                    <Input
                        label="Delivery distance (m)"
                        id="deliveryDistance"
                        type={ TYPE_INT }
                        value={ state.inputs.deliveryDistance }
                        valid={ state.validate.deliveryDistance }
                        description="The distance between the store and location of customer in meters."
                        setState={ setState }
                    />
                </div>
                <div className="input-group">
                    <Input
                        label="Number of items"
                        id="numberOfItems"
                        type={ TYPE_INT }
                        value={ state.inputs.numberOfItems }
                        valid={ state.validate.numberOfItems }
                        description="The number of items in the customer's shopping cart."
                        setState={ setState }
                    />
                </div>
                <div className="input-group">
                    <Input
                        label="Order time (Y-M-D h:m:s)"
                        id="orderTime"
                        type={ TYPE_DATETIME }
                        value={ state.inputs.orderTime }
                        valid={ state.validate.orderTime }
                        description="The date/time when the order is being made"
                        setState={ setState }
                    />
                    <button
                        className="input-group-text justify-content-center"
                        onClick={ () => setState({ ...state, showDatePicker: true }) }
                    >
                        <i className="bi bi-calendar3"></i>
                    </button>
                </div>
                <DatePicker
                    showDatePicker={ state.showDatePicker }
                    orderTime={ state.inputs.orderTime }
                    setState={ setState }
                />
                <button className="btn btn-primary">Calculate delivery price</button>
                <div className="input-group">
                    <span className="input-group-text justify-content-center">
                        Delivery Price
                    </span>
                    <input
                        id="fee"
                        name="fee"
                        data-test-id="fee"
                        type="text"
                        className="form-control"
                        aria-label="Final price"
                        disabled={ true }
                    />
                </div>
            </div>
        </div>
    );
}
