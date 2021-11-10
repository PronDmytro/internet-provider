import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Client} from '../../../core/models/client.interface';
import * as moment from 'moment';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ClientFormDialogComponent} from '../client-form-dialog/client-form-dialog.component';
import {ApiRequestsService} from '../../../core/services/api-requests.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';
import {DataService} from '../../../core/services/data.service';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss'],
})
export class ClientTableComponent implements OnInit, OnChanges {

  @Input() public data: Client[] | undefined;

  public displayedColumns: string[] = ['PIB', 'dateBirthday', 'telephone', 'email', 'address', 'deposit', 'btn'];
  // @ts-ignore
  public dataSource: MatTableDataSource<Client>;
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
      this.dataSource = new MatTableDataSource<Client>(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = (entity, searchString) => {
        const matchSearch = (content: any) => content && content.toString().toLowerCase().includes(searchString.toLowerCase());
        return [
          entity.PIB,
          entity.dateBirthday,
          entity.telephone,
          entity.email,
          entity.address,
          entity.email,
          entity.deposit,
        ].some(matchSearch);
      };
    }
  }

  public ngOnChanges() {
    this.initMatTable();
  }
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public normalizeData(data: string) {
    return moment(data).format('L').toString();
  }

  public createData(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {};

    const dialogRef = this.dialog.open(ClientFormDialogComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(
      (val) => this.dataService.loadCurrentDataFromServer(),
    );
  }

  public editData(data: Client) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = data;

    const dialogRef = this.dialog.open(ClientFormDialogComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(
      () => this.dataService.loadCurrentDataFromServer(),
    );
  }

  public deleteData(data: Client) {

    this.apiRequestsService.deleteClientData(data).subscribe({
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
