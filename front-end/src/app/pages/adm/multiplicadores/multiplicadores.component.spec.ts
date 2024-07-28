import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplicadoresComponent } from './multiplicadores.component';

describe('MultiplicadoresComponent', () => {
  let component: MultiplicadoresComponent;
  let fixture: ComponentFixture<MultiplicadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiplicadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiplicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
