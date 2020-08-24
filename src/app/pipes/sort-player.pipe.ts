import {Pipe, PipeTransform} from '@angular/core';
import {Player} from '../models/player';
import {PlayerSort} from '../models/sort-order';
import {ItemType} from '../models/item';
import {combineLatest, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {PlayerSearch} from '../member-list/member-list.component';

@Pipe({
  name: 'sortPlayer'
})
export class SortPlayerPipe implements PipeTransform {

  transform(players: Player[], playerSort: PlayerSort, quantities: Map<string, PlayerSearch>, packSelected: boolean,
            updateSort: boolean): Player[] {
    switch (playerSort) {
      case PlayerSort.Rank:
        return players.sort((a, b) => a.rank.order - b.rank.order);
      case PlayerSort.Name:
        return players.sort((a, b) => a.name.localeCompare(b.name));
      case PlayerSort.Quantity:
        return this.sortByQuantity(players, quantities, packSelected);
    }

  }

  private sortByQuantity(players: Player[], quantities: Map<string, PlayerSearch>, packSelected: boolean): Player[] {
    return players.sort((a, b) => {
      const aSearch = quantities.get(a.id);
      const bSearch = quantities.get(b.id);
      if (packSelected) {
        return bSearch.packLength - aSearch.packLength;
      } else {
        return bSearch.itemLength - aSearch.itemLength;
      }
    });
  }

}
