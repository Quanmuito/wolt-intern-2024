export const TYPE_NUMBER = 'number';
export const TYPE_TEXT = 'text';
export const TYPE_DATETIME = 'datetime-local';

export const isEmptyString = (string: string): boolean => {
    return string === '';
};

export const isZero = (number: number): boolean => {
    return number === 0;
};
