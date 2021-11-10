import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ApiRequestsService} from '../../../core/services/api-requests.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DataService} from '../../../core/services/data.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Position} from '../../../core/models/position.interface';
import {PositionFormDialogComponent} from '../position-form-dialog/position-form-dialog.component';

@Component({
  selector: 'app-position-table',
  templateUrl: './position-table.component.html',
  styleUrls: ['./position-table.component.scss'],
})
export class PositionTableComponent implements OnInit {

  @Input() public data: Position[] | undefined;

  public displayedColumns: string[] = ['name', 'responsibilities', 'salary', 'btn'];
  // @ts-ignore
  public dataSource: MatTableDataSource<Position>;
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
      this.dataSource = new MatTableDataSource<Position>(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = (entity, searchString) => {
        const matchSearch = (content: any) => content && content.toString().toLowerCase().includes(searchString.toLowerCase());
        return [
          entity.name,
          entity.responsibilities,
          entity.salary,
        ].some(matchSearch);
      };
    }
  }

  public ngOnChanges() {
    this.initMatTable();
  }

  public createData(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {};

    const dialogRef = this.dialog.open(PositionFormDialogComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(
      () => this.dataService.loadCurrentDataFromServer(),
    );
  }

  public editData(data: Position) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = data;

    const dialogRef = this.dialog.open(PositionFormDialogComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(
      () => this.dataService.loadCurrentDataFromServer(),
    );
  }

  public deleteData(data: Position) {

    this.apiRequestsService.deletePositionData(data).subscribe({
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

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
