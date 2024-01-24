import React from 'react';
import { AppState } from 'types';
import {
    isEmptyString,
    TYPE_DATETIME,
    TYPE_INT,
    TYPE_FLOAT
} from 'utils';


type InputPropsType = {
    label: string,
    id: string,
    type: string,
    value: string,
    error: string,
    description: string,
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
}

export const Input = ({
    label,
    id,
    type,
    value,
    error,
    description,
    setAppState,
}: InputPropsType) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let input = event.target.value;
        let error: string = '';

        switch (type) {
            case TYPE_INT: {
                let parsedValue = Number.parseInt(input);
                let isInteger = !/[^0-9]/.test(input) && Number.isInteger(parsedValue);
                error = isInteger ? '' : 'Please input an integer';
                break;
            }

            case TYPE_FLOAT: {
                let parsedValue = Number.parseFloat(input);
                let isFloat = !/[^0-9.,]/.test(input) && typeof(parsedValue) === 'number';
                error = isFloat ? '' : 'Please input a float';
                break;
            }

            default:
                break;
        }

        setAppState((prevState) => ({ ...prevState, [id]: input, [`${id}Error`]: error }));
    };

    return (
        <div className="input-group">
            <span className="input-group-text justify-content-center">
                { label }
            </span>
            <input
                id={ id }
                name={ id }
                data-test-id={ id }
                type={ `${type === TYPE_DATETIME ? 'datetime-local' : 'number'}` }
                className={ `form-control${isEmptyString(error) ? '' : ' is-invalid'}` }
                aria-label={ description }
                value={ value }
                onChange={ onChange }
            />
            <div id={ `${id}Feedback` } className="invalid-feedback text-end">
                { `Invalid input. ${error}` }
            </div>
        </div>
    );
};
