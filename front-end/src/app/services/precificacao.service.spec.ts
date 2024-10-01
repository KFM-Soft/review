import { TestBed } from '@angular/core/testing';

import { PrecificacaoService } from './precificacao.service';

describe('PrecificacaoService', () => {
  let service: PrecificacaoService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecificacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
