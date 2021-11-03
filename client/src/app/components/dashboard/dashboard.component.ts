import {Component, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

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

  // for table update form
  public isTableBeingUpdated: boolean = false;
  public isNewRowBeingAdded: boolean = false;
  public tableUpdateForm!: FormGroup;
  public existingRowValues!: any;

  // for table update API call
  private updateTableDataSub!: Subscription;

  public constructor() {
    this.tableUpdateForm = new FormGroup({
      a: new FormControl('', [Validators.required]),
      b: new FormControl('', []),
      c: new FormControl('', []),
    });
  }

  public ngOnInit(): void {
  }

  public addNewRow() {
    // enabling the primary key fields
    // this.global_utilities.toggleFormControls(this.tableUpdateForm, this.tableConfig.primary_key_set, true);
    // to reset the entire form
    this.tableUpdateForm.reset();
    this.isTableBeingUpdated = true;
    this.isNewRowBeingAdded = true;
  }

  public editRow(row: any) {
    this.existingRowValues = {...row};
    // to reset the entire form
    this.tableUpdateForm.reset();
    // patch existing values in the form
    this.tableUpdateForm.patchValue(row);
    // disabling the primary key fields
    // this.global_utilities.toggleFormControls(this.tableUpdateForm, this.tableConfig.primary_key_set, false);
    this.isTableBeingUpdated = true;
    this.isNewRowBeingAdded = false;
  }

  public updateTableData() {
    // let updated_row_data = (this.is_new_row_being_added) ? {...this.table_update_form.value} : {...this.existing_row_values, ...this.table_update_form.value};
    //
    // this.updateTableDataSub = this.feature_module_utilities.updateTableData(updated_row_data, this.is_new_row_being_added).subscribe(
    //   (table_data) => {
    //     //close the drawer and reset the update form
    //     this.is_table_being_updated = false;
    //     this.table_update_form.reset();
    //     //update the table with latest values
    //     this.table_config.table_data_changer.next({
    //       data: table_data,
    //       highlight: updated_row_data,
    //     });
    //   },
    //   (error) => {
    //     this.global_utilities.showSnackbar();
    //   },
    // );
  }

  public ngOnDestroy(): void {
    // this.global_utilities.unsubscribeAll([
    //   this.updateTableDataSub,
    // ]);
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
