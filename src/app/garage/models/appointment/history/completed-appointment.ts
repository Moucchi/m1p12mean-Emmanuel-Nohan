export interface CompletedAppointmentItem{
  name: string,
  price: number,
  qty: number,
  showQt: boolean,
  serviceId?: string,
  _id: string
}

export interface CompletedAppointmentClient {
  email: string,
  firstName: string,
  lastName: string
}

export interface CompletedAppointmentMechanic {
  email: string,
  firstName: string,
  lastName: string
}

export interface CompletedAppointment {
  _id: string,
  startedAt: string,
  endingAt: string,
  registrationNumber: string,
  brandName: string,
  brandLogo: string,
  vehicleType: string,
  report: string,
  reportImages: string[],
  items: CompletedAppointmentItem[],
  rate: number,
  client: CompletedAppointmentClient,
  mechanic: CompletedAppointmentMechanic,
}

export interface CompletedAppointmentResponse {
  data: CompletedAppointment[],
  total: number,
  totalPages: number,
  page: number
}
