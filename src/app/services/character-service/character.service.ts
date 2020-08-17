import {Injectable} from '@angular/core';
import {FfxivHttpClientService} from '../ffxiv-http-client/ffxiv-http-client.service';
import {Observable, of, throwError} from 'rxjs';
import {catchError, flatMap, map, retry} from 'rxjs/operators';
import {PlayerExtraInformation} from '../../models/player-extra-information';
import {LocalStorageSubject} from '../storage/local-storage';
import {ItemService} from '../item-service/item.service';
import {PlayerInformationStorage} from '../storage/player-information-storage';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private url = 'character';
  private mountUrl = '?data=MIMO';
  private playerInformation: PlayerInformationStorage;

  constructor(private ffxivHttpClientService: FfxivHttpClientService, private itemService: ItemService) {
    this.playerInformation = new PlayerInformationStorage(
      'player-information',
      (id) => itemService.getMount(id),
      (id) => itemService.getMinion(id),
      itemService.getAllMounts(),
      itemService.getAllMinions());
  }


  getPlayerExtraInformation(playerId: string): Observable<PlayerExtraInformation> {
    return this.playerInformation.get(playerId, () => of(undefined).pipe(
      flatMap(() => this.requestPlayerExtraInformation(playerId)),
      retry(5),
      catchError((err) => this.requestPlayerExtraInformation(playerId, true))));
  }

  private requestPlayerExtraInformation(playerId: string, ignoreItemsLength = false): Observable<PlayerExtraInformation> {
    return this.ffxivHttpClientService.get(`${this.url}/${playerId}${this.mountUrl}`, false).pipe(flatMap(response => {
        const info = PlayerExtraInformation.fromJson(response);
        if (ignoreItemsLength || (info.mounts.length > 0 && info.minions.length > 0)) {
          return of(info);
        }
        console.log("Error getting player");
        return throwError(`Error loading ${playerId}`);
      }
    ));
  }
}
