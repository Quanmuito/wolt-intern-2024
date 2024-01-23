export type InputState = {
    cartValue: string,
    deliveryDistance: string,
    numberOfItems: string,
    orderTime: string,
    [index: string]: string
}

export type ValidateState = {
    cartValue: boolean,
    deliveryDistance: boolean,
    numberOfItems: boolean,
    orderTime: boolean,
    [index: string]: boolean
}

export type AppState = {
    inputs: InputState,
    validate: ValidateState,
    showDatePicker: boolean,
}

export type DatePickerState = {
    display: DateInfo,
    selected: DateInfo
}

export type DateInfo = {
    year: number,
    month: number,
    date: number,
    hour: number,
    minute: number,
}
