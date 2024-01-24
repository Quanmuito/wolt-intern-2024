import React, { useState } from 'react';
import { Input } from 'components';
import { AppState } from 'types';
import {
    TYPE_INT,
    TYPE_FLOAT,
    TYPE_DATETIME,
    getDeliveryFee
} from 'utils';


export default function App() {
    const [appState, setAppState] = useState<AppState>({
        cartValue: '0',
        cartValueError: '',
        deliveryDistance: '0',
        deliveryDistanceError: '',
        numberOfItems: '0',
        numberOfItemsError: '',
        orderTime: new Date().toISOString().slice(0, 16),
        orderTimeError: '',
    });

    const deliveryFee = getDeliveryFee(
        Number.parseFloat(appState.cartValue),
        Number.parseInt(appState.deliveryDistance),
        Number.parseInt(appState.numberOfItems),
        appState.orderTime
    );

    return (
        <div className="App">
            <div className="container">
                <Input
                    label="Cart value (€)"
                    id="cartValue"
                    type={ TYPE_FLOAT }
                    value={ appState.cartValue }
                    error={ appState.cartValueError }
                    description="Value of the shopping cart in euros."
                    setAppState={ setAppState }
                />
                <br />
                <Input
                    label="Delivery distance (m)"
                    id="deliveryDistance"
                    type={ TYPE_INT }
                    value={ appState.deliveryDistance }
                    error={ appState.deliveryDistanceError }
                    description="The distance between the store and location of customer in meters."
                    setAppState={ setAppState }
                />
                <br />
                <Input
                    label="Number of items"
                    id="numberOfItems"
                    type={ TYPE_INT }
                    value={ appState.numberOfItems }
                    error={ appState.numberOfItemsError }
                    description="The number of items in the customer's shopping cart."
                    setAppState={ setAppState }
                />
                <br />
                <Input
                    label="Order time"
                    id="orderTime"
                    type={ TYPE_DATETIME }
                    value={ appState.orderTime }
                    error=""
                    description="The date/time when the order is being made"
                    setAppState={ setAppState }
                />
                <br />
                <Input
                    label="Total Delivery Fee"
                    id="fee"
                    type={ TYPE_FLOAT }
                    value={ deliveryFee.toFixed(2) }
                    error=""
                    description="This show much the delivery will cost"
                    setAppState={ setAppState }
                />
            </div>
        </div>
    );
}
