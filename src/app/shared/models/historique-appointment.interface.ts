interface Item{
    name: string,
    price: number,
    qty: number
}

export interface HistoryItem {
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
    registrationNumber: string
}
