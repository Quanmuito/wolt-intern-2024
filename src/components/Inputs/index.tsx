import React from 'react';

type InputPropsType = {
    id: string,
    options: {[x: string]: any},
}

export const InputText = ({ id, options }: InputPropsType) => {
    return (
        <input
            id={ id }
            type="text"
            required={ true }
            aria-labelledby={ `${id}-label` }
            aria-describedby={ `${id}-feedback` }
            aria-required={ true }
            { ...options }
        />
    );
};

export const InputNumber = ({ id, options }: InputPropsType) => {
    return (
        <input
            id={ id }
            type="number"
            required={ true }
            aria-labelledby={ `${id}-label` }
            aria-describedby={ `${id}-feedback` }
            aria-required={ true }
            { ...options }
        />
    );
};

export const InputDatetime = ({ id, options }: InputPropsType) => {
    return (
        <input
            id={ id }
            type="datetime-local"
            required={ true }
            aria-labelledby={ `${id}-label` }
            aria-describedby={ `${id}-feedback` }
            aria-required={ true }
            { ...options }
        />
    );
};

export const InputSubmit = ({ id, options }: InputPropsType) => {
    return (
        <input id={ id } type="submit" { ...options } />
    );
};

export * from './InputFeedback';
export * from './InputLabel';
