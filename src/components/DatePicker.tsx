import React, { useEffect, useState } from 'react';
import { AppState, DatePickerState, DateInfo } from 'types';
import {
    getYearAndMonth,
    getCalendarDetails,
    isToday,
    isSelected,
    isDisplayMonth,
    SHORT_DAYS,
    MONTHS,
    HOURS,
    MINUTES,
    getDatePickerState,
    getDisplayDateTimeFromDateInfo
} from 'utils';

type DatePickerPropsType = {
    orderTime: string,
    setState: React.Dispatch<React.SetStateAction<AppState>>
}

export const DatePicker = ({ orderTime, setState }: DatePickerPropsType) => {
    console.log('hi');
    const [datePickerState, setDatePickerState] = useState<DatePickerState>(getDatePickerState(orderTime));

    useEffect(() => setDatePickerState(getDatePickerState(orderTime)), [orderTime]);

    const onChangeYear = (backward: boolean = false): void => {
        if (backward) {
            const previousYear = datePickerState.display.year - 1;
            setDatePickerState({ ...datePickerState, display: { ...datePickerState.display, year: previousYear } });
        } else {
            const nextYear = datePickerState.display.year + 1;
            setDatePickerState({ ...datePickerState, display: { ...datePickerState.display, year: nextYear } });
        }
    };

    const onChangeMonth = (backward: boolean = false): void => {
        if (backward) {
            const [yearOfPreviousMonth, previousMonth] = getYearAndMonth(datePickerState.display, true);
            setDatePickerState({ ...datePickerState, display: { ...datePickerState.display, year: yearOfPreviousMonth, month: previousMonth } });
        } else {
            const [yearOfNextMonth, nextMonth] = getYearAndMonth(datePickerState.display);
            setDatePickerState({ ...datePickerState, display: { ...datePickerState.display, year: yearOfNextMonth, month: nextMonth } });
        }
    };

    const onChangeDate = (date: DateInfo): void => {
        setDatePickerState({ ...datePickerState, selected: { ...datePickerState.selected, year: date.year, month: date.month, date: date.date } });
    };

    const onChangeHour = (hour: number): void => {
        setDatePickerState({ ...datePickerState, selected: { ...datePickerState.selected, hour: hour } });
    };

    const onChangeMinute = (minute: number): void => {
        setDatePickerState({ ...datePickerState, selected: { ...datePickerState.selected, minute: minute } });
    };

    const afterSelect = (): void => {
        setState((prevState) => (
            {
                ...prevState,
                inputs: {
                    ...prevState.inputs,
                    orderTime: getDisplayDateTimeFromDateInfo(datePickerState.selected),
                },
            }
        ));
    };

    const renderCalendar = (): JSX.Element => {
        let shortDays = SHORT_DAYS.map((day) =>
            <h5 key={ day } className="calendar-item">{ day }</h5>
        );

        let dates = getCalendarDetails(datePickerState.display).map((date) => {
            let today = isToday(date) ? ' highlight' : '';
            let selected = isSelected(date, datePickerState.selected) ? ' highlight-selected' : '';

            return (
                <button
                    key={ `${date.year}-${date.month}}-${date.date}` }
                    className={ `calendar-item${today + selected}` }
                    onClick={ () => onChangeDate(date) }
                    disabled={ !isDisplayMonth(date, datePickerState.display) }
                >
                    <strong>{ date.date }</strong>
                </button>
            );
        });

        return (
            <div>
                <div className="calendar-head">
                    { shortDays }
                </div>
                <div className="calendar-body">
                    { dates }
                </div>
            </div>
        );
    };

    const renderClock = () => {
        let hours = HOURS.map((hour) => (
            <button
                key={ `hour-${hour}` }
                className={ `clock-item${datePickerState.selected.hour === hour ? ' highlight-selected' : ''}` }
                onClick={ () => onChangeHour(hour) }
            >
                <strong>{ hour }</strong>
            </button>
        ));

        let minutes = MINUTES.map((minute) => (
            <button
                key={ `minute-${minute}` }
                className={ `clock-item${datePickerState.selected.minute === minute ? ' highlight-selected' : ''}` }
                onClick={ () => onChangeMinute(minute) }
            >
                <strong>{ minute }</strong>
            </button>
        ));

        return (
            <div className="clock">
                <div className="clock-hours">
                    <h5 className="col-12 p-3 text-center">HOURS</h5>
                    { hours }
                </div>
                <div className="clock-separator"></div>
                <div className="clock-minutes">
                    <h5 className="col-12 p-3 text-center">MINS</h5>
                    { minutes }
                </div>
            </div>
        );
    };

    return (
        <div className="dp-container">
            <div className="dp-head">
                <button onClick={ () => onChangeYear(true) }>
                    <i className="bi bi-chevron-double-left"></i>
                </button>
                <button onClick={ () => onChangeMonth(true) }>
                    <i className="bi bi-chevron-left"></i>
                </button>
                <div style={ { margin: '0 2rem' } }>
                    <h3 className="text-center">{ datePickerState.display.year }</h3>
                    <h5 className="text-center">{ MONTHS[datePickerState.display.month] }</h5>
                </div>
                <button onClick={ () => onChangeMonth() }>
                    <i className="bi bi-chevron-right"></i>
                </button>
                <button onClick={ () => onChangeYear() }>
                    <i className="bi bi-chevron-double-right"></i>
                </button>
            </div>
            <div className="dp-body">
                { renderCalendar() }
            </div>
            <div className="dp-body">
                { renderClock() }
            </div>
        </div>
    );
};
