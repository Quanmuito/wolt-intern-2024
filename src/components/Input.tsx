import React from 'react';
import { FieldValues } from 'react-hook-form';
import { isEmptyString } from 'utils';
import style from 'style/style.module.css';

type InputPropsType = {
    id: string,
    label: string,
    type: string,
    description: string,
    errorMessage: string
    options: FieldValues,
}

export const Input = ({
    label,
    id,
    type,
    description,
    errorMessage,
    options,
}: InputPropsType) => {
    const isValid = isEmptyString(errorMessage);

    return (
        <div className={ style.inputGroup }>
            <label
                id={ `${id}-label` }
                htmlFor={ id }
                className={ style.inputLabel }
            >
                { label }
            </label>
            <input
                id={ id }
                data-test-id={ id }
                type={ type }
                className={ style.input }
                required={ true }
                aria-label={ label }
                aria-labelledby={ `${id}-label` }
                aria-describedby={ `${id}Feedback` }
                aria-required={ true }
                aria-invalid={ !isValid }
                { ...options }
            />
            <div id={ `${id}Feedback` } className={ isValid ? style.inputFeedback : style.invalid }>
                <span>{ isValid ? description : `Invalid input. Error: ${errorMessage}` }</span>
            </div>
        </div>
    );
};
