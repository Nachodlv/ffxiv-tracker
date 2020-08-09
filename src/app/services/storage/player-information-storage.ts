import {CacheModel, LocalStorageSubject} from './local-storage';
import {PlayerExtraInformation, PlayerExtraInformationCached} from '../../models/player-extra-information';
import {Item} from '../../models/item';
import {combineLatest, forkJoin, Observable, ReplaySubject, Subject} from 'rxjs';
import {filter, map, switchMap, take, tap} from 'rxjs/operators';

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
      request().pipe(tap(data => this.set(key, data))).subscribe(t => reloader$.next(t));
    }
    return reloader$.asObservable().pipe(filter(data => data !== undefined));
  }

  set(key: string, model: PlayerExtraInformation) {
    const subscription = this.toInfoCached(model).subscribe(cached => {
      localStorage.setItem(this.getKeyForModel(key), JSON.stringify(new CacheModel(cached)));
    });
  }


  private getFromCacheObservable(key: string): Observable<PlayerExtraInformation> | undefined {
    const info = CacheModel.fromJson<PlayerExtraInformationCached>(localStorage.getItem(this.getKeyForModel(key)));
    if (!info || !info.isValid()) {
      return undefined;
    }
    return this.fromInfoCached(info.model);
  }

  private toInfoCached(info: PlayerExtraInformation): Observable<PlayerExtraInformationCached> {
    return combineLatest([this.allMounts, this.allMinions]).pipe(map(result => {
      return new PlayerExtraInformationCached(
        info.mounts.map(m => this.getItemId(m, result[0])),
        info.minions.map(m => this.getItemId(m, result[1])));
    }));
  }

  private fromInfoCached(info: PlayerExtraInformationCached): Observable<PlayerExtraInformation> {
    const mountsObservables = combineLatest(info.mountsIds.map(m => this.getMount(m)));
    const minionsObservables = combineLatest(info.minionsIds.map(m => this.getMinion(m)));
    return combineLatest([mountsObservables, minionsObservables]).pipe(map((result) => {
      return new PlayerExtraInformation(result[0], result[1]);
    }));
  }

  private getItemId(item: Item, items: Item[]): string {
    return items.find(i => i.name.toLowerCase() === item.name.toLowerCase()).id;
  }
}
