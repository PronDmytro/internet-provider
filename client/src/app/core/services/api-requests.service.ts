import {Injectable} from '@angular/core';
import {ApiService} from './api/api.service';
import {Observable} from 'rxjs';
import {Client} from '../models/client.interface';
import {Order} from '../models/order.interface';
import {Position} from '../models/position.interface';
import {Employee} from '../models/employee.interface';
import {WorkStatus} from '../models/work-status.interface';
import {Payment} from '../models/payment.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestsService {

  private clientEndpoint = '/client';
  private orderEndpoint = '/order';
  private employeeEndpoint = '/employee';
  private positionEndpoint = '/position';
  private workStatusEndpoint = '/work-status';
  private paymentEndpoint = '/payment';

  public constructor(private apiService: ApiService) {
  }

  public getClientsData(): Observable<Client[]> {
    return this.apiService.get(this.clientEndpoint);
  }

  public getClientDataByEmail(email: string): Observable<Client> {
    return this.apiService.get(this.clientEndpoint + `/${email}`);
  }

  public updateClientData(client: Client) {
    return this.apiService.put(this.clientEndpoint, client);
  }

  public createClient(client: Client) {
    return this.apiService.post(this.clientEndpoint, client);
  }

  public deleteClientData(client: Client) {
    return this.apiService.delete(this.clientEndpoint+ `/${client.id}`, client);
  }

  public getOrdersData(): Observable<Order[]> {
    return this.apiService.get(this.orderEndpoint);
  }

  public getOrderDataById(id: string): Observable<Order> {
    return this.apiService.get(this.orderEndpoint + `/${id}`);
  }

  public updateOrderData(order: Order) {
    return this.apiService.put(this.orderEndpoint, order);
  }

  public createOrder(order: Order) {
    return this.apiService.post(this.orderEndpoint, order);
  }

  public deleteOrderData(order: Order) {
    return this.apiService.delete(this.orderEndpoint+ `/${order.id}`, order);
  }

  public getPositionsData(): Observable<Position[]> {
    return this.apiService.get(this.positionEndpoint);
  }

  public getPositionDataById(id: string): Observable<Position> {
    return this.apiService.get(this.positionEndpoint + `/${id}`);
  }

  public updatePositionData(data: Position) {
    return this.apiService.put(this.positionEndpoint, data);
  }

  public createPosition(data: Position) {
    return this.apiService.post(this.positionEndpoint, data);
  }

  public deletePositionData(data: Position) {
    return this.apiService.delete(this.positionEndpoint+ `/${data.id}`, data);
  }

  public getEmployeesData(): Observable<Employee[]> {
    return this.apiService.get(this.employeeEndpoint);
  }

  public getEmployeeDataByEmail(email: string): Observable<Employee> {
    return this.apiService.get(this.employeeEndpoint + `/${email}`);
  }

  public updateEmployeeData(data: Employee) {
    return this.apiService.put(this.employeeEndpoint, data);
  }

  public createEmployee(data: Employee) {
    return this.apiService.post(this.employeeEndpoint, data);
  }

  public deleteEmployeeData(data: Employee) {
    return this.apiService.delete(this.employeeEndpoint+ `/${data.id}`, data);
  }

  public getWorkStatusData(): Observable<WorkStatus[]> {
    return this.apiService.get(this.workStatusEndpoint);
  }

  public getWorkStatusDataById(id: string): Observable<WorkStatus> {
    return this.apiService.get(this.workStatusEndpoint + `/${id}`);
  }

  public updateWorkStatusData(data: WorkStatus) {
    return this.apiService.put(this.workStatusEndpoint, data);
  }

  public createWorkStatus(data: WorkStatus) {
    return this.apiService.post(this.workStatusEndpoint, data);
  }

  public deleteWorkStatusData(data: WorkStatus) {
    return this.apiService.delete(this.workStatusEndpoint+ `/${data.id}`, data);
  }

  public getPaymentsData(): Observable<Payment[]> {
    return this.apiService.get(this.paymentEndpoint);
  }

  public getPaymentDataById(id: string): Observable<Payment> {
    return this.apiService.get(this.paymentEndpoint + `/${id}`);
  }

  public updatePaymentData(data: Payment) {
    return this.apiService.put(this.paymentEndpoint, data);
  }

  public createPayment(data: Payment) {
    return this.apiService.post(this.paymentEndpoint, data);
  }

  public deletePaymentData(data: Payment) {
    return this.apiService.delete(this.paymentEndpoint+ `/${data.id}`, data);
  }

}
