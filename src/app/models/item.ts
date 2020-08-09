import {Model} from './model';

export class Item implements Model{
  constructor(public icon: string, public name: string, public id?: string | undefined) {
  }

  static fromJson(json: any): Item {
    return new Item(json.IconSmall != null ? `https://xivapi.com${json.IconSmall}` : json.Icon, json.Name, json.ID);
  }

  fromJson(json: any): Model {
    return Item.fromJson(json);
  }
}

export enum ItemType {
  Minion,
  Mount
}
