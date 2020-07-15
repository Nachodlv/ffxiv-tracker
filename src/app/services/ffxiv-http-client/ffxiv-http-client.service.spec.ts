import { TestBed } from '@angular/core/testing';

import { FfxivHttpClientService } from './ffxiv-http-client.service';

describe('FfxivHttpClientService', () => {
  let service: FfxivHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FfxivHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
