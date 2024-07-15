import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcmsGrupoNotasComponent } from './icms-grupo-notas.component';

describe('IcmsGrupoNotasComponent', () => {
  let component: IcmsGrupoNotasComponent;
  let fixture: ComponentFixture<IcmsGrupoNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcmsGrupoNotasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcmsGrupoNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
