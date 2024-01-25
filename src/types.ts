export type InputFields = {
    cartValue: number,
    deliveryDistance: number,
    numberOfItems: number,
    orderTime: string,
}

export type InputDetails = {
    id: keyof InputFields,
    label: string,
    type: string,
    description: string,
}
