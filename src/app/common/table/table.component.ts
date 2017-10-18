import {Component, Input, OnChanges, OnInit, ViewChild, ElementRef} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import {MatSort, SortDirection} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
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
  @Input() hasFiltering: string;
  dataSource: ExampleDataSource | null;

  constructor() {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;


  ngOnChanges(changes: any): void {
    if (changes.data.currentValue) {
      this.dataSource = new ExampleDataSource(changes.data.currentValue, this.sort, this.hasFiltering !== 'false');
    }
  }

  ngOnInit() {
    this.dataSource = null;
    this.sort.active = this.sortColumn;
    this.sort.direction = this.sortDirection;

    if (this.hasFiltering !== 'false') {
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
    }
  }
}

export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _data: Array<any>, private _sort: MatSort, private _hasFiltering: boolean) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Array<any>> {
    const displayDataChanges = [this._data, this._sort.sortChange, this._filterChange];

    return Observable.merge(...displayDataChanges).map(() => {
      if (this._hasFiltering) {
        return this.getFilteredData(this.getSortedData());
      }else {
        return this.getSortedData();
      }
    });
  }

  disconnect() {}

  getFilteredData(data): Array<any> {
    this._data = data;
    return this._data.slice().filter((item) => {
      let searchHomeTeam = item.homeTeam.toLowerCase();
      let searchAwayTeam = item.awayTeam.toLowerCase();
      return searchHomeTeam.indexOf(this.filter.toLowerCase()) != -1 || searchAwayTeam.indexOf(this.filter.toLowerCase()) != -1;
    });
  }

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
