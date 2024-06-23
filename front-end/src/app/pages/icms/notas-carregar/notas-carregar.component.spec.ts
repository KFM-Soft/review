import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasCarregarComponent } from './notas-carregar.component';

describe('NotasCarregarComponent', () => {
  let component: NotasCarregarComponent;
  let fixture: ComponentFixture<NotasCarregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotasCarregarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotasCarregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
