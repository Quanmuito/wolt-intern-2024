import React from 'react';
import { UseFormRegister, RegisterOptions } from 'react-hook-form';
import { FormFields } from 'types';
import { isEmptyString } from 'utils';

type InputPropsType = {
    label: string,
    id: keyof FormFields,
    type: string,
    description: string,
    errorMessage?: string
    readOnly?: boolean,
    value?: string,
    datetime?: boolean,
    register?:  UseFormRegister<FormFields>
}

export const Input = ({
    label,
    id,
    type,
    description,
    errorMessage = '',
    readOnly = false,
    value = '',
    datetime = false,
    register,
}: InputPropsType) => {
    const options: RegisterOptions<FormFields, keyof FormFields> = {
        required: true,
    };

    if (datetime) {
        options.valueAsDate = true;
    } else {
        options.valueAsNumber = true;
    }

    const getAttribute = () => {
        if (!readOnly && register !== undefined) {
            const now = new Date();
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            now.setMilliseconds(0);
            now.setSeconds(0);
            const defaultValue = datetime ? now.toISOString().slice(0, -1) : '';

            return {
                defaultValue: defaultValue,
                ...register(id, options),
            };
        }

        return {
            readOnly: true,
            value: value,
        };
    };

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
                aria-label={ label }
                aria-labelledby={ `${id}-label` }
                aria-describedby={ `${id}Feedback` }
                aria-required={ false }
                { ...getAttribute() }
            />
            <div id={ `${id}Feedback` }>
                <span>{ isEmptyString(errorMessage) ? description : `Invalid input. Error: ${errorMessage}` }</span>
            </div>
        </div>
    );
};
