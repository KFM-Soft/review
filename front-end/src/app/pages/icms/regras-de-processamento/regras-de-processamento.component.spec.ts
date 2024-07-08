import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegrasDeProcessamentoComponent } from './regras-de-processamento.component';

describe('RegrasDeProcessamentoComponent', () => {
  let component: RegrasDeProcessamentoComponent;
  let fixture: ComponentFixture<RegrasDeProcessamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegrasDeProcessamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegrasDeProcessamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
