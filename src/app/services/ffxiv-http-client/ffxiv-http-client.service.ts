import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Observer, of, Subject} from 'rxjs';
import {catchError, delay, map, retry, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FfxivHttpClientService {

  baseUrl = 'https://xivapi.com/';
  timeBetweenRequests = 75;
  currentRequests = -1;
  lastRequest = 0;

  constructor(private httpClient: HttpClient) {
  }

  get(url: string): Observable<any> {
    return this.executeFunctionWithDelay(() => this.makeGetRequest(url));
  }

  private makeGetRequest(url: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + url, {
      headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Content-type': 'application/json'}
    }).pipe(
      catchError(err => {
        if (err.status === 429) {
          return this.get(url);
        }
        return of(undefined);
      }));
  }

  private executeFunctionWithDelay(callback: () => Observable<any>): Observable<any> {
    this.currentRequests++;
    const now = new Date().getTime();
    const timeout = this.currentRequests <= 0 ? 0 : now - this.lastRequest + this.currentRequests * this.timeBetweenRequests;
    this.lastRequest = now;
    return of(undefined).pipe(delay(timeout), switchMap(value => {
        this.currentRequests--;
        return callback();
      }
    ));
  }
}
