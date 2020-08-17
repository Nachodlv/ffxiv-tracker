import {Model} from './model';

export class Item implements Model{
  constructor(public icon: string, public name: string, public id?: string | undefined) {
  }

  static fromJson(json: any): Item {
    return new Item(this.addUrl(json.IconSmall != null ? json.IconSmall : json.Icon), json.Name, json.ID + '');
  }

  private static addUrl(icon: string): string {
    return icon.includes('https') ? icon : `https://xivapi.com${icon}`;
  }

  fromJson(json: any): Model {
    return Item.fromJson(json);
  }
}

export enum ItemType {
  Minion,
  Mount
}
