import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {Player} from '../../models/player';
import {flatMap, map, tap} from 'rxjs/operators';
import {FfxivHttpClientService} from '../ffxiv-http-client/ffxiv-http-client.service';
import {PaginationResult} from '../../models/pagination-result';
import {FreeCompany} from '../../models/free-company';
import {PlayerExtraInformation} from '../../models/player-extra-information';
import {CacheSubject} from '../cacheSubject';

@Injectable({
  providedIn: 'root'
})
export class FreeCompanyService {

  private url = 'freecompany';
  private membersUrl = 'data=FCM';
  private freeCompanies = new CacheSubject<FreeCompany, string>();
  private freeCompaniesByName = new CacheSubject<PaginationResult<FreeCompany>, string>();

  constructor(private ffxivHttpClient: FfxivHttpClientService) {
  }

  getFreeCompanyById(id: string): Observable<FreeCompany> {
    return this.freeCompanies.getObservable(id, () => this.requestFreeCompanyById(id));
  }

  searchFreeCompanyByName(name: string, page: number): Observable<PaginationResult<FreeCompany>> {
    return this.freeCompaniesByName.getObservable(`${name}/${page}`, () => this.requestFreeCompanyByName(name, page));
  }

  getCompanyMembers(id: string): Observable<Player[]> {
    return this.getFreeCompanyById(id).pipe(flatMap(fc => {
      if (fc.players$) {
        return fc.players$;
      }
      const players = this.requestCompanyMember(id);
      fc.players$ = players;
      return players;
    }));
  }

  private requestCompanyMember(id: string): Observable<Player[]> {
    console.log('requesting member');
    return this.ffxivHttpClient.get(`${this.url}/${id}?${this.membersUrl}`).pipe(map((response: any) => {
      return response.FreeCompanyMembers.map(member => Player.fromJson(member));
    }));
  }

  private requestFreeCompanyById(id: string): Observable<FreeCompany> {
    console.log('requesting');
    return this.ffxivHttpClient.get(`${this.url}/${id}`).pipe(map(response => {
      return FreeCompany.fromJson(response);
    }));
  }

  private requestFreeCompanyByName(name: string, page: number): Observable<PaginationResult<FreeCompany>> {
    return this.ffxivHttpClient.get(`${this.url}/search?name=${name}&page=${page}`).pipe(map(response => {
      const pagination = PaginationResult.fromJson<FreeCompany>(response, new FreeCompany());
      pagination.results.forEach(fc => this.freeCompanies.set(fc.id, fc));
      return pagination;
    }));
  }
}
