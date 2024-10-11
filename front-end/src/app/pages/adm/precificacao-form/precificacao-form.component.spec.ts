import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecificacaoFormComponent } from './precificacao-form.component';

describe('PrecificacaoFormComponent', () => {
  let component: PrecificacaoFormComponent;
  let fixture: ComponentFixture<PrecificacaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrecificacaoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrecificacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
