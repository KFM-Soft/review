import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcmsDetalhesNotaComponent } from './icms-detalhes-nota.component';

describe('IcmsDetalhesNotaComponent', () => {
  let component: IcmsDetalhesNotaComponent;
  let fixture: ComponentFixture<IcmsDetalhesNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcmsDetalhesNotaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcmsDetalhesNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
