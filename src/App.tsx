import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { DatePicker } from 'components';

export default function App() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="App">
            <div className="container">
                <div className="input-group">
                    <span
                        className="input-group-text justify-content-center"
                        style={ { width: '15%' } }
                    >
                        Cart value
                    </span>
                    <input
                        id="cartValue"
                        name="cartValue"
                        data-test-id="cartValue"
                        type="text"
                        className="form-control"
                        aria-label="Total value of items in cart"
                    />
                    <span
                        className="input-group-text justify-content-center"
                        style={ { width: '15%' } }
                    >
                        <i className="bi bi-currency-euro"></i>
                    </span>
                </div>
                <div className="input-group">
                    <span
                        className="input-group-text justify-content-center"
                        style={ { width: '15%' } }
                    >
                        Delivery distance
                    </span>
                    <input
                        id="deliveryDistance"
                        name="deliveryDistance"
                        data-test-id="deliveryDistance"
                        type="text"
                        className="form-control"
                        aria-label="Delivery distance"
                    />
                    <span
                        className="input-group-text justify-content-center"
                        style={ { width: '15%' } }
                    >
                        m
                    </span>
                </div>
                <div className="input-group">
                    <span
                        className="input-group-text justify-content-center"
                        style={ { width: '15%' } }
                    >
                        Number of item
                    </span>
                    <input
                        id="numberOfItems"
                        name="numberOfItems"
                        data-test-id="numberOfItems"
                        type="text"
                        className="form-control"
                        aria-label="Total amount of items"
                    />
                    <span
                        className="input-group-text justify-content-center"
                        style={ { width: '15%' } }
                    >
                        <i className="bi bi-currency-euro"></i>
                    </span>
                </div>
                <div className="input-group">
                    <span
                        className="input-group-text justify-content-center"
                        style={ { width: '15%' } }
                    >
                        Order time
                    </span>
                    <input
                        type="text"
                        id="orderTime"
                        name="orderTime"
                        data-test-id="orderTime"
                        className="form-control"
                        // onChange={ () => console.log(getInputValueFromDateDetails(state.selected)) }
                        // value={ getInputValueFromDateDetails(state.selected) }
                    />
                    <button
                        className="input-group-text justify-content-center"
                        style={ { width: '15%' } }
                        onClick={ () => setModalShow(true) }
                    >
                        <i className="bi bi-calendar3"></i>
                    </button>
                </div>
                <button className="btn btn-primary">Calculate delivery price</button>
                <div className="input-group">
                    <span
                        className="input-group-text justify-content-center"
                        style={ { width: '15%' } }
                    >
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
                    <span
                        className="input-group-text justify-content-center"
                        style={ { width: '15%' } }
                    >
                        <i className="bi bi-currency-euro"></i>
                    </span>
                </div>

                <Modal
                    show={ modalShow }
                    onHide={ () => setModalShow(false) }
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <h5>Selected: 23/01/2024 08:30</h5>
                    </Modal.Header>
                    <Modal.Body className="d-flex justify-content-center">
                        <DatePicker />
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}
