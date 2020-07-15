import {Injectable} from '@angular/core';
import {FfxivHttpClientService} from '../ffxiv-http-client/ffxiv-http-client.service';
import {Observable, of, ReplaySubject} from 'rxjs';
import {Mount} from '../../models/mount';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private url = 'character';
  private mountUrl = '?data=MIMO';
  private playerMounts: Map<string, Mount[]> = new Map<string, Mount[]>();
  private playerMountsSubject: Map<string, ReplaySubject<Mount[]>> = new Map<string, ReplaySubject<Mount[]>>();

  constructor(private ffxivHttpClientService: FfxivHttpClientService) {
  }

  getPlayerMount(playerId: string): Observable<Mount[]> {
    if (!this.playerMountsSubject.has(playerId)) {
      this.fetchCharacterMounts(playerId);
    }
    return this.playerMountsSubject.get(playerId).asObservable();
  }

  fetchCharacterMounts(playerId: string): void {
    if (!this.playerMountsSubject.has(playerId)) {
      this.playerMountsSubject.set(playerId, new ReplaySubject<Mount[]>());
    }
    if (this.playerMounts.has(playerId)) {
      this.playerMountsSubject.get(playerId).next(this.playerMounts.get(playerId));
    } else {
      this.requestCharacterMounts(playerId).subscribe(value => this.playerMountsSubject.get(playerId).next(value));
    }
  }

  private requestCharacterMounts(playerId: string): Observable<Mount[]> {
    return this.ffxivHttpClientService.get(`${this.url}/${playerId}${this.mountUrl}`).pipe(map(response => {
        const mounts = response.Mounts.map(mount => Mount.fromJson(mount));
        this.playerMounts.set(playerId, mounts);
        return mounts;
      }
    ));
  }
}
