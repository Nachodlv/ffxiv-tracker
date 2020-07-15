import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, delay, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FfxivHttpClientService {

  baseUrl = 'https://xivapi.com/';

  constructor(private httpClient: HttpClient) {
  }

  get(url: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + url, {
      headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Content-type': 'application/json'}
    }).pipe(catchError(err => {
      if (err.status === 429) {
        return this.get(url).pipe(delay(1000));
      }
      of(undefined);
    }));
  }
}
