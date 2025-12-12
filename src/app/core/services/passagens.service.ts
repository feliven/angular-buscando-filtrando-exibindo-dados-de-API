import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PassagensService {
  enderecoURL: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getPassagens(search: any) {
    const params = search;
    return this.httpClient.get(this.enderecoURL + '/passagem/search', {
      params,
    });
  }
}
