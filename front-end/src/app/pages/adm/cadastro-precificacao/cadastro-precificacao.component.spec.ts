import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPrecificacaoComponent } from './cadastro-precificacao.component';

describe('CadastroPrecificacaoComponent', () => {
  let component: CadastroPrecificacaoComponent;
  let fixture: ComponentFixture<CadastroPrecificacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroPrecificacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroPrecificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
