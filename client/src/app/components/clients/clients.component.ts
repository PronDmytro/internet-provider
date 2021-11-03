import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {

  public tableConfig = {
    columns: [
      {
        key: 'a',
        heading: 'Column A',
      },
      {
        key: 'b',
        heading: 'Column B',
      },
      {
        key: 'c',
        heading: 'Column C',
        numeric: true,
      },
    ],
    primary_key_set: ['a'],
    default_data: DUMMY_TABLE_DATA,
    table_data_changer: new Subject<any>(),
    ediTable: {
      add: true,
      edit: true,
    },
  };

  public constructor() {
  }

  public ngOnInit(): void {
  }

  public addNewRow() {
    // enabling the primary key fields
    // this.global_utilities.toggleFormControls(this.tableUpdateForm, this.tableConfig.primary_key_set, true);
    // to reset the entire form
    // this.tableUpdateForm.reset();
    // this.isTableBeingUpdated = true;
    // this.isNewRowBeingAdded = true;
  }
  public editRow(row: any) {
    // this.existingRowValues = {...row};
    // // to reset the entire form
    // this.tableUpdateForm.reset();
    // // patch existing values in the form
    // this.tableUpdateForm.patchValue(row);
    // // disabling the primary key fields
    // // this.global_utilities.toggleFormControls(this.tableUpdateForm, this.tableConfig.primary_key_set, false);
    // this.isTableBeingUpdated = true;
    // this.isNewRowBeingAdded = false;
  }

}
const DUMMY_TABLE_DATA: any[] = [
  {a: 'Dummy1', b: 'Data String 1', c: 21},
  {a: 'Dummy2', b: 'Data String 2', c: 22},
  {a: 'Dummy3', b: 'Data String 3', c: 23},
  {a: 'Dummy4', b: 'Data String 4', c: 24},
  {a: 'Dummy5', b: 'Data String 5', c: 25},
  {a: 'Dummy6', b: 'Data String 6', c: 26},
  {a: 'Dummy7', b: 'Data String 7', c: 27},
  {a: 'Dummy8', b: 'Data String 8', c: 28},
  {a: 'Dummy9', b: 'Data String 9', c: 29},
  {a: 'Dummy10', b: 'Data String 10', c: 30},
  {a: 'Dummy11', b: 'Data String 11', c: 31},
  {a: 'Dummy12', b: 'Data String 12', c: 32},
  {a: 'Dummy13', b: 'Data String 13', c: 33},
  {a: 'Dummy14', b: 'Data String 14', c: 34},
  {a: 'Dummy15', b: 'Data String 15', c: 35},
  {a: 'Dummy16', b: 'Data String 16', c: 36},
  {a: 'Dummy17', b: 'Data String 17', c: 37},
  {a: 'Dummy18', b: 'Data String 18', c: 38},
  {a: 'Dummy19', b: 'Data String 19', c: 39},
  {a: 'Dummy20', b: 'Data String 20', c: 40},
];
