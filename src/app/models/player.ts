import {Observable} from 'rxjs';
import {Mount} from './mount';

export class Player {
  public mounts: Observable<Mount[]>;
  constructor(public avatar: string,
              public id: string,
              public name: string) {
  }

  public static fromJson(json: any): Player {
    return new Player(json.Avatar, json.ID, json.Name);
  }
}
