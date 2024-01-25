export type AppState = {
    cartValue: number,
    deliveryDistance: number,
    numberOfItems: number,
    orderTime: string,
}

export type FormFields = {
    cartValue: number,
    deliveryDistance: number,
    numberOfItems: number,
    orderTime: string,
    fee: string,
}

export type InputDetails = {
    id: keyof FormFields,
    label: string,
    type: string,
    description: string,
}
