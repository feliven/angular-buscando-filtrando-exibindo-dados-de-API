import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosComplementaresComponent } from './filtros-complementares.component';

describe('FiltrosComplementaresComponent', () => {
  let component: FiltrosComplementaresComponent;
  let fixture: ComponentFixture<FiltrosComplementaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosComplementaresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrosComplementaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
