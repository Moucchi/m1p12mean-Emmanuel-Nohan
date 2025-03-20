import {DateTime} from 'luxon';

export interface CalendarEventInterface {
  mechanicId : string,
  beginning : DateTime,
  ending : DateTime,
  clientId : string,
  vehicleId: string,
}
