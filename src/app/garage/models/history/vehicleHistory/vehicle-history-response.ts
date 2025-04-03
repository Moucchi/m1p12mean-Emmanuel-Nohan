export interface VehicleHistoryItemInterface {
  name: string,
  price: number,
  qty: number,
  showQt: false,
  serviceId: string,
  _id: string
}

export interface VehicleHistoryInterface {
  _id: string,
  startedAt: string,
  endingAt: string,
  brandName: string,
  brandLogo: string,
  vehicleType: string,
  report: string,
  reportImages: string[],
  items: VehicleHistoryItemInterface[]

}

export interface VehicleHistoryResponse {
  data : VehicleHistoryInterface[]
}
