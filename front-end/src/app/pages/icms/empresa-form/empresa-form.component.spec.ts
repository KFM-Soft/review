import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresaFormComponent } from './empresa-form.component';

describe('EmpresaFormComponent', () => {
  let component: EmpresaFormComponent;
  let fixture: ComponentFixture<EmpresaFormComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
