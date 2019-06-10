import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

export interface IColumn {
  name: string;
  label: string;
  checkbox?: boolean;
  sorted?: boolean;
}

export class TableComponent implements AfterViewInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() columns: IColumn[];
  @Input() displayedColumns = [];
  @Input() dataChangeObservable: Observable<object[]>;

  dataSource = new MatTableDataSource<object>([]);
  selection: SelectionModel<any> = new SelectionModel<any>(true, []);
  private subscription: Subscription;

  constructor() {}

  protected rowClick(item) {}

  search(word: string) {
    this.dataSource.filter = word ;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngAfterViewInit() {
    if (this.dataChangeObservable) {
      this.subscription = this.dataChangeObservable.subscribe(data => this.dataSource.data = data);
    }
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
