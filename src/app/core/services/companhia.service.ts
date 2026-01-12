import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Companhia } from '../../core/types/type';

@Injectable({
  providedIn: 'root',
})
export class CompanhiaService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  listar(): Observable<Companhia[]> {
    return this.httpClient.get<Companhia[]>(`${this.apiUrl}/companhias`);
  }
}
