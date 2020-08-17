import {CacheModel, LocalStorageSubject} from './local-storage';
import {PlayerExtraInformation, PlayerExtraInformationCached} from '../../models/player-extra-information';
import {Item} from '../../models/item';
import {combineLatest, forkJoin, Observable, of, ReplaySubject, Subject} from 'rxjs';
import {filter, flatMap, map, switchMap, take, tap} from 'rxjs/operators';

export class PlayerInformationStorage extends LocalStorageSubject<PlayerExtraInformation> {

  constructor(key: string,
              private getMount: (id: string) => Observable<Item>,
              private getMinion: (id: string) => Observable<Item>,
              private allMounts: Observable<Item[]>,
              private allMinions: Observable<Item[]>
  ) {
    super(key);
  }

  get(key: string, request: () => Observable<PlayerExtraInformation>): Observable<PlayerExtraInformation> {
    if (this.replaySubject.has(key)) {
      return this.replaySubject.get(key).asObservable();
    }
    const cache = this.getFromCacheObservable(key);
    const reloader$ = new ReplaySubject<PlayerExtraInformation>();
    this.replaySubject.set(key, reloader$);
    if (cache) {
      cache.subscribe(t => reloader$.next(t));
    } else {
      request().pipe(flatMap(data => this.setIds(data)), tap(data => this.set(key, data))).subscribe(t => reloader$.next(t));
    }
    return reloader$.asObservable().pipe(filter(data => data !== undefined));
  }

  set(key: string, model: PlayerExtraInformation) {
    const cache = this.toInfoCached(model);
    localStorage.setItem(this.getKeyForModel(key), JSON.stringify(new CacheModel(cache)));
  }

  private getFromCacheObservable(key: string): Observable<PlayerExtraInformation> | undefined {
    const info = CacheModel.fromJson<PlayerExtraInformationCached>(localStorage.getItem(this.getKeyForModel(key)));
    if (!info || !info.isValid()) {
      return undefined;
    }
    return this.fromInfoCached(info.model);
  }

  private toInfoCached(info: PlayerExtraInformation): PlayerExtraInformationCached {
    return new PlayerExtraInformationCached(
      info.mounts.map(m => m.id),
      info.minions.map(m => m.id));
  }

  private fromInfoCached(info: PlayerExtraInformationCached): Observable<PlayerExtraInformation> {
    return this.getItemsObservables(info.mountsIds, info.minionsIds).pipe(map((result) => {
      return new PlayerExtraInformation(result[0], result[1]);
    }));
  }

  private getItemsObservables(mountsIds: string[], minionsIds: string[]): Observable<[Item[], Item[]]> {
    const mountsObservables = this.getItemObservable(mountsIds, this.allMounts);
    const minionsObservables = this.getItemObservable(minionsIds, this.allMinions);
    return combineLatest([mountsObservables, minionsObservables]);
  }

  private getItemObservable(ids: string[], request: Observable<Item[]>): Observable<Item[]> {
    return request.pipe(map(items => items.filter(item => ids.some(id => id === item.id))));
  }

  private setIds(info: PlayerExtraInformation): Observable<PlayerExtraInformation> {
    return combineLatest([this.allMounts, this.allMinions]).pipe(map(result => {
      info.mounts.forEach(m => m.id = this.getItemId(m, result[0]));
      info.minions.forEach(m => m.id = this.getItemId(m, result[1]));
      return info;
    }));
  }

  private getItemId(item: Item, items: Item[]): string {
    return items.find(i => i.name.toLowerCase() === item.name.toLowerCase()).id;
  }
}
