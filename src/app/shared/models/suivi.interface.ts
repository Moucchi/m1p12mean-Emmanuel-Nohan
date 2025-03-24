import { Appointment } from "./appointment.interface";

export interface Suivi {
    pending: Appointment[],
    set: Appointment[],
    confirmed: Appointment[],
    in_progress: Appointment[]
}