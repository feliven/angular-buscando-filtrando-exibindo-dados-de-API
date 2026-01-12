import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { DadosParaBusca, ResultadoBuscaPassagem } from '../types/type';

@Injectable({
  providedIn: 'root',
})
export class PassagensService {
  enderecoURL: string = environment.apiUrl;
  precoMin!: number;
  precoMax!: number;

  constructor(private httpClient: HttpClient) {}

  getPassagens(search: DadosParaBusca): Observable<ResultadoBuscaPassagem> {
    const params = this.converterParametroParaString(search);
    const observableResultadoBusca =
      this.httpClient.get<ResultadoBuscaPassagem>(
        this.enderecoURL + '/passagem/search?' + params
      );
    observableResultadoBusca.pipe(take(1)).subscribe((resultado) => {
      this.precoMin = resultado.precoMin;
      this.precoMax = resultado.precoMax;
    });

    return observableResultadoBusca;
  }

  converterParametroParaString(dadosParaBusca: DadosParaBusca) {
    const query = Object.entries(dadosParaBusca)
      .map(([key, value]) => {
        if (!value) return;
        return `${key}=${value}`;
      })
      .join('&');

    return query;
  }
}
