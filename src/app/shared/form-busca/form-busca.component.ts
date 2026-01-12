import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';
import { DadosParaBusca } from '../../core/types/type';

@Component({
  selector: 'app-form-busca',
  templateUrl: './form-busca.component.html',
  styleUrls: ['./form-busca.component.scss'],
  standalone: false,
})
export class FormBuscaComponent {
  @Output() realizarBusca = new EventEmitter<DadosParaBusca>();

  constructor(public formBuscaService: FormBuscaService) {}

  buscar() {
    if (this.formBuscaService.formEstaValido) {
      const formBuscaValue = this.formBuscaService.obterDadosParaBusca();
      this.realizarBusca.emit(formBuscaValue);
    } else {
      alert('formulário precisa ser preenchido');
    }
  }
}
