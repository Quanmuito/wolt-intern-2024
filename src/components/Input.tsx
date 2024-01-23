import React from 'react';
import { AppState } from 'types';
import {
    TYPE_INT,
    TYPE_FLOAT,
    isEmptyString,
    TYPE_DATETIME
} from 'utils';

type InputPropsType = {
    label: string,
    id: string,
    type: string,
    value: string,
    valid: boolean,
    description: string,
    setState: React.Dispatch<React.SetStateAction<AppState>>
}

export const Input = ({
    label,
    id,
    type,
    value,
    valid,
    description,
    setState,
}: InputPropsType) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let value = event.target.value;
        let isValid = true;

        if (!isEmptyString(value)) {
            switch (type) {
                case TYPE_INT: {
                    let parsedValue = Number.parseInt(value);
                    isValid = !/[^0-9]/.test(value) && Number.isInteger(parsedValue);
                    break;
                }

                case TYPE_FLOAT: {
                    let parsedValue = Number.parseFloat(value);
                    isValid = !/[^0-9.,]/.test(value) && typeof(parsedValue) === 'number';
                    break;
                }

                case TYPE_DATETIME: {
                    let date = Date.parse(value);
                    isValid = !isNaN(date);
                    break;
                }

                default:
                    break;
            }
        }

        setState((prevState) => {
            return {
                ...prevState,
                inputs: { ...prevState.inputs, [id]: value },
                validate: { ...prevState.validate, [id]: isValid },
            };
        });
    };

    return (
        <>
            <span className="input-group-text justify-content-center">
                { label }
            </span>
            <input
                id={ id }
                name={ id }
                data-test-id={ id }
                type="text"
                className={ `form-control${valid ? '' : ' is-invalid'}` }
                aria-label={ description }
                value={ value }
                onChange={ onChange }
            />
            <div id={ `${id}Feedback` } className="invalid-feedback text-end">
                { `Invalid input. ${label} should be ${type}` }
            </div>
        </>

    );
};
