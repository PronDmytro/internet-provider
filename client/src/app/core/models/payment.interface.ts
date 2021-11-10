import {Order} from './order.interface';

export interface Payment {
  id?: string;
  sum: number;
  date?: string;
  order: Order;
}
