import {Component, computed, signal, Signal, WritableSignal} from '@angular/core';
import {DateTime, Info, Interval} from 'luxon';
import {NgClass} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  imports: [
    NgClass,
    MatIcon
  ],
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  today: Signal<DateTime> = signal(DateTime.local());

  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month')
  );

  weekDays: Signal<string[]> = signal(Info.weekdays('short'));

  daysOfMonth: Signal<DateTime[]> = computed(() => {
    return Interval
      .fromDateTimes(
        this.firstDayOfActiveMonth().startOf('week'),
        this.firstDayOfActiveMonth().endOf('month').endOf('week')
      ).splitBy({day: 1})
      .map((d) => {
        if (d.start === null) {
          throw new Error('Wrong date');
        }
        return d.start;
      });
  });

  activeDay: WritableSignal<DateTime | null> = signal(null);

  log() {
    console.log(this.daysOfMonth());
  }

  nextMonth() {
    this.firstDayOfActiveMonth.update((d) => d.plus({month: 1}));
  }

  goToPresent() {
    this.firstDayOfActiveMonth.update(() => this.today().startOf('month'));
  }

  previousMonth() {
    this.firstDayOfActiveMonth.update((d) => d.minus({month: 1}));
  }

  isToday(day: DateTime): boolean {
    const today = this.today().toISODate();
    const dayOfMonth = day.toISODate();

    return today === dayOfMonth;
  }

  setActiveDay(day: DateTime) {
    this.activeDay.update(() => day);
  }

  protected readonly DateTime = DateTime;
}
