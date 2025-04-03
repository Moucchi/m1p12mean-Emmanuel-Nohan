import {Component, computed, inject, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {DateTime} from 'luxon';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {CalendarService} from '../../services/calendar/calendar.service';
import {LayoutStore} from '../../store/garage-layout.store';
import {MechanicAppointmentStore} from '../../store/mechanicAppointment.store';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  imports: [
    NgClass,
    MatIcon,
    NgOptimizedImage
  ],
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  protected calendarService = inject(CalendarService);
  protected readonly layoutStore = inject(LayoutStore);
  protected readonly appointmentStore = inject(MechanicAppointmentStore);

  today = computed(() => this.calendarService.today());

  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month')
  );

  weekDays: string[] = this.calendarService.weekDays();

  daysOfMonth: Signal<DateTime[]> = this.calendarService.getDaysOfMonth(this.firstDayOfActiveMonth);

  activeDay: WritableSignal<DateTime | null> = signal(null);
  protected readonly DATE_MED = DateTime.DATE_MED;

  allAppointments = computed(() => {
    return [
      ...(this.appointmentStore.appointments().set || []),
      ...(this.appointmentStore.appointments().confirmed || []),
      ...(this.appointmentStore.appointments().in_progress || [])
    ];
  });

  activeDayAppointments = computed(() => {
    if (!this.activeDay()) return [];

    const activeDate = this.activeDay()?.toISODate();
    return this.allAppointments().filter(appointment => {

      if (!appointment.startedDate) return false;
      const startDate = DateTime.fromISO(appointment.startedDate.toString()).setZone('UTC+0').toISODate();
      return startDate === activeDate;
    }).sort((a, b) => {

      if (!a.startedDate || !b.startedDate) return 0;

      return DateTime.fromISO(a.startedDate.toString()) < DateTime.fromISO(b.startedDate.toString()) ? -1 : 1;
    });
  });

  hasAppointments(day: DateTime): boolean {
    const dayIso = day.toISODate();

    return this.allAppointments().some(appointment => {
      if (!appointment.startedDate) return false;

      const appointmentDate = DateTime.fromISO(appointment.startedDate.toString()).setZone('UTC+0').toISODate();
      return appointmentDate === dayIso;
    });
  }

  countAppointments(day: DateTime): number {
    const dayIso = day.toISODate();
    return this.allAppointments().filter(appointment => {

      if (!appointment.startedDate) return false;

      const appointmentDate = DateTime.fromISO(appointment.startedDate.toString()).setZone('UTC+0').toISODate();

      return appointmentDate === dayIso;
    }).length;
  }

  getAppointmentStatusColor(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'set':
        return 'bg-blue-500';
      case 'confirmed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  }

  ngOnInit(): void {
    const text = "Calendrier des évènements";
    this.layoutStore.setText(text);

    this.activeDay.set(this.today());
    this.appointmentStore.track();
  }

  protected readonly DateTime = DateTime;
}
