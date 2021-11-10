import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiRequestsService} from '../../../core/services/api-requests.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Position} from '../../../core/models/position.interface';

@Component({
  selector: 'app-position-form-dialog',
  templateUrl: './position-form-dialog.component.html',
  styleUrls: ['./position-form-dialog.component.scss'],
})
export class PositionFormDialogComponent implements OnInit {

  public form: FormGroup;
  public editMode = false;

  public constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PositionFormDialogComponent>,
    private _snackBar: MatSnackBar,
    private apiRequestsService: ApiRequestsService,
    @Inject(MAT_DIALOG_DATA) public data: Position,
  ) {

    if (this.data.id) {
      this.editMode = true;
    }
    this.form = fb.group({
      name: new FormControl(this.editMode ? this.data.name : '', [Validators.required]),
      responsibilities: new FormControl(this.editMode ? this.data.responsibilities : '', [Validators.required]),
      salary: new FormControl(this.editMode ? this.data.salary : '', [Validators.required]),
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
    this.apiRequestsService.createPosition({
      name: data.name,
      responsibilities: data.responsibilities,
      salary: data.salary,
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
    this.apiRequestsService.updatePositionData({
      id: this.data.id,
      name: data.name,
      responsibilities: data.responsibilities,
      salary: data.salary,
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
