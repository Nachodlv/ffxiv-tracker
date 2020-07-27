import {Observable} from 'rxjs';
import {Item} from './item';
import {PlayerExtraInformation} from './player-extra-information';

export class Player {
  public extraInformation$: Observable<PlayerExtraInformation>;

  constructor(public avatar: string,
              public id: string,
              public name: string) {
  }

  public static fromJson(json: any): Player {
    return new Player(json.Avatar, json.ID, json.Name);
  }
}
