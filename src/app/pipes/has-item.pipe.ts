import { Pipe, PipeTransform } from '@angular/core';
import {Item} from '../models/item';
import {Player} from '../models/player';

@Pipe({
  name: 'hasItem'
})
export class HasItemPipe implements PipeTransform {

  transform(value: Item, items: Item[]): boolean {
    return items.some(item => item.name.toLowerCase() === value.name.toLowerCase());
  }

}
