import { TestBed } from '@angular/core/testing';

import { OilCompanyService } from './oil-company.service';

describe('OilCompanyService', () => {
  let service: OilCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OilCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
