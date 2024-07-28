import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplicadoresFormComponent } from './multiplicadores-form.component';

describe('MultiplicadoresFormComponent', () => {
  let component: MultiplicadoresFormComponent;
  let fixture: ComponentFixture<MultiplicadoresFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiplicadoresFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiplicadoresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
