import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcmsHomeComponent } from './icms-home.component';

describe('IcmsHomeComponent', () => {
  let component: IcmsHomeComponent;
  let fixture: ComponentFixture<IcmsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcmsHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcmsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
