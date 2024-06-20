import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcmsComponent } from './icms.component';

describe('IcmsComponent', () => {
  let component: IcmsComponent;
  let fixture: ComponentFixture<IcmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcmsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
