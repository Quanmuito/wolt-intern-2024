export const TYPE_INT = 'number';
export const TYPE_FLOAT = 'text';
export const TYPE_DATETIME = 'datetime-local';

export const isEmptyString = (string: string): boolean => {
    return string === '';
};

export const isZero = (number: number): boolean => {
    return number === 0;
};
