import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { FormBuscaComponent } from './form-busca.component';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';
import { DadosParaBusca } from 'src/app/core/types/type';

// Mock Child Components
@Component({
  selector: 'app-card',
  template: '<ng-content></ng-content>',
  standalone: false,
})
class MockCardComponent {
  @Input() variant: any;
}

@Component({ selector: 'app-dropdown-uf', template: '', standalone: false })
class MockDropdownUfComponent {
  @Input() label: any;
  @Input() placeholder: any;
  @Input() iconePrefixo: any;
  @Input() control: any;
}

fdescribe('FormBuscaComponent', () => {
  let component: FormBuscaComponent;
  let fixture: ComponentFixture<FormBuscaComponent>;
  let mockFormBuscaService: any;

  // Mock data complying with DadosParaBusca interface
  const mockDadosParaBusca: DadosParaBusca = {
    somenteIda: false,
    passageirosAdultos: 1,
    tipo: 'Econômica',
    origemId: 1,
    destinoId: 2,
    dataIda: '2026-01-20',
    porPagina: 10,
  };

  beforeEach(async () => {
    // Create controls outside to avoid self-reference issues in mock object
    const formGroup = new FormGroup({
      somenteIda: new FormControl(false),
      tipo: new FormControl('Econômica'),
      origem: new FormControl(null),
      destino: new FormControl(null),
      dataIda: new FormControl(null),
      dataVolta: new FormControl(null),
    });

    mockFormBuscaService = {
      formBusca: formGroup,
      openDialog: jasmine.createSpy('openDialog'),
      getDescricaoPassageiros: jasmine
        .createSpy('getDescricaoPassageiros')
        .and.returnValue('1 adulto'),
      obterControle: jasmine
        .createSpy('obterControle')
        .and.callFake((nome: string) => {
          return formGroup.get(nome);
        }),
      trocarOrigemDestino: jasmine.createSpy('trocarOrigemDestino'),
      obterDadosParaBusca: jasmine
        .createSpy('obterDadosParaBusca')
        .and.returnValue(mockDadosParaBusca),
      // Default valid state
      get formEstaValido() {
        return true;
      },
    };

    await TestBed.configureTestingModule({
      declarations: [
        FormBuscaComponent,
        MockCardComponent,
        MockDropdownUfComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
      ],
      providers: [
        { provide: FormBuscaService, useValue: mockFormBuscaService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit "realizarBusca" with correct data when form is valid', () => {
    spyOn(component.realizarBusca, 'emit');
    // Mock the property getter on the service object
    spyOnProperty(
      mockFormBuscaService,
      'formEstaValido',
      'get'
    ).and.returnValue(true);

    component.buscar();

    expect(mockFormBuscaService.obterDadosParaBusca).toHaveBeenCalled();
    expect(component.realizarBusca.emit).toHaveBeenCalledWith(
      mockDadosParaBusca
    );
  });

  it('should alert and NOT emit when form is invalid', () => {
    spyOn(window, 'alert');
    spyOn(component.realizarBusca, 'emit');
    // Mock the property getter on the service object
    spyOnProperty(
      mockFormBuscaService,
      'formEstaValido',
      'get'
    ).and.returnValue(false);

    component.buscar();

    expect(window.alert).toHaveBeenCalledWith(
      'formulário precisa ser preenchido'
    );
    expect(component.realizarBusca.emit).not.toHaveBeenCalled();
  });

  it('should call service methods for interactions', () => {
    // Sync button interaction
    const syncBtn = fixture.nativeElement.querySelector(
      'button[mat-icon-button]'
    );
    syncBtn.click();
    expect(mockFormBuscaService.trocarOrigemDestino).toHaveBeenCalled();

    // Chip click interaction
    const chips = fixture.nativeElement.querySelectorAll('mat-chip');
    chips[0].click();
    expect(mockFormBuscaService.openDialog).toHaveBeenCalled();
  });

  it('should render two dropdown-uf components for origin and destination', () => {
    const dropdowns = fixture.debugElement.queryAll(By.css('app-dropdown-uf'));
    expect(dropdowns.length)
      .withContext('Should contain 2 dropdown components')
      .toBe(2);
  });

  it('should display the passenger description text returned by the service', () => {
    // Service mock returns '1 adulto'
    fixture.detectChanges();
    const chips: HTMLElement[] =
      fixture.nativeElement.querySelectorAll('mat-chip .inner');
    const passengerText = Array.from(chips).some((chip) =>
      chip.textContent?.includes('1 adulto')
    );
    expect(passengerText).toBeTrue();
  });

  it('should contain a primary button with text "BUSCAR"', () => {
    const button = fixture.nativeElement.querySelector(
      'button[color="primary"]'
    );
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('BUSCAR');
  });

  it('should trigger the "buscar" method when the form emits ngSubmit', () => {
    spyOn(component, 'buscar');
    const form = fixture.debugElement.query(By.css('form'));

    // Simulate the form submission event
    form.triggerEventHandler('ngSubmit', null);

    expect(component.buscar).toHaveBeenCalled();
  });

  it('should render datepicker toggles for both logic fields (Ida and Voltar)', () => {
    const datepickerToggles = fixture.debugElement.queryAll(
      By.css('mat-datepicker-toggle')
    );
    expect(datepickerToggles.length).toBe(2);
  });

  it('should bind the button toggle group to "somenteIda" control', () => {
    const buttonToggleGroup = fixture.debugElement.query(
      By.css('mat-button-toggle-group')
    );
    expect(buttonToggleGroup.attributes['formControlName']).toBe('somenteIda');
  });
});
