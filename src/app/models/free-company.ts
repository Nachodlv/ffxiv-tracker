import {Observable} from 'rxjs';
import {Player} from './player';
import {Model} from './model';

export class FreeCompany implements Model {
  players$: Observable<Player[]> | undefined;

  constructor(public id: string = '', public crest: string[] = [], public name: string = '', public server: string = '') {
  }

  static fromJson(json: any): FreeCompany {
    return new FreeCompany(json.ID, json.Crest, json.Name, json.Server);
  }

  fromJson(json: any): FreeCompany {
    return FreeCompany.fromJson(json);
  }

}
