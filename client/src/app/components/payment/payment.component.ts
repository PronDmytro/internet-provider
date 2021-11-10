import {Component, OnInit} from '@angular/core';
import {Payment} from '../../core/models/payment.interface';
import {DataService} from '../../core/services/data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  public PaymentsData: Payment[] | undefined;

  public constructor(
    private dataService: DataService,
  ) {
  }

  public ngOnInit() {
    this.dataService.paymentsData$.asObservable().subscribe((data) => {
      this.PaymentsData = data;
      console.log(data);
    });
  }

}
