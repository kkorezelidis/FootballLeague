import { Injectable } from '@angular/core';
import { AppSettings } from '../appSettings';
import { League } from './types/league.dt';
import {
  Http,
  Headers,
  RequestOptions,
} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LeaguedService {
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getLeagues(): Promise<Array<League>> {
    return this.http
      .get(AppSettings.API_ENDPOINTS.baseUrl + AppSettings.API_ENDPOINTS.leagues, this.options)
      .toPromise()
      .then(response => response.json().data)
      .catch(() => {
        return false;
        // TODO popup on error case
      });
  }
}
