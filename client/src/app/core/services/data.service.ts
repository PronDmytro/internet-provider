import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Client} from '../models/client.interface';
import {ApiRequestsService} from './api-requests.service';
import {Order} from '../models/order.interface';
import {Employee} from '../models/employee.interface';
import {Position} from '../models/position.interface';
import {Payment} from '../models/payment.interface';
import {WorkStatus} from '../models/work-status.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  // @ts-ignore
  public clientsData$ = new BehaviorSubject<Client[] | undefined>(null);
  // @ts-ignore
  public employeesData$ = new BehaviorSubject<Employee[] | undefined>(null);
  // @ts-ignore
  public positionsData$ = new BehaviorSubject<Position[] | undefined>(null);
  // @ts-ignore
  public ordersData$ = new BehaviorSubject<Order[] | undefined>(null);
  // @ts-ignore
  public paymentsData$ = new BehaviorSubject<Payment[] | undefined>(null);
  // @ts-ignore
  public workStatusData$ = new BehaviorSubject<WorkStatus[] | undefined>(null);
  // @ts-ignore
  public servicesData$ = new BehaviorSubject<Service[] | undefined>(null);

  public constructor(
    public apiRequestsService: ApiRequestsService,
  ) {
  }

  public async loadCurrentDataFromServer() {
    const clientsData = await this.apiRequestsService.getClientsData().toPromise();
    this.clientsData$.next(clientsData);

    const employeesData = await this.apiRequestsService.getEmployeesData().toPromise();
    this.employeesData$.next(employeesData);

    const positionsData = await this.apiRequestsService.getPositionsData().toPromise();
    this.positionsData$.next(positionsData);

    const ordersData = await this.apiRequestsService.getOrdersData().toPromise();
    this.ordersData$.next(ordersData);

    const paymentsData = await this.apiRequestsService.getPaymentsData().toPromise();
    this.paymentsData$.next(paymentsData);

    const workStatusData = await this.apiRequestsService.getWorkStatusData().toPromise();
    this.workStatusData$.next(workStatusData);

    const servicesData = await this.apiRequestsService.getServicesData().toPromise();
    this.servicesData$.next(servicesData);
  }

}
