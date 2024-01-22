import React, { useState } from 'react';
import { OrderTimeDetails } from 'types';
import {
    getYearAndMonth,
    SHORT_DAYS,
    MONTHS,
    HOURS,
    MINUTES
} from 'utils';

type State = {
    display: OrderTimeDetails,
    selected: OrderTimeDetails
}

export const DatePicker = () => {
    const [state, setState] = useState<State>({
        display: {
            year:  new Date().getFullYear(),
            month: 0,
            date: 0,
            hour: 0,
            minute: 0,
        },
        selected: {
            year:  new Date().getFullYear(),
            month: 0,
            date: 27,
            hour: 8,
            minute: 30,
        },
    });

    const getCalendarDetails = (currentDate: OrderTimeDetails): OrderTimeDetails[] => {
        const dateArray = [];

        /**
         * If the first day of current month is different than Sunday,
         * add dates to the start until the last Sunday of previous month.
         * `getDay()` return range is (0 - 6) with 0 is Sunday
         */
        const firstDayOfCurrentMonth = new Date(currentDate.year, currentDate.month, 1);
        const [yearOfPreviousMonth, previousMonth] = getYearAndMonth(state.display, true);
        const lastDayOfPreviousMonth = new Date(yearOfPreviousMonth, previousMonth + 1, 0);
        for (let i = 0; i < firstDayOfCurrentMonth.getDay(); i++) {
            let dateDetail: OrderTimeDetails = {
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
            let dateDetail: OrderTimeDetails = {
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
        const [yearOfNextMonth, nextMonth] = getYearAndMonth(state.display);
        let i = 1;
        while (dateArray.length < 42) {
            let dateDetail: OrderTimeDetails = {
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

    const isSelected = (date: OrderTimeDetails): boolean => {
        return (state.selected.year === date.year) &&
               (state.selected.month === date.month) &&
               (state.selected.date === date.date);
    };

    const isToday = (date: OrderTimeDetails): boolean => {
        return (new Date().getFullYear() === date.year) &&
               (new Date().getMonth() === date.month) &&
               (new Date().getDate() === date.date);
    };

    const isDisplayMonth = (date: OrderTimeDetails): boolean => {
        return (state.display.year === date.year) &&
               (state.display.month === date.month);
    };

    const onChangeYear = (backward: boolean = false): void => {
        if (backward) {
            const previousYear = state.display.year - 1;
            setState({ ...state, display: { ...state.display, year: previousYear } });
        } else {
            const nextYear = state.display.year + 1;
            setState({ ...state, display: { ...state.display, year: nextYear } });
        }
    };

    const onChangeMonth = (backward: boolean = false): void => {
        if (backward) {
            const [yearOfPreviousMonth, previousMonth] = getYearAndMonth(state.display, true);
            setState({ ...state, display: { ...state.display, year: yearOfPreviousMonth, month: previousMonth } });
        } else {
            const [yearOfNextMonth, nextMonth] = getYearAndMonth(state.display);
            setState({ ...state, display: { ...state.display, year: yearOfNextMonth, month: nextMonth } });
        }
    };

    const onChangeDate = (date: OrderTimeDetails): void => {
        setState({ ...state, selected: { ...state.selected, year: date.year, month: date.month, date: date.date } });
    };

    const onChangeHour = (hour: number): void => {
        setState({ ...state, selected: { ...state.selected, hour: hour } });
    };

    const onChangeMinute = (minute: number): void => {
        setState({ ...state, selected: { ...state.selected, minute: minute } });
    };

    const renderCalendar = (): JSX.Element => {
        let shortDays = SHORT_DAYS.map((day) =>
            <h5 key={ day } className="calendar-item">{ day }</h5>
        );

        let dates = getCalendarDetails(state.display).map((date) => {
            let today = isToday(date) ? ' highlight' : '';
            let selected = isSelected(date) ? ' highlight-selected' : '';

            return (
                <button
                    key={ `${date.year}-${date.month}}-${date.date}` }
                    className={ `calendar-item${today + selected}` }
                    onClick={ () => onChangeDate(date) }
                    disabled={ !isDisplayMonth(date) }
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
                className={ `clock-item${state.selected.hour === hour ? ' highlight-selected' : ''}` }
                onClick={ () => onChangeHour(hour) }
            >
                <strong>{ hour }</strong>
            </button>
        ));

        let minutes = MINUTES.map((minute) => (
            <button
                key={ `minute-${minute}` }
                className={ `clock-item${state.selected.minute === minute ? ' highlight-selected' : ''}` }
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
        <div className="DatePicker">
            <div className="dp-container">
                <div className="dp-head">
                    <button onClick={ () => onChangeYear(true) }>
                        <i className="bi bi-chevron-double-left"></i>
                    </button>
                    <button onClick={ () => onChangeMonth(true) }>
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <div style={ { margin: '0 2rem' } }>
                        <h4 className="text-center">{ state.display.year }</h4>
                        <p className="text-center">{ MONTHS[state.display.month] }</p>
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
        </div>
    );
};
