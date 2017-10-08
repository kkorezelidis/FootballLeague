import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppSettings } from '../appSettings';
import { League, Ranking } from './types/league.dt';
import { LoaderService } from '../common/loader/loader.service';
import { DialogService } from '../common/dialog/dialog.service';
import { environment } from '../../environments/environment';



@Injectable()
export class LeaguedService {
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http, private loaderService: LoaderService, private dialogService: DialogService) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json;charset=UTF-8'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getLeagues(): Observable<League[]> {
    this.showLoader();

    return this.http
      .get(environment.baseUrl + AppSettings.API_ENDPOINTS.leagues, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => {
        // this.dialogService.openDialog('Title', 'message', 'button1', 'button2', () => {
        //   console.log('test');
        // });
        return Observable.throw(error.json().error || 'Server error');
      })
      .finally(() => {
        this.hideLoader();
      });
  }

  getRankings(leagueId): Observable<Ranking[]> {
    this.showLoader();

    return this.http
      .get(environment.baseUrl + AppSettings.API_ENDPOINTS.rankings + leagueId, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => {
        // this.dialogService.openDialog('Title', 'message', 'button1', 'button2', () => {
        //   console.log('test');
        // });
        return Observable.throw(error.json().error || 'Server error');
      })
      .finally(() => {
        this.hideLoader();
      });
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }
}
