import {Client} from './client.interface';
import {Employee} from './employee.interface';
import {Service} from './service.interface';
import {WorkStatus} from './work-status.interface';

export interface Order {
  id?: string;
  client: Client;
  contributor: Employee;
  date: Date;
  service: Service;
  workStatus: WorkStatus;
  paymentStatus: boolean;
}
