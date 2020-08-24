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
            ascending: boolean, updateSort: boolean): Player[] {
    switch (playerSort) {
      case PlayerSort.Rank:
        return players.sort((a, b) => ascending ? b.rank.order - a.rank.order :  a.rank.order - b.rank.order);
      case PlayerSort.Name:
        return players.sort((a, b) => ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
      case PlayerSort.Quantity:
        return this.sortByQuantity(players, quantities, packSelected, ascending);
    }

  }

  private sortByQuantity(players: Player[], quantities: Map<string, PlayerSearch>, packSelected: boolean, ascending: boolean): Player[] {
    return players.sort((a, b) => {
      const aSearch = quantities.get(a.id);
      const bSearch = quantities.get(b.id);
      let valueToReturn: number;
      if (packSelected) {
        valueToReturn = bSearch.packLength - aSearch.packLength;
      } else {
        valueToReturn = bSearch.itemLength - aSearch.itemLength;
      }
      return valueToReturn * (ascending ? -1 : 1);
    });
  }

}
