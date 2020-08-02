import {Observable, ReplaySubject} from 'rxjs';

export class CacheSubject<T, S> {
  private cache = new Map<S, T>();
  private subject = new Map<S, ReplaySubject<T>>();

  constructor() {
  }

  getObservable(s: S, request: () => Observable<T>): Observable<T> {
    if (!this.subject.has(s)) {
      this.fetch(s, request);
    }
    return this.subject.get(s).asObservable();
  }

  set(s: S, t: T): void {
    this.cache.set(s, t);
  }

  private fetch(s: S, request: () => Observable<T>): void {
    if (!this.subject.has(s)) {
      this.subject.set(s, new ReplaySubject<T>());
    }
    if (this.cache.has(s)) {
      this.next(s, this.cache.get(s));
    } else {
      request().subscribe(t => this.next(s, t));
    }
  }

  private next(s: S, t: T): void {
    this.subject.get(s).next(t);
    this.subject.get(s).complete();
  }

}



