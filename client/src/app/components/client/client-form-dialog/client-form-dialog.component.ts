import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CustomValidators} from '../../../core/validators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiRequestsService} from '../../../core/services/api-requests.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Client} from '../../../core/models/client.interface';
import * as moment from 'moment';

export interface ClientForm {
  name: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: Date;
  address: string;
}

@Component({
  selector: 'app-client-form-dialog',
  templateUrl: './client-form-dialog.component.html',
  styleUrls: ['./client-form-dialog.component.scss'],
})
export class ClientFormDialogComponent implements OnInit {

  public form: FormGroup;
  public editMode = false;

  public constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClientFormDialogComponent>,
    private _snackBar: MatSnackBar,
    private apiRequestsService: ApiRequestsService,
    @Inject(MAT_DIALOG_DATA) public data: Client,
  ) {

    if (this.data.email) {
      this.editMode = true;
    }
    this.form = fb.group({
      name: new FormControl(this.editMode ? this.data.PIB : '', [Validators.required]),
      phoneNumber: new FormControl(this.editMode ? this.data.telephone : '', [Validators.required, CustomValidators.phone]),
      email: new FormControl(this.editMode ? this.data.email : '', [Validators.required, CustomValidators.email]),
      dateOfBirth: new FormControl(this.editMode ? this.data.dateBirthday : '', Validators.required),
      address: new FormControl(this.editMode ? this.data.address : '', Validators.required),
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
    const data: ClientForm = this.form.value;
    this.apiRequestsService.createClient({
      PIB: data.name,
      telephone: data.phoneNumber,
      email: data.email,
      dateBirthday: moment(data.dateOfBirth).format('L').toString(),
      address: data.address,
      deposit: 0,
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
    console.log(this.form.value);
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const data: ClientForm = this.form.value;
    this.apiRequestsService.updateClientData({
      id: this.data.id,
      PIB: data.name,
      telephone: data.phoneNumber,
      email: data.email,
      dateBirthday: moment(data.dateOfBirth).format('L').toString(),
      address: data.address,
      deposit: 0,
    }).subscribe({
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
