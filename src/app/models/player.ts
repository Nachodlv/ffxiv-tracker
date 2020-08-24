import {Observable} from 'rxjs';
import {Item} from './item';
import {PlayerExtraInformation} from './player-extra-information';

export class Player {
  public extraInformation$: Observable<PlayerExtraInformation>;

  constructor(public id: string,
              public name: string,
              public rank: Rank) {
  }

  public static fromJson(json: any, order?: number): Player {
    return new Player(json.ID, json.Name, Rank.fromJson(json, order));
  }
}

class Rank {
  constructor(public name: string, public icon: string, public order: number) {
  }

  public static fromJson(json: any, order?: number): Rank {
    return new Rank(json.Rank, json.RankIcon, order);
  }
}
