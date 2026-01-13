import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import {
  DadosParaBusca,
  Destaque,
  Passagem,
  ResultadoBuscaPassagem,
} from '../types/type';

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

  obterPassagensDestaques(passagem: Passagem[]): Destaque | undefined {
    if (!passagem.length) {
      return undefined;
    }

    let ordenadoPorTempo = [...passagem].sort(
      (a, b) => (a.tempoVoo ?? 0) - (b.tempoVoo ?? 0)
    );

    let ordenadoPorPreco = [...passagem].sort(
      (a, b) => (a.total ?? 0) - (b.total ?? 0)
    );

    let maisRapida = ordenadoPorTempo[0];
    let maisBarata = ordenadoPorPreco[0];

    let ordenadoPorMedia = [...passagem].sort((a, b) => {
      let pontuacaoA =
        ((a.tempoVoo ?? 0) / (maisBarata.tempoVoo ?? 0) +
          (a.total ?? 0) / (maisBarata.total ?? 0)) /
        2;
      let pontuacaoB =
        ((b.tempoVoo ?? 0) / (maisBarata.tempoVoo ?? 0) +
          (b.total ?? 0) / (maisBarata.total ?? 0)) /
        2;
      return pontuacaoA - pontuacaoB;
    });

    let sugerida = ordenadoPorMedia[0];

    return { maisRapida, maisBarata, sugerida };
  }
}
