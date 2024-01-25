import React from 'react';
import { UseFormRegister, RegisterOptions } from 'react-hook-form';
import { AppState } from 'types';
import { isEmptyString } from 'utils';

type InputPropsType = {
    id: keyof AppState,
    label: string,
    type: string,
    description: string,
    errorMessage: string
    datetime: boolean,
    register:  UseFormRegister<AppState>
}

export const Input = ({
    label,
    id,
    type,
    description,
    errorMessage = '',
    datetime = false,
    register,
}: InputPropsType) => {
    const options: RegisterOptions<AppState, keyof AppState> = {
        required: true,
    };

    if (datetime) {
        options.valueAsDate = true;
    } else {
        options.valueAsNumber = true;
    }

    const isValid = isEmptyString(errorMessage);

    return (
        <div>
            <label
                id={ `${id}-label` }
                htmlFor={ id }
            >
                { label }
            </label>
            <input
                id={ id }
                data-test-id={ id }
                type={ type }
                defaultValue={ datetime ? new Date().toISOString().slice(0, 16) : '' }
                aria-label={ label }
                aria-labelledby={ `${id}-label` }
                aria-describedby={ `${id}Feedback` }
                aria-required={ true }
                aria-invalid={ !isValid }
                { ...register(id) }
            />
            <div id={ `${id}Feedback` }>
                <span>{ isValid ? description : `Invalid input. Error: ${errorMessage}` }</span>
            </div>
        </div>
    );
};
