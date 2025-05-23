import {DateTime} from 'luxon';

export interface appointmentItem {
  name: string,
  price: number,
  qty: number,
  showQt: boolean,
  serviceId: string,
  _id: string
}

export interface MechanicAppointmentInterface {
  _id: string,
  state: string,
  orderCreatedAt: DateTime,
  startedDate: DateTime,
  endingDate: DateTime,
  vehicleDescription: string,
  brandName: string,
  brandLogo: string,
  vehicleType: string,
  items : appointmentItem[],
  clientVehicle: string
}

export interface MechanicAppointments {
  pending ?: MechanicAppointmentInterface[];
  set ?: MechanicAppointmentInterface[];
  confirmed ?: MechanicAppointmentInterface[];
  in_progress ?: MechanicAppointmentInterface[];
}
