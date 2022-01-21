import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Item, ItemType} from '../../models/item';
import {FfxivHttpClientService} from '../ffxiv-http-client/ffxiv-http-client.service';
import {flatMap, map} from 'rxjs/operators';
import {LocalStorageSubject} from '../storage/local-storage';
import {PaginationResult} from '../../models/pagination-result';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private allMountsUrl = 'Mount?columns=ID,Name,IconSmall,UrlType';
  private allMinionsUrl = 'Companion?columns=ID,Name,IconSmall,UrlType';

  mounts = new LocalStorageSubject<Item[]>('mounts');
  minions = new LocalStorageSubject<Item[]>('minions');

  constructor(private ffxivHttpClientService: FfxivHttpClientService) {

  }

  getMount(id: string): Observable<Item> {
    return this.mounts.get('', () => this.getAllMounts()).pipe(map(items => items.find(i => i.id === id)));
  }

  getMinion(id: string): Observable<Item> {
    return this.minions.get('', () => this.getAllMinions()).pipe(map(items => items.find(i => i.id === id)));
  }

  getMounts(ids: string[]): Observable<Item[]> {
    return this.mounts.get('', () => this.getAllMounts())
      .pipe(map(items => items.filter(i => ids.some(id => i.id === id))));
  }

  getMinions(ids: string[]): Observable<Item[]> {
    return this.minions.get('', () => this.getAllMinions())
      .pipe(map(items => items.filter(i => ids.some(id => i.id === id))));
  }

  getAllMounts(): Observable<Item[]> {
    return this.mounts.get('', () => this.getAllItems(this.allMountsUrl));
  }

  getAllMinions(): Observable<Item[]> {
    return this.minions.get('', () => this.getAllItems(this.allMinionsUrl));
  }

  private getAllItems(url: string, page: number = 1, items: Item[] = []): Observable<Item[]> {
    return this.ffxivHttpClientService.get(`${url}&page=${page}`).pipe(flatMap(response => {
      const itemPagination = PaginationResult.fromJson(response, new Item('', '', ItemType.Minion));
      const newItems = [...items, ...itemPagination.results.filter(item => item.name)];
      if (itemPagination.pagination.page < itemPagination.pagination.pageTotal) {
        return this.getAllItems(url, page + 1, newItems);
      } else {
        return of(newItems);
      }
    }));
  }

  private makeFetchItemRequest(id: string, url: string): Observable<Item> {
    return this.ffxivHttpClientService.get(`${url}${id}`).pipe(map(value => Item.fromJson(value)));
  }

}
