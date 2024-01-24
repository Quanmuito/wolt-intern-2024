import React from 'react';
import { AppState } from 'types';
import { validateInput } from 'utils';

type InputPropsType = {
    label: string,
    id: string,
    type: string,
    value: string,
    valid: boolean,
    description: string,
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
}

export const Input = ({
    label,
    id,
    type,
    value,
    valid,
    description,
    setAppState,
}: InputPropsType) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let value = event.target.value;

        setAppState((prevState) => ({
            ...prevState,
            inputs: { ...prevState.inputs, [id]: value },
            validate: { ...prevState.validate, [id]: validateInput(type, value) },
        }));
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
                type="text"
                className={ `form-control${valid ? '' : ' is-invalid'}` }
                aria-label={ description }
                value={ value }
                onChange={ onChange }
            />
            <div id={ `${id}Feedback` } className="invalid-feedback text-end">
                { `Invalid input. ${label} should be ${type}` }
            </div>
        </div>
    );
};
