import {Injectable} from '@angular/core';
import {FfxivHttpClientService} from '../ffxiv-http-client/ffxiv-http-client.service';
import {Observable, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {PlayerExtraInformation} from '../../models/player-extra-information';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private url = 'character';
  private mountUrl = '?data=MIMO';
  private playerMounts: Map<string, PlayerExtraInformation> = new Map<string, PlayerExtraInformation>();
  private playerMountsSubject: Map<string, ReplaySubject<PlayerExtraInformation>> = new Map<string, ReplaySubject<PlayerExtraInformation>>();

  constructor(private ffxivHttpClientService: FfxivHttpClientService) {
  }

  getPlayerExtraInformation(playerId: string): Observable<PlayerExtraInformation> {
    if (!this.playerMountsSubject.has(playerId)) {
      this.fetchPlayerExtraInformation(playerId);
    }
    return this.playerMountsSubject.get(playerId).asObservable();
  }

  fetchPlayerExtraInformation(playerId: string): void {
    if (!this.playerMountsSubject.has(playerId)) {
      this.playerMountsSubject.set(playerId, new ReplaySubject<PlayerExtraInformation>());
    }
    if (this.playerMounts.has(playerId)) {
      this.playerMountsSubject.get(playerId).next(this.playerMounts.get(playerId));
      this.playerMountsSubject.get(playerId).complete();
    } else {
      this.requestPlayerExtraInformation(playerId).subscribe(value => {
        this.playerMountsSubject.get(playerId).next(value);
        this.playerMountsSubject.get(playerId).complete();
      });
    }
  }

  private requestPlayerExtraInformation(playerId: string): Observable<PlayerExtraInformation> {
    return this.ffxivHttpClientService.get(`${this.url}/${playerId}${this.mountUrl}`).pipe(map(response => {
      return PlayerExtraInformation.fromJson(response);
      }
    ));
  }
}
