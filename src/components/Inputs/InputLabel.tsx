import React from 'react';

type InputLabelPropsType = {
    id: string,
    label: string,
    options: {[x: string]: any},
}
export const InputLabel = ({ id, label, options }: InputLabelPropsType) => (
    <label id={ `${id}-label` } htmlFor={ id } { ...options }>
        { label }
    </label>
);
