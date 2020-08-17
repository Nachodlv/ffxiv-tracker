import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Observer, of, Subject} from 'rxjs';
import {catchError, concatMap, delay, map, retry, retryWhen, switchMap, tap} from 'rxjs/operators';

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

  get(url: string, cache: boolean = true): Observable<any> {
    return this.executeFunctionWithDelay(() => this.makeGetRequest(url, cache));
  }

  private makeGetRequest(url: string, cache: boolean): Observable<any> {
    let header = new HttpHeaders()
      .append('Access-Control-Allow-Origin', '*')
      .append('Access-Control-Allow-Headers', '*')
      .append('Content-type', 'application/json');
    if (!cache) {
      header = header
        .append('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0')
        .append('Pragma', 'no-cache')
        .append('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
    }

    return this.httpClient.get(this.baseUrl + url, {
      headers: header
    }).pipe(
      retryWhen(errors => errors.pipe(concatMap((error) => {
        if (error.status === 429) {
          this.currentRequests++;
          return this.get(url).pipe(tap(() => this.currentRequests--));
        }
      }), delay(1000)))
    );
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
