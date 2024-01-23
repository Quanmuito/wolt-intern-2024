import {
    AppState,
    InputState,
    ValidateState,
    DateInfo,
    DatePickerState
} from 'types';

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const SHORT_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
export const MINUTES = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

export const JANUARY = 0;
export const DECEMBER = 11;
export const FRIDAY = 6;

export const TYPE_INT = 'integer';
export const TYPE_FLOAT = 'float';
export const TYPE_DATETIME = 'datetime';

export const getAppState = (): AppState => {
    let inputs: InputState = {
        cartValue: '0.0',
        deliveryDistance: '0',
        numberOfItems: '0',
        orderTime: getDisplayDateTime(new Date()),
    };

    let validate: ValidateState = {
        cartValue: true,
        deliveryDistance: true,
        numberOfItems: true,
        orderTime: true,
    };

    let appState: AppState = {
        inputs: inputs,
        validate: validate,
        showDatePicker: false,
    };

    return appState;
};

export const getDatePickerState = (orderTime: string): DatePickerState => {
    let date = new Date(orderTime);
    let closetMinute = MINUTES.find((minute) => {
        let difference = minute - date.getMinutes();
        return difference > 0 && difference < 5;
    });

    return {
        display: {
            year:  date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate(),
            hour: date.getHours(),
            minute: closetMinute ?? date.getMinutes(),
        },
        selected: {
            year:  date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate(),
            hour: date.getHours(),
            minute: closetMinute ?? date.getMinutes(),
        },
    };
};

export const isSelected = (date: DateInfo, selected: DateInfo): boolean => {
    return (selected.year === date.year) &&
           (selected.month === date.month) &&
           (selected.date === date.date);
};

export const isDisplayMonth = (date: DateInfo, display: DateInfo): boolean => {
    return (display.year === date.year) &&
           (display.month === date.month);
};

export const isToday = (date: DateInfo): boolean => {
    return (new Date().getFullYear() === date.year) &&
           (new Date().getMonth() === date.month) &&
           (new Date().getDate() === date.date);
};

export const getDisplayDateTime = (date: Date): string => {
    return `${date.toISOString().slice(0, 16).replace('T', ' ')}:00`;
};

export const getDisplayDateTimeFromDateInfo = (date: DateInfo): string => {
    return getDisplayDateTime(new Date(date.year, date.month, date.date, date.hour, date.minute));
};

export const getYearAndMonth = (date: DateInfo, backward: boolean = false): [number, number] => {
    if (backward) {
        return (date.month === JANUARY) ? [date.year - 1, DECEMBER] : [date.year, date.month - 1];
    } else {
        return (date.month === DECEMBER) ? [date.year + 1, JANUARY] : [date.year, date.month + 1];
    }
};

export const getCalendarDetails = (currentDate: DateInfo): DateInfo[] => {
    const dateArray = [];

    /**
         * If the first day of current month is different than Sunday,
         * add dates to the start until the last Sunday of previous month.
         * `getDay()` return range is (0 - 6) with 0 is Sunday
         */
    const firstDayOfCurrentMonth = new Date(currentDate.year, currentDate.month, 1);
    const [yearOfPreviousMonth, previousMonth] = getYearAndMonth(currentDate, true);
    const lastDayOfPreviousMonth = new Date(yearOfPreviousMonth, previousMonth + 1, 0);
    for (let i = 0; i < firstDayOfCurrentMonth.getDay(); i++) {
        let dateDetail: DateInfo = {
            year: yearOfPreviousMonth,
            month: previousMonth,
            date: lastDayOfPreviousMonth.getDate() - i,
            hour: 0,
            minute: 0,
        };
        dateArray.unshift(dateDetail);
    }

    /** Add dates of the current month to the array */
    const lastDayOfCurrentMonth = new Date(currentDate.year, currentDate.month + 1, 0);
    for (let i = 1; i <= lastDayOfCurrentMonth.getDate(); i++) {
        let dateDetail: DateInfo = {
            year: currentDate.year,
            month: currentDate.month,
            date: i,
            hour: 0,
            minute: 0,
        };
        dateArray.push(dateDetail);
    }

    /**
         * Add dates for next month to the end until reach 42 elements (since the calendar has 7 cols * 6 rows)
         */
    const [yearOfNextMonth, nextMonth] = getYearAndMonth(currentDate);
    let i = 1;
    while (dateArray.length < 42) {
        let dateDetail: DateInfo = {
            year: yearOfNextMonth,
            month: nextMonth,
            date: i,
            hour: 0,
            minute: 0,
        };
        dateArray.push(dateDetail);
        i++;
    }

    return dateArray;
};

/** Helpers */

export const isEmptyString = (string: string): boolean => {
    return string === '';
};
