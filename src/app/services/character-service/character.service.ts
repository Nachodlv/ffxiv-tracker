import {Injectable} from '@angular/core';
import {FfxivHttpClientService} from '../ffxiv-http-client/ffxiv-http-client.service';
import {Observable, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {PlayerExtraInformation} from '../../models/player-extra-information';
import {CacheSubject} from "../cacheSubject";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private url = 'character';
  private mountUrl = '?data=MIMO';
  private playerMounts = new CacheSubject<PlayerExtraInformation, string>();

  constructor(private ffxivHttpClientService: FfxivHttpClientService) {
  }

  getPlayerExtraInformation(playerId: string): Observable<PlayerExtraInformation> {
    return this.playerMounts.getObservable(playerId, () => this.requestPlayerExtraInformation(playerId));
  }

  private requestPlayerExtraInformation(playerId: string): Observable<PlayerExtraInformation> {
    return this.ffxivHttpClientService.get(`${this.url}/${playerId}${this.mountUrl}`).pipe(map(response => {
      return PlayerExtraInformation.fromJson(response);
      }
    ));
  }
}
