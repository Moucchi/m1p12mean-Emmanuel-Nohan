import {computed, Injectable, signal, Signal, WritableSignal} from "@angular/core";
import {DateTime, Info, Interval} from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  today: Signal<DateTime> = signal(DateTime.local());

  weekDays: Signal<string[]> = signal(Info.weekdays('short'));

  getDaysOfMonth(firstDayOfActiveMonth: WritableSignal<DateTime>) {
    return computed(() => {
      return Interval
        .fromDateTimes(
          firstDayOfActiveMonth().startOf('week'),
          firstDayOfActiveMonth().endOf('month').endOf('week')
        ).splitBy({day: 1})
        .map((d) => {
          if (d.start === null) {
            throw new Error('Wrong date');
          }
          return d.start;
        });
    });
  }

  nextMonth(firstDayOfActiveMonth: WritableSignal<DateTime>) {
    firstDayOfActiveMonth.update((d) => d.plus({month: 1}));
  }

  goToPresent(firstDayOfActiveMonth: WritableSignal<DateTime>) {
    firstDayOfActiveMonth.update(() => this.today().startOf('month'));
  }

  previousMonth(firstDayOfActiveMonth: WritableSignal<DateTime>) {
    firstDayOfActiveMonth.update((d) => d.minus({month: 1}));
  }

  isToday(day: DateTime): boolean {
    const today = this.today().toISODate();
    const dayOfMonth = day.toISODate();

    return today === dayOfMonth;
  }

  setActiveDay(day: DateTime, activeDay: WritableSignal<DateTime| null>) {
    activeDay.update(() => day);
  }

}
