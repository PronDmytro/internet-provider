import {Order} from './order.interface';

export interface Payment {
  id?: string;
  sum: number;
  date: Date;
  order: Order;
}
