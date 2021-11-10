import {Client} from './client.interface';
import {Employee} from './employee.interface';
import {Service} from './service.interface';
import {WorkStatus} from './work-status.interface';

export interface Order {
  id?: string;
  client: Client;
  contributor: Employee;
  orderDate: string;
  service: Service;
  workStatus: WorkStatus;
  paymentStatus: boolean;
}
