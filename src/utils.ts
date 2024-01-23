import { OrderTimeDetails } from "types";

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const SHORT_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
export const MINUTES = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

export const JANUARY = 0;
export const DECEMBER = 11;

export const getInputValueFromDateDetails = (OrderTimeDetails: OrderTimeDetails): string => {
    const date = new Date(OrderTimeDetails.year, OrderTimeDetails.month, OrderTimeDetails.date);
    return date.toISOString().slice(0, 10);
};

export const getYearAndMonth = (date: OrderTimeDetails, backward: boolean = false): [number, number] => {
    if (backward) {
        return (date.month === JANUARY) ? [date.year - 1, DECEMBER] : [date.year, date.month - 1];
    } else {
        return (date.month === DECEMBER) ? [date.year + 1, JANUARY] : [date.year, date.month + 1];
    }
};
