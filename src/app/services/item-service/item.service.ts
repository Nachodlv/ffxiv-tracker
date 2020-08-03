import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Item} from '../../models/item';
import {FfxivHttpClientService} from '../ffxiv-http-client/ffxiv-http-client.service';
import {map} from 'rxjs/operators';
import {CacheSubject} from '../cacheSubject';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private mountUrl = 'Mount/';
  private minionUrl = 'Companion/';

  private mounts = new CacheSubject<Item, string>();
  private minions = new CacheSubject<Item, string>();

  constructor(private ffxivHttpClientService: FfxivHttpClientService) {
  }

  getMount(id: string): Observable<Item> {
    return this.mounts.getObservable(id, () => this.makeFetchItemRequest(id, this.mountUrl));
  }

  getMinion(id: string): Observable<Item> {
    return this.minions.getObservable(id, () => this.makeFetchItemRequest(id, this.minionUrl));
  }

  private makeFetchItemRequest(id: string, url: string): Observable<Item> {
    return this.ffxivHttpClientService.get(`${url}${id}`).pipe(map(value => Item.fromJson(value)));
  }

}
