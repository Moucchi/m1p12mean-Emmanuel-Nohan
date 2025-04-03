interface Item{
    name: string,
    price: number,
    qty: number
}

export interface Appointment {
    _id: string,
    startedAt: Date,
    endingAt: Date,
    brandName: string,
    brandLogo: string,
    vehicleType: string,
    report: string,
    items: Item[],
    reportImages: string[],
    rate: number,
    orderCreatedAt : Date,
    registrationNumber: string,
    hoverRate: number
}
