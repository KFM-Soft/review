import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcmFormComponent } from './ncm-form.component';

describe('NcmFormComponent', () => {
  let component: NcmFormComponent;
  let fixture: ComponentFixture<NcmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcmFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NcmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
