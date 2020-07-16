import {Pipe, PipeTransform} from '@angular/core';
import {Player} from '../models/player';
import {Mount} from '../models/mount';

@Pipe({
  name: 'searchPlayers'
})
export class SearchPlayersPipe implements PipeTransform {

  transform( player: Player, searchInput: string): boolean {
    if (!searchInput) {
      return true;
    }
    const search = searchInput.toLowerCase();
    return player.name.toLowerCase().includes(search);
  }

}
