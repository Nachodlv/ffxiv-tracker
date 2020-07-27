export class Item {
  constructor(public icon: string, public name: string) {
  }

  static fromJson(json: any): Item {
    return new Item(json.IconSmall != null ? `https://xivapi.com${json.IconSmall}` : json.Icon, json.Name);
  }
}

export enum ItemType {
  Minion,
  Mount
}
