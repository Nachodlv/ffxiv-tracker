import { TestBed } from '@angular/core/testing';

import { FreeCompanyService } from './free-company.service';

describe('FreeCompanyServiceService', () => {
  let service: FreeCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreeCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
