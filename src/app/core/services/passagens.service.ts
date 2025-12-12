import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResultadoBuscaPassagem } from '../types/type';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class PassagensService {
  enderecoURL: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getPassagens(search: any): Observable<ResultadoBuscaPassagem> {
    const params = search;
    return this.httpClient.get<ResultadoBuscaPassagem>(
      this.enderecoURL + '/passagem/search',
      {
        params,
      }
    );
  }
}
