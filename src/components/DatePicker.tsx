import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { AppState, DatePickerState, DateInfo } from 'types';
import {
    getDatePickerState,
    getYearAndMonth,
    getCalendarItems,
    isToday,
    isSelected,
    isDisplayMonth,
    formatDateFromDateInfo,
    SHORT_DAYS,
    MONTHS,
    HOURS,
    MINUTES,
    isCurrentHour,
    isCurrentMinute
} from 'utils';

type DatePickerPropsType = {
    showDatePicker: boolean,
    orderTime: string,
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
}

export const DatePicker = ({ showDatePicker, orderTime, setAppState }: DatePickerPropsType) => {
    const [datePickerState, setDatePickerState] = useState<DatePickerState>(getDatePickerState(orderTime));

    useEffect(() => setDatePickerState(getDatePickerState(orderTime)), [orderTime]);

    const onChangeYear = (backward: boolean = false): void => {
        let year = datePickerState.display.year;

        if (backward) {
            year -= 1;
        } else {
            year += 1;
        }

        setDatePickerState({ ...datePickerState, display: { ...datePickerState.display, year: year } });
    };

    const onChangeMonth = (backward: boolean = false): void => {
        const [year, month] = getYearAndMonth(datePickerState.display, backward);
        setDatePickerState({ ...datePickerState, display: { ...datePickerState.display, year: year, month: month } });
    };

    const onSelectDate = (dateInfo: DateInfo): void => {
        setDatePickerState({
            ...datePickerState,
            selected: {
                ...datePickerState.selected,
                year: dateInfo.year,
                month: dateInfo.month,
                date: dateInfo.date,
            },
        });
    };

    const onSelectHour = (hour: number): void => {
        setDatePickerState({ ...datePickerState, selected: { ...datePickerState.selected, hour: hour } });
    };

    const onSelectMinute = (minute: number): void => {
        setDatePickerState({ ...datePickerState, selected: { ...datePickerState.selected, minute: minute } });
    };

    const onModalClose = () => {
        setAppState((prevState) => ({
            ...prevState,
            inputs: {
                ...prevState.inputs,
                orderTime: formatDateFromDateInfo(datePickerState.selected),
            },
            showDatePicker: false,
        }));
    };

    const renderCalendar = (): JSX.Element => {
        let shortDays = SHORT_DAYS.map((day) =>
            <h5 key={ day } className="calendar-item">{ day }</h5>
        );

        let days = getCalendarItems(datePickerState.display).map((dateInfo) => {
            let today = isToday(dateInfo) ? ' highlight' : '';
            let selected = isSelected(dateInfo, datePickerState.selected) ? ' highlight-selected' : '';

            return (
                <button
                    key={ `${dateInfo.year}-${dateInfo.month}}-${dateInfo.date}` }
                    className={ `calendar-item${today + selected}` }
                    onClick={ () => onSelectDate(dateInfo) }
                    disabled={ !isDisplayMonth(dateInfo, datePickerState.display) }
                >
                    <strong>{ dateInfo.date }</strong>
                </button>
            );
        });

        return (
            <div>
                <div className="calendar-head">
                    { shortDays }
                </div>
                <div className="calendar-body">
                    { days }
                </div>
            </div>
        );
    };

    const renderClock = () => {
        let hours = HOURS.map((hour) => {
            let current = isCurrentHour(hour) ? ' highlight' : '';
            let selected = (datePickerState.selected.hour === hour) ? ' highlight-selected' : '';

            return (
                <button
                    key={ `hour-${hour}` }
                    className={ `clock-item${current + selected}` }
                    onClick={ () => onSelectHour(hour) }
                >
                    <strong>{ hour }</strong>
                </button>
            );
        });

        let minutes = MINUTES.map((minute) => {
            let current = isCurrentMinute(minute) ? ' highlight' : '';
            let selected = (datePickerState.selected.minute === minute) ? ' highlight-selected' : '';

            return (
                <button
                    key={ `minute-${minute}` }
                    className={ `clock-item${current + selected}` }
                    onClick={ () => onSelectMinute(minute) }
                >
                    <strong>{ minute }</strong>
                </button>
            );
        });

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
        <Modal
            show={ showDatePicker }
            onHide={ onModalClose }
            onClose={ onModalClose }
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <h3>{ formatDateFromDateInfo(datePickerState.selected) }</h3>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
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
            </Modal.Body>
        </Modal>
    );
};
