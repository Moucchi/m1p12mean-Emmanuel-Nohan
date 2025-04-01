import {DateTime} from 'luxon';

export interface MechanicAppointmentInterface {
  "_id": string,
  "state": string,
  "orderCreatedAt": DateTime,
  "startedDate": DateTime,
  "endingDate": DateTime,
  "vehicleDescription": string,
  "brandName": string,
  "brandLogo": string,
  "vehicleType": string
}

export interface MechanicAppointments {
  pending : MechanicAppointmentInterface[];
  set : MechanicAppointmentInterface[];
  confirmed : MechanicAppointmentInterface[];
  in_progress : MechanicAppointmentInterface[];
}
