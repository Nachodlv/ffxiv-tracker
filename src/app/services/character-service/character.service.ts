import {Injectable} from '@angular/core';
import {FfxivHttpClientService} from '../ffxiv-http-client/ffxiv-http-client.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
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
    return this.playerInformation.get(playerId, () => this.requestPlayerExtraInformation(playerId));
  }

  private requestPlayerExtraInformation(playerId: string): Observable<PlayerExtraInformation> {
    return this.ffxivHttpClientService.get(`${this.url}/${playerId}${this.mountUrl}`).pipe(map(response => {
        return PlayerExtraInformation.fromJson(response);
      }
    ));
  }
}
