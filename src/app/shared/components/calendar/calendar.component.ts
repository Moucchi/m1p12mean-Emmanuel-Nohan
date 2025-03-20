import {Component, computed, inject, signal, Signal, WritableSignal} from '@angular/core';
import {DateTime} from 'luxon';
import {NgClass} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {CalendarService} from '../../services/calendar/calendar.service';

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
  protected calendarService = inject(CalendarService);

  today = computed( () => this.calendarService.today()) ;

  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month')
  );

  weekDays: string[] = this.calendarService.weekDays();

  daysOfMonth: Signal<DateTime[]> = this.calendarService.getDaysOfMonth(this.firstDayOfActiveMonth);

  activeDay: WritableSignal<DateTime | null> = signal(null);
  protected readonly DATE_MED = DateTime.DATE_MED;
}
