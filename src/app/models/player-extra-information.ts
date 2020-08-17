import {Item, ItemType} from './item';

export class PlayerExtraInformation {
  constructor(public mounts: Item[] = [], public minions: Item[] = []) {
  }

  public static fromJson(json: any): PlayerExtraInformation {
    return new PlayerExtraInformation(
      json.Mounts.map(mount => Item.fromJson(mount, ItemType.Mount)),
      json.Minions.map(minion => Item.fromJson(minion, ItemType.Minion)));
  }
}

export class PlayerExtraInformationCached {
  constructor(public mountsIds: string[], public minionsIds: string[]) {
  }

}
