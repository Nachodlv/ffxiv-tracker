import {Pipe, PipeTransform} from '@angular/core';
import {Item} from '../models/item';

@Pipe({
  name: 'searchItems'
})
export class SearchItemsPipe implements PipeTransform {

  transform(items: Item[], searchValue: string): Item[] {
    if (!searchValue) {
      return items;
    }
    const search = searchValue.toLowerCase();
    return items.filter(item => item.name.toLowerCase().includes(search));
  }

}
