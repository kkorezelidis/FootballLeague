import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MdSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { LeaguedService } from './league.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.html',
  styleUrls: ['./league.scss'],
  providers: [LeaguedService]
})
export class LeagueComponent implements OnInit {
  constructor(private leagueService: LeaguedService) {}

  displayedColumns = ['teamName', 'points'];
  dataSource: ExampleDataSource | null;
  leagues: Array<any>;
  selectedLeague: number;

  @ViewChild(MdSort) sort: MdSort;

  ngOnInit() {
    this.leagueService.getLeagues().subscribe(leagues => {
      this.leagues = leagues;
      this.selectedLeague = leagues[0].id;
      this.getRanking();
    }, (error) => {
      console.log('er', error);
    });
    this.sort.active = 'points';
    this.sort.direction = 'desc';
  }

  onChange() {
    this.getRanking();
  }

  private getRanking() {
    this.leagueService.getRankings(this.selectedLeague).subscribe(ranking => {
      this.dataSource = new ExampleDataSource(ranking, this.sort);
    });
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
        case 'teamName':
          [propertyA, propertyB] = [a.teamName, b.teamName];
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
