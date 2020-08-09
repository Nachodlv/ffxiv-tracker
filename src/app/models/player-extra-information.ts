import {Item} from './item';

export class PlayerExtraInformation {
  constructor(public mounts: Item[] = [], public minions: Item[] = []) {
  }

  public static fromJson(json: any): PlayerExtraInformation {
    return new PlayerExtraInformation(
      json.Mounts.map(mount => Item.fromJson(mount)),
      json.Minions.map(minion => Item.fromJson(minion)));
  }
}

export class PlayerExtraInformationCached {
  constructor(public mountsIds: string[], public minionsIds: string[]) {
  }

}
