import { TestBed } from '@angular/core/testing';

import { IcmsService } from './icms.service';

describe('IcmsService', () => {
  let service: IcmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IcmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
