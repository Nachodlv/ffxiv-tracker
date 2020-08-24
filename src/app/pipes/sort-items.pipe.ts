import { Pipe, PipeTransform } from '@angular/core';
import {Item} from '../models/item';
import {ItemSort} from '../models/sort-order';

@Pipe({
  name: 'sortItems'
})
export class SortItemsPipe implements PipeTransform {

  transform(items: Item[], sortItem: ItemSort, ascending: boolean): Item[] {
    return items.sort((a, b) => {
      let returnValue;
      switch (sortItem) {
        case ItemSort.Id:
          returnValue = a.id.localeCompare(b.id);
          break;
        case ItemSort.Name:
          returnValue = a.name.localeCompare(b.name);
          break;
      }
      return returnValue * (ascending ? 1 : -1);
    });
  }

}
