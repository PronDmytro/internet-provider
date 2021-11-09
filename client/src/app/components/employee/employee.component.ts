import {Component, OnInit} from '@angular/core';
import {DataService} from '../../core/services/data.service';
import {Employee} from '../../core/models/employee.interface';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {

  public EmployeesData: Employee[] | undefined;

  public constructor(
    private dataService: DataService,
  ) {
  }

  public ngOnInit() {
    this.dataService.employeesData$.asObservable().subscribe((data) => {
      this.EmployeesData = data;
      console.log(data);
    });
  }

}
