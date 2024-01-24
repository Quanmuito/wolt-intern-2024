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
export const HOURS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
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
        orderTime: formatDateFromDate(new Date()),
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

export const validateInput = (type: string, value: string): boolean => {
    if (isEmptyString(value)) {
        return true;
    }

    switch (type) {
        case TYPE_INT: {
            let parsedValue = Number.parseInt(value);
            return !/[^0-9]/.test(value) && Number.isInteger(parsedValue);
        }

        case TYPE_FLOAT: {
            let parsedValue = Number.parseFloat(value);
            return !/[^0-9.,]/.test(value) && typeof(parsedValue) === 'number';
        }

        case TYPE_DATETIME: {
            let dateParts = value.split(/[\s,]+/); // Split by space or comma
            let dateComponents = dateParts[0];
            let timeComponents = dateParts[1];
            console.log(dateComponents, timeComponents);
            let dateMatchFormat = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.test(dateComponents);
            let timeMatchFormat = /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/.test(timeComponents);
            return dateMatchFormat && timeMatchFormat;
        }

        default:
            return false;
    }
};

export const getDatePickerState = (orderTime: string): DatePickerState => {
    let dateInfo = getDateInfoFromFormattedTime(orderTime);
    let closetMinuteInterval = getClosetMinuteInterval(dateInfo.minute);

    return {
        display: { ...dateInfo, minute: closetMinuteInterval ?? dateInfo.minute },
        selected: { ...dateInfo, minute: closetMinuteInterval ?? dateInfo.minute },
    };
};

export const isSelected = (dateInfo: DateInfo, selected: DateInfo): boolean => {
    return (dateInfo.year === selected.year) &&
           (dateInfo.month === selected.month) &&
           (dateInfo.date === selected.date);
};

export const isDisplayMonth = (dateInfo: DateInfo, display: DateInfo): boolean => {
    return (dateInfo.year === display.year) &&
           (dateInfo.month === display.month);
};

export const isToday = (dateInfo: DateInfo): boolean => {
    let formattedToday = formatDateFromDate(new Date());
    let todayInfo = getDateInfoFromFormattedTime(formattedToday);

    return (dateInfo.year === todayInfo.year) &&
           (dateInfo.month === todayInfo.month) &&
           (dateInfo.date === todayInfo.date);
};

export const isCurrentHour = (hour: number): boolean => {
    let formattedNow = formatDateFromDate(new Date());
    let nowInfo = getDateInfoFromFormattedTime(formattedNow);
    return hour === nowInfo.hour;
};

export const isCurrentMinute = (minute: number): boolean => {
    let formattedNow = formatDateFromDate(new Date());
    let nowInfo = getDateInfoFromFormattedTime(formattedNow);
    let closetMinuteInterval = getClosetMinuteInterval(nowInfo.minute);
    return minute === closetMinuteInterval;
};

export const getClosetMinuteInterval = (minute: number): number => {
    let closetMinuteInterval = MINUTES.find((minuteInterval) => {
        let difference = minuteInterval - minute;
        return difference > 0 && difference < 5;
    });

    return closetMinuteInterval ?? minute;
};

export const getYearAndMonth = (dateInfo: DateInfo, backward: boolean = false): [number, number] => {
    if (backward) {
        return (dateInfo.month === JANUARY) ? [dateInfo.year - 1, DECEMBER] : [dateInfo.year, dateInfo.month - 1];
    } else {
        return (dateInfo.month === DECEMBER) ? [dateInfo.year + 1, JANUARY] : [dateInfo.year, dateInfo.month + 1];
    }
};

export const getCalendarItems = (dateInfo: DateInfo): DateInfo[] => {
    const dateArray = [];

    /**
     * If the first day of current month is different than Sunday,
     * add dates to the start until the last Sunday of previous month.
     * `getDay()` return range is (0 - 6) with 0 is Sunday
     */
    const firstDayOfCurrentMonth = new Date(dateInfo.year, dateInfo.month, 1);
    const [yearOfPreviousMonth, previousMonth] = getYearAndMonth(dateInfo, true);
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
    const lastDayOfCurrentMonth = new Date(dateInfo.year, dateInfo.month + 1, 0);
    for (let i = 1; i <= lastDayOfCurrentMonth.getDate(); i++) {
        let dateDetail: DateInfo = {
            year: dateInfo.year,
            month: dateInfo.month,
            date: i,
            hour: 0,
            minute: 0,
        };
        dateArray.push(dateDetail);
    }

    /**
     * Add dates for next month to the end until reach 42 elements (since the calendar has 7 cols * 6 rows)
     */
    const [yearOfNextMonth, nextMonth] = getYearAndMonth(dateInfo);
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

/** Make sure display time always in browser timezone */
export const formatDateFromDate = (date: Date): string => {
    let dateString = date.toLocaleString('en-GB', {
        timeZone: new window.Intl.DateTimeFormat().resolvedOptions().timeZone,
        hourCycle: 'h23',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    return dateString;
};

export const formatDateFromDateInfo = (dateInfo: DateInfo): string => {
    let date = formatElement(dateInfo.date);
    let month = formatElement(dateInfo.month + 1);
    let hour = formatElement(dateInfo.hour);
    let min = formatElement(dateInfo.minute);
    return `${date}/${month}/${dateInfo.year}, ${hour}:${min}:00`;
};

export const formatElement = (element: number): string => {
    let elementString = element.toString();
    return elementString.length === 2 ? elementString : `0${elementString}`;
};

export const getDateInfoFromFormattedTime = (formattedTime: string): DateInfo => {
    let dateParts = formattedTime.split(/[\s,]+/); // Split by space or comma
    let dateComponents = dateParts[0].split('/'); // Split date by slash
    let timeComponents = dateParts[1].split(':'); // Split time by colon

    return {
        year: Number.parseInt(dateComponents[2], 10),
        month: Number.parseInt(dateComponents[1], 10) - 1, // Months are zero-based
        date: Number.parseInt(dateComponents[0], 10),
        hour: Number.parseInt(timeComponents[0], 10),
        minute: Number.parseInt(timeComponents[1], 10),
    };
};
