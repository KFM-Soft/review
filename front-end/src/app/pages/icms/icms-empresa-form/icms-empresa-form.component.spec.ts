import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcmsEmpresaFormComponent } from './icms-empresa-form.component';

describe('IcmsEmpresaFormComponent', () => {
  let component: IcmsEmpresaFormComponent;
  let fixture: ComponentFixture<IcmsEmpresaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcmsEmpresaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcmsEmpresaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
