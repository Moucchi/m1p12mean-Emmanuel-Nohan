import {DateTime} from 'luxon';

export interface Appointment {
  beginning : DateTime,
  ending : DateTime,
  title : string,
  description : string,
  client : string,
}
