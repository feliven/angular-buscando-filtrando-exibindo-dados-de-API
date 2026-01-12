import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuscaService } from '../../../core/services/form-busca.service';

@Component({
  selector: 'app-filtros-complementares',
  templateUrl: './filtros-complementares.component.html',
  styleUrl: './filtros-complementares.component.scss',
  standalone: false,
})
export class FiltrosComplementaresComponent {
  @Output() realizarBusca = new EventEmitter();

  constructor(private formBuscaService: FormBuscaService) {}

  busca() {
    if (!this.formBuscaService.formEstaValido) {
      this.formBuscaService.formBusca.markAllAsTouched();
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      return;
    }

    const formBuscaValue = this.formBuscaService.obterDadosParaBusca();
    this.realizarBusca.emit(formBuscaValue);
  }
}
