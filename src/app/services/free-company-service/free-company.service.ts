import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Player} from '../../models/player';
import {map, tap} from 'rxjs/operators';
import {FfxivHttpClientService} from '../ffxiv-http-client/ffxiv-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FreeCompanyService {

  url = 'freecompany';
  companyId = '9228157111458935985';
  membersUrl = 'data=FCM';

  members: Player[] = [];

  constructor(private ffxivHttpClient: FfxivHttpClientService) {
  }

  getCompanyMembers(): Observable<Player[]> {
    if (this.members.length === 0) {
      return this.requestCompanyMember();
    } else {
      return of(this.members);
    }
  }

  requestCompanyMember(): Observable<Player[]> {
    return this.ffxivHttpClient.get(`${this.url}/${this.companyId}?${this.membersUrl}`).pipe(map((response: any) => {
      return response.FreeCompanyMembers.map(member => Player.fromJson(member));
    }));
  }

}
