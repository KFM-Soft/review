import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosFormComponent } from './estados-form.component';

describe('EstadosFormComponent', () => {
  let component: EstadosFormComponent;
  let fixture: ComponentFixture<EstadosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadosFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
