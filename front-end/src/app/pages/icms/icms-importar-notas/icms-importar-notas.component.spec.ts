import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcmsImportarNotasComponent } from './icms-importar-notas.component';

describe('IcmsImportarNotasComponent', () => {
  let component: IcmsImportarNotasComponent;
  let fixture: ComponentFixture<IcmsImportarNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcmsImportarNotasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcmsImportarNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
