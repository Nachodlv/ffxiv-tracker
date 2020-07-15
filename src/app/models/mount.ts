export class Mount {
  constructor(public icon: string, public name: string) {
  }

  static fromJson(json: any): Mount {
    return new Mount(json.Icon, json.Name);
  }
}
