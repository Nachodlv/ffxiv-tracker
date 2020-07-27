import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Item} from '../../models/item';
import {FfxivHttpClientService} from '../ffxiv-http-client/ffxiv-http-client.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private mountUrl = 'Mount/';

  private mountsSubject = new Map<string, ReplaySubject<Item>>();
  private mounts = new Map<string, Item>();

  mounts$ = new Map<string, Observable<Item>>();

  constructor(private ffxivHttpClientService: FfxivHttpClientService) {
  }

  getMount(id: string): Observable<Item> {
    if (!this.mountsSubject.has(id)) {
      this.fetchMount(id);
    }
    return this.mountsSubject.get(id).asObservable();
  }

  fetchMount(id: string): void {
    if (!this.mountsSubject.get(id)) {
      this.mountsSubject.set(id, new ReplaySubject<Item>());
    }
    if (!this.mounts.has(id)) {
      this.makeFetchMountRequest(id).subscribe(value => {
        this.nextValue(id, value);
      });
    } else {
      this.nextValue(id, this.mounts.get(id));
    }
  }

  private makeFetchMountRequest(id: string): Observable<Item> {
    return this.ffxivHttpClientService.get(`${this.mountUrl}${id}`).pipe(map(value => Item.fromJson(value)));
  }

  private nextValue(id: string, value: Item): void {
    this.mountsSubject.get(id).next(value);
    this.mountsSubject.get(id).complete();
  }
}
