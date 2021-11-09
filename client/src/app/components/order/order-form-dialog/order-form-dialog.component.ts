import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiRequestsService} from '../../../core/services/api-requests.service';
import {DataService} from '../../../core/services/data.service';
import * as moment from 'moment';
import {HttpErrorResponse} from '@angular/common/http';
import {Order} from '../../../core/models/order.interface';
import {Client} from '../../../core/models/client.interface';
import {Employee} from '../../../core/models/employee.interface';
import {Service} from '../../../core/models/service.interface';
import {WorkStatus} from '../../../core/models/work-status.interface';

@Component({
  selector: 'app-order-form-dialog',
  templateUrl: './order-form-dialog.component.html',
  styleUrls: ['./order-form-dialog.component.scss'],
})
export class OrderFormDialogComponent implements OnInit {

  public form: FormGroup;
  public editMode = false;
  public clients: Client[] | undefined;
  public contributors: Employee[] | undefined;
  public services: Service[] | undefined;
  public workStatus: WorkStatus[] | undefined;

  public constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OrderFormDialogComponent>,
    private _snackBar: MatSnackBar,
    private apiRequestsService: ApiRequestsService,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private dataService: DataService,
  ) {

    if (this.data.id) {
      this.editMode = true;
    }
    this.form = fb.group({
      client: new FormControl(this.editMode ? this.data.client.id : '', [Validators.required]),
      contributor: new FormControl(this.editMode ? this.data.contributor.id : '', [Validators.required]),
      service: new FormControl(this.editMode ? this.data.service.id : '', Validators.required),
      workStatus: new FormControl(this.editMode ? this.data.workStatus.id : '', Validators.required),
    });

    this.dataService.employeesData$.asObservable().subscribe((data) => {
      // @ts-ignore
      this.contributors = data;
    });
    this.dataService.clientsData$.asObservable().subscribe((data) => {
      // @ts-ignore
      this.clients = data;
    });
    this.dataService.servicesData$.asObservable().subscribe((data) => {
      // @ts-ignore
      this.services = data;
    });
    this.dataService.workStatusData$.asObservable().subscribe((data) => {
      // @ts-ignore
      this.workStatus = data;
    });
  }

  public ngOnInit() {
  }

  public hasError(field: string, error: string) {
    // @ts-ignore
    return this.form.get(field).hasError(error);
  }

  public create() {
    console.log(this.form.valid);
    console.log(this.form.value['workStatus']);

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('valid');
    const data = this.form.value;
    this.apiRequestsService.createOrder({
      client: data.client,
      contributor: data.contributor,
      orderDate: moment().toString(),
      service: data.service,
      workStatus: data.workStatus,
      paymentStatus: false,
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
    this.apiRequestsService.updateOrderData({
      id: this.data.id,
      client: data.client,
      contributor: data.contributor,
      orderDate: this.data.orderDate,
      service: data.service,
      workStatus: data.workStatus,
      paymentStatus: this.data.paymentStatus,
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
