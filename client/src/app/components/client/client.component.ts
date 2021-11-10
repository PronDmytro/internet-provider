import {Component, OnInit} from '@angular/core';
import {DataService} from '../../core/services/data.service';
import {Client} from '../../core/models/client.interface';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {

  public ClientsData: Client[] | undefined;

  public constructor(
    private dataService: DataService,
  ) {
  }

  public ngOnInit() {
    this.dataService.clientsData$.asObservable().subscribe((data) => {
      this.ClientsData = data;
    });
  }

}
