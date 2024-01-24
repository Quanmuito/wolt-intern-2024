import React, { useState } from 'react';
import { DatePicker, Input } from 'components';
import { AppState } from 'types';
import {
    getAppState,
    TYPE_INT,
    TYPE_FLOAT,
    TYPE_DATETIME
} from 'utils';

export default function App() {
    const [appState, setAppState] = useState<AppState>(getAppState());

    return (
        <div className="App">
            <div className="container">
                <Input
                    label="Cart value (€)"
                    id="cartValue"
                    type={ TYPE_FLOAT }
                    value={ appState.inputs.cartValue }
                    valid={ appState.validate.cartValue }
                    description="Value of the shopping cart in euros."
                    setAppState={ setAppState }
                />
                <br />
                <Input
                    label="Delivery distance (m)"
                    id="deliveryDistance"
                    type={ TYPE_INT }
                    value={ appState.inputs.deliveryDistance }
                    valid={ appState.validate.deliveryDistance }
                    description="The distance between the store and location of customer in meters."
                    setAppState={ setAppState }
                />
                <br />
                <Input
                    label="Number of items"
                    id="numberOfItems"
                    type={ TYPE_INT }
                    value={ appState.inputs.numberOfItems }
                    valid={ appState.validate.numberOfItems }
                    description="The number of items in the customer's shopping cart."
                    setAppState={ setAppState }
                />
                <br />
                <Input
                    label="Order time"
                    id="orderTime"
                    type={ TYPE_DATETIME }
                    value={ appState.inputs.orderTime }
                    valid={ appState.validate.orderTime }
                    description="The date/time when the order is being made"
                    setAppState={ setAppState }
                />
                <button
                    className="input-group-text justify-content-center"
                    style={ { width: '100%' } }
                    onClick={ () => setAppState({ ...appState, showDatePicker: true }) }
                >
                    <i className="bi bi-calendar3"></i>
                </button>
                <DatePicker
                    showDatePicker={ appState.showDatePicker }
                    orderTime={ appState.inputs.orderTime }
                    setAppState={ setAppState }
                />
                <br />
                <button
                    className="btn btn-primary"
                    style={ { width: '100%' } }
                >
                    Calculate delivery price
                </button>
                <br />
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
