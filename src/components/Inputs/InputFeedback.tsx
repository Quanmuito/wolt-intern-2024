import React from 'react';
import { isEmptyString } from 'utils';

type InputFeedbackPropsType = {
    id: string,
    description: string,
    error?: string,
    options: {[x: string]: any},
}
export const InputFeedback = (props: InputFeedbackPropsType) => {
    const { error } = props;
    return (error === undefined || isEmptyString(error))
        ? <InputFeedbackDescription { ...props } />
        : <InputFeedbackDError error={ error } { ...props } />;
};

type InputFeedbackDescriptionPropsType = {
    id: string,
    description: string,
    options: {[x: string]: any},
}
export const InputFeedbackDescription = ({ id, description, options }: InputFeedbackDescriptionPropsType) => {
    return (
        <div id={ `${id}-feedback` } { ...options }>
            { description }
        </div>
    );
};

type InputFeedbackErrorPropsType = {
    id: string,
    error: string,
    options: {[x: string]: any},
}
export const InputFeedbackDError = ({ id, error, options }: InputFeedbackErrorPropsType) => {
    return (
        <div id={ `${id}-feedback` } { ...options }>
            { `Invalid input. Error: ${error}` }
        </div>
    );
};
