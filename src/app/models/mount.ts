export class Mount {
  constructor(public icon: string, public name: string) {
  }

  static fromJson(json: any): Mount {
    return new Mount(json.IconSmall != null ? `https://xivapi.com${json.IconSmall}` : json.Icon, json.Name);
  }
}
