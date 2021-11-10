import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiRequestsService} from '../../../core/services/api-requests.service';
import {HttpErrorResponse} from '@angular/common/http';
import {DataService} from '../../../core/services/data.service';
import {Payment} from '../../../core/models/payment.interface';

@Component({
  selector: 'app-payment-form-dialog',
  templateUrl: './payment-form-dialog.component.html',
  styleUrls: ['./payment-form-dialog.component.scss'],
})
export class PaymentFormDialogComponent implements OnInit {

  public form: FormGroup;
  public orders: Payment[] | undefined;

  public constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PaymentFormDialogComponent>,
    private _snackBar: MatSnackBar,
    private apiRequestsService: ApiRequestsService,
    @Inject(MAT_DIALOG_DATA) public data: Payment,
    private dataService: DataService,
  ) {
    this.form = fb.group({
      sum: new FormControl( '', [Validators.required]),
      order: new FormControl('', [Validators.required]),
    });

    this.dataService.ordersData$.asObservable().subscribe((data) => {
      // @ts-ignore
      this.orders = data;
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
    this.apiRequestsService.createPayment({
      sum: data.sum,
      order: data.order,
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

  public close() {
    this.dialogRef.close();
  }

}
