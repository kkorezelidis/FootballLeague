import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MdSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { LeaguedService } from './league.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-league',
  templateUrl: './league.html',
  styleUrls: ['./league.scss'],
  providers: [LeaguedService]
})
export class LeagueComponent implements OnInit {
  constructor(private leagueService: LeaguedService) {}


  displayedColumns = ['name', 'points'];
  dataSource: ExampleDataSource | null;
  leagues: Array<any>;
  selectedLeague: number;

  data = [
    { name: 'ΟΛΥΜΠΙΑΚΟΣ', points: 1 },
    { name: 'ΠΑΝΑΘΗΝΑΙΚΟΣ', points: 2 },
    { name: 'ΑΕΚ', points: 3 },
    { name: 'ΠΑΟΚ', points: 5 },
    { name: 'ΗΡΑΚΛΗΣ', points: 10 },
    { name: 'ΠΑΝΙΩΝΙΟΣ', points: 15 },
    { name: 'ΑΡΗΣ', points: 20 },
    { name: 'ΛΑΡΙΣΣΑ', points: 22 },
    { name: 'ΠΛΑΤΑΝΙΑΣ', points: 21 },
    { name: 'ΛΑΜΙΑ', points: 43 },
    { name: 'ΞΑΝΘΗ', points: 55 },
    { name: 'ΑΤΡΟΜΗΤΟΣ', points: 54 }
  ]

  @ViewChild(MdSort) sort: MdSort;

  ngOnInit() {
    this.leagueService.getLeagues().then((leagues) => {
      this.leagues = leagues;
      this.selectedLeague = leagues[0].id;
    });
    this.sort.active = 'points';
    this.sort.direction = 'desc';
    this.dataSource = new ExampleDataSource(this.data, this.sort);
  }

  onChange(value) {
    this.dataSource = new ExampleDataSource(this.data, this.sort);
  }
}

export class ExampleDataSource extends DataSource<any> {
  constructor(private _data: Array<any>, private _sort: MdSort) {
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
