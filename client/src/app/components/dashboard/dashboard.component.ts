import {Component, OnInit} from '@angular/core';
import {DataService} from '../../core/services/data.service';
import {Client} from '../../core/models/client.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public ClientsData: Client[] | undefined;

  public constructor(
    private dataService: DataService,
  ) {
  }

  public ngOnInit(): void {
    this.dataService.loadCurrentDataFromServer();
    this.dataService.clientsData$.asObservable().subscribe((data) => {
      this.ClientsData = data;
    });
  }

}
