import {Model} from './model';

export class Item implements Model {
  constructor(public icon: string, public name: string, public itemType: ItemType, public id?: string | undefined) {
  }

  static fromJson(json: any, itemType?: ItemType): Item {
    return new Item(
      json.Icon,
      json.Name,
      json.UrlType === 'Mount' || itemType === ItemType.Mount ? ItemType.Mount : ItemType.Minion,
      json.ID + '');
  }

  public tryGenerateNewIconUrl(): void {
    if (this.icon.includes('https')) {
      // The url has already been generated
      return;
    }
    const newId = +this.icon.substr(this.icon.length - 7, 3) + 4000;
    this.icon =  `https://xivapi.com/i/004000/00${newId}.png`;
  }

  fromJson(json: any): Model {
    return Item.fromJson(json);
  }
}

export enum ItemType {
  Minion,
  Mount
}
