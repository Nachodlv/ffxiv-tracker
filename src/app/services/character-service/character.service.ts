import {Injectable} from '@angular/core';
import {FfxivHttpClientService} from '../ffxiv-http-client/ffxiv-http-client.service';
import {Observable, of} from 'rxjs';
import {Mount} from '../../models/mount';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  url = 'character';
  mountUrl = '?data=MIMO';
  playerMounts: Map<string, Mount> = new Map<string, Mount>();

  constructor(private ffxivHttpClientService: FfxivHttpClientService) {
  }

  getCharacterMounts(playerId: string): Observable<Mount[]> {
    if (this.playerMounts.has(playerId)) {
      return of(this.playerMounts[playerId]);
    } else {
      return this.requestCharacterMounts(playerId);
    }
  }

  private requestCharacterMounts(playerId: string): Observable<Mount[]> {
    return this.ffxivHttpClientService.get(`${this.url}/${playerId}${this.mountUrl}`).pipe(map(response =>
      response.Mounts.map(mount => Mount.fromJson(mount))
    ));
  }
}
