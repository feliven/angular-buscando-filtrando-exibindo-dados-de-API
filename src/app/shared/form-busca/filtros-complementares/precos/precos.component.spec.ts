import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { PrecosComponent } from './precos.component';
import { FormBuscaService } from '../../../../core/services/form-busca.service';
import { PassagensService } from '../../../../core/services/passagens.service';

// Mock for the app-label component usually found in shared/
@Component({
  selector: 'app-label',
  template: '',
  standalone: false,
})
class MockLabelComponent {
  @Input() texto: string = '';
}

describe('PrecosComponent', () => {
  let component: PrecosComponent;
  let fixture: ComponentFixture<PrecosComponent>;
  let formBuscaServiceSpy: jasmine.SpyObj<FormBuscaService>;
  let passagensServiceMock: Partial<PassagensService>;

  beforeEach(async () => {
    // Mock FormBuscaService to return dummy FormControls
    const spy = jasmine.createSpyObj('FormBuscaService', ['obterControle']);
    spy.obterControle.and.callFake((nome: string) => {
      // Return different values based on control name if needed, or just a generic control
      return new FormControl(nome === 'precoMin' ? 100 : 500);
    });

    // Mock PassagensService properties required by the HTML template
    passagensServiceMock = {
      precoMin: 50,
      precoMax: 1000,
    };

    await TestBed.configureTestingModule({
      declarations: [
        PrecosComponent,
        MockLabelComponent, // Add the mock component here
      ],
      imports: [
        ReactiveFormsModule,
        MatSliderModule, // Required for <mat-slider>
        NoopAnimationsModule, // Required because Material components use animations
      ],
      providers: [
        { provide: FormBuscaService, useValue: spy },
        { provide: PassagensService, useValue: passagensServiceMock },
      ],
      // schemas: [NO_ERRORS_SCHEMA] // Removed: The test is now fully integrated
    }).compileComponents();

    fixture = TestBed.createComponent(PrecosComponent);
    component = fixture.componentInstance;
    formBuscaServiceSpy = TestBed.inject(
      FormBuscaService
    ) as jasmine.SpyObj<FormBuscaService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize precoMin and precoMax controls using dependencies', () => {
    expect(formBuscaServiceSpy.obterControle).toHaveBeenCalledWith('precoMin');
    expect(formBuscaServiceSpy.obterControle).toHaveBeenCalledWith('precoMax');

    expect(component.precoMin).toBeDefined();
    expect(component.precoMax).toBeDefined();
    expect(component.precoMin.value).toBe(100);
  });

  it('should access passagensService properties for valid ranges', () => {
    expect(component.passagensService.precoMin).toBe(50);
    expect(component.passagensService.precoMax).toBe(1000);
  });

  it('should display the correct initial prices formatted in the template', () => {
    const priceDisplayElements =
      fixture.nativeElement.querySelectorAll('.label-container p');
    expect(priceDisplayElements.length).toBe(2);

    const minPriceText = priceDisplayElements[0].textContent;
    const maxPriceText = priceDisplayElements[1].textContent;

    // Checks if the displayed text contains the value.
    expect(minPriceText).toContain('100');
    expect(maxPriceText).toContain('500');
  });

  it('should update the template when form control values change', () => {
    component.precoMin.setValue(250);
    component.precoMax.setValue(750);
    fixture.detectChanges();

    const priceDisplayElements =
      fixture.nativeElement.querySelectorAll('.label-container p');

    expect(priceDisplayElements[0].textContent).toContain('250');
    expect(priceDisplayElements[1].textContent).toContain('750');
  });

  it('should pass the correct input to app-label', () => {
    // Find the MockLabelComponent instance
    const labelDebugEl = fixture.debugElement.query(
      By.directive(MockLabelComponent)
    );

    expect(labelDebugEl).toBeTruthy();

    const labelInstance = labelDebugEl.componentInstance as MockLabelComponent;
    expect(labelInstance.texto).toBe('Preço por passagem');
  });

  it('should render mat-slider with correct inputs', () => {
    const sliderDebugEl = fixture.debugElement.query(By.css('mat-slider'));
    expect(sliderDebugEl).toBeTruthy();

    // Verify inputs passed to the real MatSlider component
    const sliderInstance = sliderDebugEl.componentInstance;
    expect(sliderInstance.min).toBe(50);
    expect(sliderInstance.max).toBe(1000);
  });
});
