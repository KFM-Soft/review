import { TestBed } from '@angular/core/testing';

import { MultiplicadorService } from './multiplicador.service';

describe('MultiplicadorService', () => {
  let service: MultiplicadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiplicadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
