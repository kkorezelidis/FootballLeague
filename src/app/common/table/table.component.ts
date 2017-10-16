import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import {MatSort, SortDirection} from '@angular/material';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() displayedColumns: Array<string>;
  @Input() columnNames: Array<string>;
  @Input() data: Array<object>;
  @Input() sortColumn: string;
  @Input() sortDirection?: SortDirection;
  dataSource: ExampleDataSource | null;

  constructor() {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges(changes: any): void {
    if (changes.data.currentValue) {
      console.log('changes.data.currentValue', changes.data.currentValue);
      this.dataSource = new ExampleDataSource(changes.data.currentValue, this.sort);
    }
  }

  ngOnInit() {
    this.dataSource = null;
    this.sort.active = this.sortColumn;
    this.sort.direction = this.sortDirection;
  }
}

export class ExampleDataSource extends DataSource<any> {
  constructor(private _data: Array<any>, private _sort: MatSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Array<any>> {
    const displayDataChanges = [this._data, this._sort.sortChange];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  getSortedData(): Array<any> {
    if (!this._sort.active || !this._sort.direction) {
      return this._data;
    }

    return this._data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'teamName':
          [propertyA, propertyB] = [a.teamName, b.teamName];
          break;
        case 'points':
          [propertyA, propertyB] = [a.points, b.points];
          break;
        case 'homeTeam':
          [propertyA, propertyB] = [a.homeTeam, b.homeTeam];
          break;
        case 'awayTeam':
          [propertyA, propertyB] = [a.awayTeam, b.awayTeam];
          break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1)
      );
    });
  }
}
