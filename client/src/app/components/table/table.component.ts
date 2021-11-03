import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  @Input() public tableConfig: any;

  @Output() public onRowAdd = new EventEmitter<any>();
  @Output() public onRowEdit = new EventEmitter<any>();

  public displayedColumns!: string[];
  public tableDataSource: any;
  public updatedRowIndex = -1;

  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  // Subscriptions
  private dataChangeSub!: Subscription;

  public constructor() {
  }

  public ngOnInit(): void {
    this.setDisplayedColumns(this.tableConfig.columns);

    // if there is any default/static data
    this.tableDataSource = new MatTableDataSource<any>(this.tableConfig.default_data);

    if (!!this.tableConfig.table_data_changer) {
      // if there is a scope to update data
      this.trackDataChange();
    }
  }

  public setDisplayedColumns(columnConfig: any[]) {
    const colCount = columnConfig.length;
    const columnsToDisplay = [];
    for (let i = 0; i < colCount; i++) {
      const colConfig = columnConfig[i];
      columnsToDisplay.push(colConfig.key);
    }
    if (!!this.tableConfig?.ediTable?.edit) {
      columnsToDisplay.push('edit');
    }
    this.displayedColumns = columnsToDisplay;
  }

  public trackDataChange() {
    this.dataChangeSub = this.tableConfig.table_data_changer.subscribe(
      (newData: any) => {
        this.tableDataSource = new MatTableDataSource<any>(newData.data);
        this.tableDataSource.paginator = this.paginator;
        if (!!newData.highlight) {
          // if it is needed to highlight the updated/new row
          this.goToUpdatedPage(newData.highlight, newData.data);
        }
      },
    );
  }

  public goToUpdatedPage(updatedRow: any, data: any[]) {
    // get the index of the updated row
    const updatedIndex = data.findIndex(
      (row) => {
        let isMatching = true;
        const primaryKeyCount = this.tableConfig.primary_key_set.length;
        for (let i = 0; i < primaryKeyCount; i++) {
          const column = this.tableConfig.primary_key_set[i];
          if (row[column] != updatedRow[column]) {
            isMatching = false;
            break;
          }
        }
        return isMatching;
      },
    );
    // get the page the updated row is and navigate to it after 1sec
    setTimeout(() => {
      if (updatedIndex >= 0) {
        const pageSize = this.paginator.pageSize;
        const currentPageIndex = this.paginator.pageIndex;
        const calculatedPageIndex = Math.ceil((updatedIndex + 1) / pageSize) - 1;
        if (calculatedPageIndex != currentPageIndex) {
          if (calculatedPageIndex == 0) {
            // if the first page is to be navigated to
            this.paginator.pageIndex = 1;
            this.paginator.previousPage();
          } else {
            this.paginator.pageIndex = calculatedPageIndex - 1;
            this.paginator.nextPage();
          }
        }
        this.updatedRowIndex = updatedIndex - (pageSize * calculatedPageIndex);
        setTimeout(() => {
          this.updatedRowIndex = -1;
        }, 4000);
      }
    }, 100);
  }

  public editRow(row: any) {
    this.onRowEdit.emit(row);
  }

  public addRow() {
    this.onRowAdd.emit();
  }

  public ngAfterViewInit(): void {
    if (!!this.tableDataSource) {
      this.tableDataSource.paginator = this.paginator;
    }
  }

  public ngOnDestroy(): void {
  }

}
