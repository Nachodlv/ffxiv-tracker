import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {Player} from '../../models/player';
import {map, tap} from 'rxjs/operators';
import {FfxivHttpClientService} from '../ffxiv-http-client/ffxiv-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FreeCompanyService {

  private url = 'freecompany';
  private companyId = '9228157111458935985';
  private membersUrl = 'data=FCM';
  private members: Player[] = [];
  private membersSubject = new ReplaySubject<Player[]>();

  members$: Observable<Player[]> = this.membersSubject.asObservable();

  constructor(private ffxivHttpClient: FfxivHttpClientService) {
  }

  getCompanyMembers(): void {
    if (this.members.length === 0) {
      this.requestCompanyMember().subscribe(value => this.membersSubject.next(value));
    } else {
      this.membersSubject.next(this.members);
    }
  }

  requestCompanyMember(): Observable<Player[]> {
    return this.ffxivHttpClient.get(`${this.url}/${this.companyId}?${this.membersUrl}`).pipe(map((response: any) => {
      this.members = response.FreeCompanyMembers.map(member => Player.fromJson(member));
      return this.members;
    }));
  }

}
