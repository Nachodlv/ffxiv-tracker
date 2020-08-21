import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DataCenter} from '../../models/data-center';
import {LocalStorageSubject} from '../storage/local-storage';
import {FfxivHttpClientService} from '../ffxiv-http-client/ffxiv-http-client.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataCenterService {

  private dataCenters = new LocalStorageSubject<DataCenter[]>('data-center');
  private url = 'servers/dc';

  constructor(private ffxivHttpClientService: FfxivHttpClientService) {
  }

  getDataCenters(): Observable<DataCenter[]> {
    return this.dataCenters.get('all', () => this.requestDataCenters());
  }

  private requestDataCenters(): Observable<DataCenter[]> {
    return this.ffxivHttpClientService.get(this.url).pipe(map(result => {
      return Object.keys(result).map(key => new DataCenter(key, result[key]));
    }));
  }
}
