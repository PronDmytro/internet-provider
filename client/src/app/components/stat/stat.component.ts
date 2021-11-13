import {Component, OnInit} from '@angular/core';
import {Client} from '../../core/models/client.interface';
import {Employee} from '../../core/models/employee.interface';
import {Service} from '../../core/models/service.interface';
import {DataService} from '../../core/services/data.service';
import {Payment} from '../../core/models/payment.interface';
import {Order} from '../../core/models/order.interface';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss'],
})
export class StatComponent implements OnInit {

  public clients: Client[] | undefined;
  public contributors: Employee[] | undefined;
  public services: Service[] | undefined;
  public payments: Payment[] | undefined;
  public orders: Order[] | undefined;

  public constructor(
    private dataService: DataService,
  ) {
  }

  public ngOnInit(): void {
    this.dataService.employeesData$.asObservable().subscribe((data) => {
      // @ts-ignore
      this.contributors = data;
    });
    this.dataService.clientsData$.asObservable().subscribe((data) => {
      // @ts-ignore
      this.clients = data;
    });
    this.dataService.servicesData$.asObservable().subscribe((data) => {
      // @ts-ignore
      this.services = data;
    });
    this.dataService.paymentsData$.asObservable().subscribe((data) => {
      // @ts-ignore
      this.payments = data;
    });
    this.dataService.ordersData$.asObservable().subscribe((data) => {
      // @ts-ignore
      this.orders = data;
    });
  }

  public getPaymentsSum() {
    let sum = 0;
    this.payments?.forEach((data) => {
      sum += data.sum;
    });
    return sum;
  }

  public getContributorsInWork() {
    let sum = 0;
    this.orders?.forEach((data) => {
      if (data.workStatus.statusName === 'В процесі') {
        sum++;
      }
    });
    return sum;
  }

}
