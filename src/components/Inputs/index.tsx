import React from 'react';

type InputPropsType = {
    id: string,
    options: {[x: string]: any},
}

/** Render input with type text */
export const InputText = ({ id, options }: InputPropsType) => (
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

/** Render input with type number */
export const InputNumber = ({ id, options }: InputPropsType) => (
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

/** Render input with type date-time */
export const InputDatetime = ({ id, options }: InputPropsType) => (
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

/** Render submit button */
export const InputSubmit = ({ id, options }: InputPropsType) => (
    <input id={ id } type="submit" aria-label="submit" { ...options } />
);

/** Render label of the input */
type InputLabelPropsType = InputPropsType&{
    label: string,
}
export const InputLabel = ({ id, label, options }: InputLabelPropsType) => (
    <label id={ `${id}-label` } htmlFor={ id } { ...options }>
        { label }
    </label>
);

/** Determine whether description or error */
type InputFeedbackPropsType = InputPropsType&{
    description: string,
    error?: string,
}
export const InputFeedback = (props: InputFeedbackPropsType) => {
    const { error } = props;
    return (error === undefined || error === '')
        ? <InputFeedbackDescription { ...props } />
        : <InputFeedbackError error={ error } { ...props } />;
};

/** Render input description */
type InputFeedbackDescriptionPropsType = InputPropsType&{
    description: string,
}
export const InputFeedbackDescription = ({ id, description, options }: InputFeedbackDescriptionPropsType) => (
    <div id={ `${id}-feedback` } { ...options }>
        { description }
    </div>
);

/** Render input error */
type InputFeedbackErrorPropsType = InputPropsType&{
    error: string,
}
export const InputFeedbackError = ({ id, error, options }: InputFeedbackErrorPropsType) => (
    <div id={ `${id}-feedback` } { ...options }>
        { `Invalid input. Error: ${error}` }
    </div>
);
