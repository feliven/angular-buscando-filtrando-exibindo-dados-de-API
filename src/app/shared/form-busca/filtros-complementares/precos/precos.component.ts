import { Component } from '@angular/core';

import { FormBuscaService } from '../../../../core/services/form-busca.service';
import { PassagensService } from '../../../../core/services/passagens.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-precos',
  templateUrl: './precos.component.html',
  styleUrl: './precos.component.scss',
  standalone: false,
})
export class PrecosComponent {
  precoMin: FormControl<number>;
  precoMax: FormControl<number>;

  constructor(
    public passagensService: PassagensService,
    private formBuscaService: FormBuscaService
  ) {
    this.precoMin = this.formBuscaService.obterControle<number>('precoMin');
    this.precoMax = this.formBuscaService.obterControle<number>('precoMax');
  }
}
