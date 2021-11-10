import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiRequestsService} from '../../../core/services/api-requests.service';
import {CustomValidators} from '../../../core/validators';
import * as moment from 'moment';
import {HttpErrorResponse} from '@angular/common/http';
import {Employee} from '../../../core/models/employee.interface';
import {DataService} from '../../../core/services/data.service';
import {Position} from '../../../core/models/position.interface';

@Component({
  selector: 'app-employee-form-dialog',
  templateUrl: './employee-form-dialog.component.html',
  styleUrls: ['./employee-form-dialog.component.scss'],
})
export class EmployeeFormDialogComponent implements OnInit {

  public form: FormGroup;
  public editMode = false;
  public positions: Position[] | undefined;

  public constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeFormDialogComponent>,
    private _snackBar: MatSnackBar,
    private apiRequestsService: ApiRequestsService,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private dataService: DataService,
  ) {

    if (this.data.id) {
      this.editMode = true;
    }
    this.form = fb.group({
      PIB: new FormControl(this.editMode ? this.data.PIB : '', [Validators.required]),
      passportId: new FormControl(this.editMode ? this.data.passportId : '', [Validators.required]),
      phoneNumber: new FormControl(this.editMode ? this.data.telephone : '', [Validators.required, CustomValidators.phone]),
      email: new FormControl(this.editMode ? this.data.email : '', [Validators.required, CustomValidators.email]),
      dateOfBirth: new FormControl(this.editMode ? this.data.dateBirthday : '', Validators.required),
      address: new FormControl(this.editMode ? this.data.address : '', Validators.required),
      position: new FormControl(this.editMode ? this.data.position.id : ''),
    });

    this.dataService.positionsData$.asObservable().subscribe((data) => {
      // @ts-ignore
      this.positions = data;
      console.log(data);
    });
  }

  public ngOnInit() {
  }

  public hasError(field: string, error: string) {
    // @ts-ignore
    return this.form.get(field).hasError(error);
  }

  public create() {
    console.log(this.form.value);
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const data = this.form.value;
    this.apiRequestsService.createEmployee({
      PIB: data.PIB,
      passportId: data.passportId,
      telephone: data.phoneNumber,
      email: data.email,
      dateBirthday: moment(data.dateOfBirth).format('L').toString(),
      address: data.address,
      position: data.position,
    }).subscribe({
      next: (response) => {
        // @ts-ignore
        if (response.id) {
          this._snackBar.open('created', 'ok', {duration: 2 * 1000});
          this.dialogRef.close(this.form.value);
        }
      },
      error: (e: HttpErrorResponse) => {
        this._snackBar.open('not created', 'ok', {duration: 2 * 1000});
      },
    });
  }

  public save() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const data = this.form.value;
    const dataToSend = {
      id: this.data.id,
      PIB: data.PIB,
      passportId: data.passportId,
      telephone: data.phoneNumber,
      email: data.email,
      dateBirthday: moment(data.dateOfBirth).format('L').toString(),
      address: data.address,
      position: data.position,
    };
    console.log(dataToSend);
    this.apiRequestsService.updateEmployeeData(dataToSend).subscribe({
      next: (response) => {
        console.log(response);
        // @ts-ignore
        if (response.affected != 0) {
          this._snackBar.open('saved', 'ok', {duration: 2 * 1000});
          this.dialogRef.close(this.form.value);
        } else {
          this._snackBar.open('not saved', 'ok', {duration: 2 * 1000});
        }
      },
      error: (e: HttpErrorResponse) => {
        this._snackBar.open('not saved', 'ok', {duration: 2 * 1000});
      },
    });
  }

  public close() {
    this.dialogRef.close();
  }

}
