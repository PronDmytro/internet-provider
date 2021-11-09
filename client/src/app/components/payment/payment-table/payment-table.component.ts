import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ApiRequestsService} from '../../../core/services/api-requests.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DataService} from '../../../core/services/data.service';
import * as moment from 'moment';
import {HttpErrorResponse} from '@angular/common/http';
import {PaymentFormDialogComponent} from '../payment-form-dialog/payment-form-dialog.component';
import {Payment} from '../../../core/models/payment.interface';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss'],
})
export class PaymentTableComponent implements OnInit {

  @Input() public data: Payment[] | undefined;

  public displayedColumns: string[] = ['id', 'sum', 'date', 'order', 'btn'];
  // @ts-ignore
  public dataSource: MatTableDataSource<Payment>;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) public sort: MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;

  public constructor(
    private apiRequestsService: ApiRequestsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private dataService: DataService,
  ) {
  }

  public ngOnInit(): void {
    this.initMatTable();
  }

  private initMatTable() {
    if (this.data) {
      this.dataSource = new MatTableDataSource<Payment>(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = (entity, searchString) => {
        const matchSearch = (content: any) => content && content.toString().toLowerCase().includes(searchString.toLowerCase());
        return [
          entity.id,
          entity.sum,
          entity.date,
          entity.order,
        ].some(matchSearch);
      };
    }
    console.log(this.data);
  }

  public ngOnChanges() {
    this.initMatTable();
  }

  public normalizeData(data: string) {
    return moment(data).format('L').toString();
  }

  public createData(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {};

    const dialogRef = this.dialog.open(PaymentFormDialogComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(
      (val) => this.dataService.loadCurrentDataFromServer(),
    );
  }

  public editData(data: Payment) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = data;

    const dialogRef = this.dialog.open(PaymentFormDialogComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(
      () => this.dataService.loadCurrentDataFromServer(),
    );
  }

  public deleteData(data: Payment) {

    this.apiRequestsService.deletePaymentData(data).subscribe({
      next: (response) => {

        console.log(response);
        // @ts-ignore
        if (response.affected !== 0) {
          this.dataService.loadCurrentDataFromServer();
          this._snackBar.open('successfully deleted', 'ok', {duration: 2 * 1000});
        } else {
          this._snackBar.open('not deleted', 'ok', {duration: 2 * 1000});
        }
      },
      error: (e: HttpErrorResponse) => {
        this._snackBar.open('not deleted', 'ok', {duration: 2 * 1000});
      },
    });
  }

}
