import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasProcessadasComponent } from './notas-processadas.component';

describe('NotasProcessadasComponent', () => {
  let component: NotasProcessadasComponent;
  let fixture: ComponentFixture<NotasProcessadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotasProcessadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotasProcessadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
