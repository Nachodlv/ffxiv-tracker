import { Pipe, PipeTransform } from '@angular/core';
import {Mount} from '../models/mount';
import {Player} from '../models/player';

@Pipe({
  name: 'hasMount'
})
export class HasMountPipe implements PipeTransform {

  transform(value: Mount, playerMounts: Mount[]): boolean {
    return playerMounts.some(mount => mount.name.toLowerCase() === value.name.toLowerCase());
  }

}
