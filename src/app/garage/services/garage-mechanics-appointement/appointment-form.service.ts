import {Injectable} from '@angular/core';
import {DateTime} from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class AppointmentFormService {
  formatIntoDateTime(date: string, time: DateTime): string {
    const dateObj = DateTime.fromISO(date);

    let formated = dateObj.set({
      hour: time.hour,
      minute: time.minute,
      second: time.second,
    });

    return `${formated.toISODate()} ${formated.toLocaleString(DateTime.TIME_24_SIMPLE)}`;
  }
}
