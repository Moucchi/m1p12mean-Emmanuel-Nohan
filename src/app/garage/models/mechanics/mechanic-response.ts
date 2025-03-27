import {Mechanics} from './mechanics';

export interface MechanicResponse {
  data : Mechanics[];
  total: number;
  totalPage: number;
  page: number;
}
