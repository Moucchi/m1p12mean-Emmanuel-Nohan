export interface MonthlyAttendanceInterface {
  month : number;
  totalPrestations : number;
}

export interface MonthlyAttendanceInterfaceResponse{
  data : MonthlyAttendanceInterface[]
}
