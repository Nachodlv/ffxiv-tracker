import {Pipe, PipeTransform} from '@angular/core';
import {Mount} from '../models/mount';

@Pipe({
  name: 'searchMounts'
})
export class SearchMountsPipe implements PipeTransform {

  transform(mounts: Mount[], searchValue: string): Mount[] {
    if (!searchValue) {
      return mounts;
    }
    const search = searchValue.toLowerCase();
    return mounts.filter(mount => mount.name.toLowerCase().includes(search));
  }

}
