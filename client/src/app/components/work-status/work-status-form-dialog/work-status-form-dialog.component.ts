import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiRequestsService} from '../../../core/services/api-requests.service';
import {Service} from '../../../core/models/service.interface';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-work-status-form-dialog',
  templateUrl: './work-status-form-dialog.component.html',
  styleUrls: ['./work-status-form-dialog.component.scss'],
})
export class WorkStatusFormDialogComponent implements OnInit {

  public form: FormGroup;
  public editMode = false;

  public constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<WorkStatusFormDialogComponent>,
    private _snackBar: MatSnackBar,
    private apiRequestsService: ApiRequestsService,
    @Inject(MAT_DIALOG_DATA) public data: Service,
  ) {

    if (this.data.id) {
      this.editMode = true;
    }
    this.form = fb.group({
      name: new FormControl(this.editMode ? this.data.name : '', [Validators.required]),
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
    this.apiRequestsService.createWorkStatus({
      statusName: data.name,
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
    this.apiRequestsService.updateWorkStatusData({
      id: this.data.id,
      statusName: data.name,
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
