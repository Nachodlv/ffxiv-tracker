import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Mount} from '../../models/mount';
import {FfxivHttpClientService} from '../ffxiv-http-client/ffxiv-http-client.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private mountUrl = 'Mount/';

  private mountsSubject = new Map<string, ReplaySubject<Mount>>();
  private mounts = new Map<string, Mount>();

  mounts$ = new Map<string, Observable<Mount>>();

  constructor(private ffxivHttpClientService: FfxivHttpClientService) {
  }

  getMount(id: string): Observable<Mount> {
    if (!this.mountsSubject.has(id)) {
      this.fetchMount(id);
    }
    return this.mountsSubject.get(id).asObservable();
  }

  fetchMount(id: string): void {
    if (!this.mountsSubject.get(id)) {
      this.mountsSubject.set(id, new ReplaySubject<Mount>());
    }
    if (!this.mounts.has(id)) {
      this.makeFetchMountRequest(id).subscribe(value => this.mountsSubject.get(id).next(value));
    } else {
      this.mountsSubject.get(id).next(this.mounts.get(id));
    }
  }

  makeFetchMountRequest(id: string): Observable<Mount> {
    return this.ffxivHttpClientService.get(`${this.mountUrl}${id}`).pipe(map(value => Mount.fromJson(value)));
  }
}
