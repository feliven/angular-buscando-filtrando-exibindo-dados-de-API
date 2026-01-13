import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassagemDestaqueComponent } from './passagem-destaque.component';

describe('PassagemDestaqueComponent', () => {
  let component: PassagemDestaqueComponent;
  let fixture: ComponentFixture<PassagemDestaqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassagemDestaqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassagemDestaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
