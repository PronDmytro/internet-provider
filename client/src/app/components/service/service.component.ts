import {Component, OnInit} from '@angular/core';
import {DataService} from '../../core/services/data.service';
import {Service} from '../../core/models/service.interface';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {

  public ServicesData: Service[] | undefined;

  public constructor(
    private dataService: DataService,
  ) {
  }

  public ngOnInit() {
    this.dataService.servicesData$.asObservable().subscribe((data) => {
      this.ServicesData = data;
    });
  }

}
