import {Component, OnInit} from '@angular/core';
import {DataService} from '../../core/services/data.service';
import {WorkStatus} from '../../core/models/work-status.interface';

@Component({
  selector: 'app-work-status',
  templateUrl: './work-status.component.html',
  styleUrls: ['./work-status.component.scss'],
})
export class WorkStatusComponent implements OnInit {

  public WorkStatusData: WorkStatus[] | undefined;

  public constructor(
    private dataService: DataService,
  ) {
  }

  public ngOnInit() {
    this.dataService.workStatusData$.asObservable().subscribe((data) => {
      this.WorkStatusData = data;
    });
  }

}
