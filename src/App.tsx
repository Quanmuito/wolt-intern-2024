import React, { useState } from 'react';
import { Input } from 'components';
import { AppState } from 'types';
import {
    TYPE_INT,
    TYPE_FLOAT,
    TYPE_DATETIME,
    getDeliveryFee,
    isEmptyString
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

    const isStateValid = (): boolean => {
        return isEmptyString(appState.cartValueError) &&
           isEmptyString(appState.deliveryDistanceError) &&
           isEmptyString(appState.numberOfItemsError);
    };

    let deliveryFee = 0;
    if (isStateValid()) {
        deliveryFee = getDeliveryFee(
            Number.parseFloat(appState.cartValue),
            Number.parseInt(appState.deliveryDistance),
            Number.parseInt(appState.numberOfItems),
            appState.orderTime
        );
    }

    return (
        <div className="App">
            <main>
                <div className="container">
                    <h1 className="text-center">Delivery Fee Calculator</h1>
                    <Input
                        label="Cart value (€)"
                        id="cartValue"
                        type={ TYPE_FLOAT }
                        value={ appState.cartValue }
                        error={ appState.cartValueError }
                        description="Value of the shopping cart in euros."
                        setAppState={ setAppState }
                    />
                    <Input
                        label="Delivery distance (meters)"
                        id="deliveryDistance"
                        type={ TYPE_INT }
                        value={ appState.deliveryDistance }
                        error={ appState.deliveryDistanceError }
                        description="The distance between the store and location of customer in meters."
                        setAppState={ setAppState }
                    />
                    <Input
                        label="Number of items"
                        id="numberOfItems"
                        type={ TYPE_INT }
                        value={ appState.numberOfItems }
                        error={ appState.numberOfItemsError }
                        description="The number of items in the customer's shopping cart."
                        setAppState={ setAppState }
                    />
                    <Input
                        label="Order time (datetime)"
                        id="orderTime"
                        type={ TYPE_DATETIME }
                        value={ appState.orderTime }
                        error=""
                        description="The date/time when the order is being made"
                        setAppState={ setAppState }
                    />
                    <Input
                        label="Total Delivery Fee (€)"
                        id="fee"
                        type={ TYPE_FLOAT }
                        value={ deliveryFee.toFixed(2) }
                        error=""
                        description="Total cost of delivery in euros"
                        setAppState={ setAppState }
                        result
                    />
                </div>
            </main>
        </div>
    );
}
