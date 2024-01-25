export type AppState = {
    cartValue: number,
    deliveryDistance: number,
    numberOfItems: number,
    orderTime: string,
}

export type InputDetails = {
    id: keyof AppState,
    label: string,
    type: string,
    description: string,
}
