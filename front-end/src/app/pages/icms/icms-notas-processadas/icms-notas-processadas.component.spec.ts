import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcmsNotasProcessadasComponent } from './icms-notas-processadas.component';

describe('IcmsNotasProcessadasComponent', () => {
  let component: IcmsNotasProcessadasComponent;
  let fixture: ComponentFixture<IcmsNotasProcessadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcmsNotasProcessadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcmsNotasProcessadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
