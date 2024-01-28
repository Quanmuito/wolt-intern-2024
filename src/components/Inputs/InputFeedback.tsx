import React from 'react';

type InputFeedbackPropsType = {
    id: string,
    description: string,
    error?: string,
    options: {[x: string]: any},
}
export const InputFeedback = (props: InputFeedbackPropsType) => {
    const { error } = props;
    return (error === undefined || error === '')
        ? <InputFeedbackDescription { ...props } />
        : <InputFeedbackError error={ error } { ...props } />;
};

type InputFeedbackDescriptionPropsType = {
    id: string,
    description: string,
    options: {[x: string]: any},
}
export const InputFeedbackDescription = ({ id, description, options }: InputFeedbackDescriptionPropsType) => (
    <div id={ `${id}-feedback` } { ...options }>
        { description }
    </div>
);

type InputFeedbackErrorPropsType = {
    id: string,
    error: string,
    options: {[x: string]: any},
}
export const InputFeedbackError = ({ id, error, options }: InputFeedbackErrorPropsType) => (
    <div id={ `${id}-feedback` } { ...options }>
        { `Invalid input. Error: ${error}` }
    </div>
);
