import {Observable, ReplaySubject, Subject} from 'rxjs';
import {filter, startWith, switchMap, tap} from 'rxjs/operators';

export class LocalStorageSubject<T> {

  protected replaySubject = new Map<string, ReplaySubject<T>>();

  constructor(private localStorageKey: string) {
  }

  get(key: string, request: () => Observable<T>): Observable<T> {
    if (this.replaySubject.has(key)) {
      return this.replaySubject.get(key).asObservable();
    }
    const reloader$ = new ReplaySubject<T>();
    this.replaySubject.set(key, reloader$);
    const cache = this.tryToGetFromCache(key);
    if (cache) {
      reloader$.next(cache);
    } else {
      request().pipe(tap(data => this.set(key, data))).subscribe(t => reloader$.next(t));
    }
    return reloader$.asObservable().pipe(filter(data => !!data));
  }

  set(key: string, model: T): void {
    localStorage.setItem(this.getKeyForModel(key), JSON.stringify(new CacheModel(model)));
  }

  tryToGetFromCache(key: string): T | undefined {
    const cache = CacheModel.fromJson<T>(localStorage.getItem(this.getKeyForModel(key)));
    return cache && cache.isValid() ? cache.model : undefined;
  }

  // TODO, slow?
  getAllCached(): T[] {
    const list: T[] = [];
    for (const localStorageKey in localStorage) {
      if (localStorageKey.split('\0')[0] === this.localStorageKey) {
        list.push(CacheModel.fromJson<T>(localStorage.getItem(localStorageKey)).model);
      }
    }
    return list;
  }

  protected getKeyForModel(key: string): string {
    return this.localStorageKey + '\0' + key;
  }
}

export class CacheModel<T> {

  constructor(public model: T, public timeStamp: number = new Date().getTime()) {
  }

  MAX_CACHE_TIME = 21600 * 1000;

  static fromJson<T>(json: string): CacheModel<T> {
    if (json) {
      const parsed = JSON.parse(json);
      return new CacheModel<T>(parsed.model, parsed.timeStamp);
    }
  }

  isValid(): boolean {
    return (new Date().getTime() - this.timeStamp) < this.MAX_CACHE_TIME;
  }
}



