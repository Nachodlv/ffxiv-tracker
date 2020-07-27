import { Pipe, PipeTransform } from '@angular/core';
import {Item} from '../models/item';
import {Player} from '../models/player';

@Pipe({
  name: 'hasItem'
})
export class HasItemPipe implements PipeTransform {

  transform(value: Item, playerMounts: Item[]): boolean {
    return playerMounts.some(mount => mount.name.toLowerCase() === value.name.toLowerCase());
  }

}
