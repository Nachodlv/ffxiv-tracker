import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Player} from '../../models/player';
import {map} from 'rxjs/operators';
import {FfxivHttpClientService} from '../ffxiv-http-client/ffxiv-http-client.service';
import {PaginationResult} from '../../models/pagination-result';
import {FreeCompany} from '../../models/free-company';
import {LocalStorageSubject} from '../storage/local-storage';
import {FreeCompanyPaginatorStorage} from '../storage/free-company-paginator-storage';

@Injectable({
  providedIn: 'root'
})
export class FreeCompanyService {

  private url = 'freecompany';
  private membersUrl = 'data=FCM';
  private freeCompanies = new LocalStorageSubject<FreeCompany>('free-companies');
  private freeCompaniesByName = new FreeCompanyPaginatorStorage('free-companies-by-name', this.freeCompanies);
  private freeCompanyPlayers = new LocalStorageSubject<Players>('free-company-players');

  constructor(private ffxivHttpClient: FfxivHttpClientService) {
  }

  getFreeCompanyById(id: string): Observable<FreeCompany> {
    return this.freeCompanies.get(id, () => this.requestFreeCompanyById(id));
  }

  searchFreeCompanyByName(name: string, page: number, server?: string): Observable<PaginationResult<FreeCompany>> {
    return this.freeCompaniesByName.get(
      `${name}/${page}${server ? `/${server}` : ''}`,
      () => this.requestFreeCompanyByName(name, page, server));
  }

  getCompanyMembers(id: string): Observable<Player[]> {
    return this.freeCompanyPlayers.get(id, () => this.requestCompanyMember(id)).pipe(map(players => players?.players));
  }

  private requestCompanyMember(id: string): Observable<Players> {
    return this.ffxivHttpClient.get(`${this.url}/${id}?${this.membersUrl}`).pipe(map((response: any) => {
      return new Players(response.FreeCompanyMembers.map((member, index) => Player.fromJson(member, index)));
    }));
  }

  private requestFreeCompanyById(id: string): Observable<FreeCompany> {
    return this.ffxivHttpClient.get(`${this.url}/${id}`).pipe(map(response => {
      return FreeCompany.fromJson(response.FreeCompany);
    }));
  }

  private requestFreeCompanyByName(name: string, page: number, server?: string): Observable<PaginationResult<FreeCompany>> {
    return this.ffxivHttpClient.get(`${this.url}/search?name=${name}&page=${page}${server ? `&server=${server}` : ''}`).pipe(
      map(response => {
        const pagination = PaginationResult.fromJson<FreeCompany>(response, new FreeCompany());
        pagination.results.forEach(fc => this.freeCompanies.set(fc.id, fc));
        return pagination;
      }));
  }
}

class Players {
  constructor(public players: Player[]) {
  }
}
