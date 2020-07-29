import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {Player} from '../../models/player';
import {flatMap, map, tap} from 'rxjs/operators';
import {FfxivHttpClientService} from '../ffxiv-http-client/ffxiv-http-client.service';
import {PaginationResult} from '../../models/pagination-result';
import {FreeCompany} from '../../models/free-company';
import {PlayerExtraInformation} from '../../models/player-extra-information';

@Injectable({
  providedIn: 'root'
})
export class FreeCompanyService {

  private url = 'freecompany';
  private companyId = '9228157111458935985';
  private membersUrl = 'data=FCM';
  private freeCompanies = new Map<string, FreeCompany>();
  private freeCompaniesSubject = new Map<string, ReplaySubject<FreeCompany>>();

  constructor(private ffxivHttpClient: FfxivHttpClientService) {
  }

  getFreeCompanyById(id: string): Observable<FreeCompany> {
    if (!this.freeCompaniesSubject.has(id)) {
      this.fetchFreeCompanyById(id);
    }
    return this.freeCompaniesSubject.get(id).asObservable();
  }

  searchFreeCompanyByName(name: string, page: number): Observable<PaginationResult<FreeCompany>> {
    return this.ffxivHttpClient.get(`${this.url}/search?name=${name}&page=${page}`).pipe(map(response => {
      const pagination = PaginationResult.fromJson<FreeCompany>(response, new FreeCompany());
      pagination.results.forEach(fc => this.freeCompanies.set(fc.id, fc));
      return pagination;
    }));
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

  requestCompanyMember(id: string): Observable<Player[]> {
    return this.ffxivHttpClient.get(`${this.url}/${id}?${this.membersUrl}`).pipe(map((response: any) => {
      return response.FreeCompanyMembers.map(member => Player.fromJson(member));
    }));
  }

  private fetchFreeCompanyById(id: string): void {
    if (!this.freeCompaniesSubject.has(id)) {
      this.freeCompaniesSubject.set(id, new ReplaySubject<FreeCompany>());
    }
    if (this.freeCompanies.has(id)) {
      this.freeCompaniesSubject.get(id).next(this.freeCompanies.get(id));
    } else {
      this.requestFreeCompanyById(id).subscribe(fc => this.freeCompaniesSubject.get(id).next(fc));
    }
  }

  private requestFreeCompanyById(id: string): Observable<FreeCompany> {
    return this.ffxivHttpClient.get(`${this.url}/${id}`).pipe(map(response => {
      return FreeCompany.fromJson(response);
    }));
  }

}
