import {ServiceRatingInterface} from './service-rating-interface';
import {MonthlyAttendanceInterface} from './monthly-attendance-interface';

export interface GarageDashboardInterface {
  avgRate: number;
  upcomingAppointment: number;
  totalClients: number;
  totalRevenueCurrentMonth: number;
  topServices: ServiceRatingInterface[];
  attendancePerMonth: MonthlyAttendanceInterface[];
}
