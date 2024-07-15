import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcmsRegrasDeProcessamentoComponent } from './icms-regras-de-processamento.component';

describe('IcmsRegrasDeProcessamentoComponent', () => {
  let component: IcmsRegrasDeProcessamentoComponent;
  let fixture: ComponentFixture<IcmsRegrasDeProcessamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcmsRegrasDeProcessamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcmsRegrasDeProcessamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
