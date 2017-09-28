import { Component, OnInit, ViewChild } from '@angular/core';
import { RowData } from './types/leaderboard.dt';
import { data } from './mocks/leaderboard.mock';
import { DataSource } from '@angular/cdk/collections';
import { MdSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.html',
  styleUrls: ['./leaderboard.scss']
})
export class LeaderBoardComponent implements OnInit {
  displayedColumns = ['name', 'points'];
  data: Array<RowData> = data;
  dataSource: ExampleDataSource | null;

  @ViewChild(MdSort) sort: MdSort;

  ngOnInit() {
    this.sort.active = 'points';
    this.sort.direction = 'desc';
    this.dataSource = new ExampleDataSource(this.data, this.sort);
  }
}

export class ExampleDataSource extends DataSource<any> {
  constructor(private _data: Array<RowData>, private _sort: MdSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<RowData[]> {
    const displayDataChanges = [this._data, this._sort.sortChange];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  getSortedData(): RowData[] {
    if (!this._sort.active || !this._sort.direction) {
      return this._data;
    }

    return this._data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'points':
          [propertyA, propertyB] = [a.points, b.points];
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
