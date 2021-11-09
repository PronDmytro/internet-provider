import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiRequestsService} from '../../../core/services/api-requests.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Service} from '../../../core/models/service.interface';

@Component({
  selector: 'app-service-form-dialog',
  templateUrl: './service-form-dialog.component.html',
  styleUrls: ['./service-form-dialog.component.scss'],
})
export class ServiceFormDialogComponent implements OnInit {

  public form: FormGroup;
  public editMode = false;

  public constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ServiceFormDialogComponent>,
    private _snackBar: MatSnackBar,
    private apiRequestsService: ApiRequestsService,
    @Inject(MAT_DIALOG_DATA) public data: Service,
  ) {

    if (this.data.id) {
      this.editMode = true;
    }
    this.form = fb.group({
      name: new FormControl(this.editMode ? this.data.name : '', [Validators.required]),
      serviceCost: new FormControl(this.editMode ? this.data.serviceCost : '', [Validators.required]),
      connectionCost: new FormControl(this.editMode ? this.data.connectionCost : '', [Validators.required]),
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
    this.apiRequestsService.createService({
      name: data.name,
      serviceCost: data.serviceCost,
      connectionCost: data.connectionCost,
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
    const data = this.form.value;
    this.apiRequestsService.updateServiceData({
      id: this.data.id,
      name: data.name,
      serviceCost: data.serviceCost,
      connectionCost: data.connectionCost,
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
