import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AliquotaFormComponent } from './aliquota-form.component';

describe('AliquotaFormComponent', () => {
  let component: AliquotaFormComponent;
  let fixture: ComponentFixture<AliquotaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AliquotaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AliquotaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
