import {Component, OnInit} from '@angular/core';
import {DataService} from '../../core/services/data.service';
import {Order} from '../../core/models/order.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  public OrdersData: Order[] | undefined;

  public constructor(
    private dataService: DataService,
  ) {
  }

  public ngOnInit() {
    this.dataService.ordersData$.asObservable().subscribe((data) => {
      this.OrdersData = data;
      console.log(data);
    });
  }

}
