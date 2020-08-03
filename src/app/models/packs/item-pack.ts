import {Observable} from 'rxjs';
import {Item, ItemType} from '../item';

export class ItemPack {
  public items$: Observable<Item>[];

  constructor(public name: string, public type: ItemType, public ids: string[]) {
  }
}



