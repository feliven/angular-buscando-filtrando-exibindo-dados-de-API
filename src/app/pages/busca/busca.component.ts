import { Component, OnInit } from '@angular/core';
import { PassagensService } from 'src/app/core/services/passagens.service';
import {
  ResultadoBuscaPassagem,
  Passagem,
  DadosParaBusca,
} from '../../core/types/type';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss',
  standalone: false,
})
export class BuscaComponent implements OnInit {
  listaPassagens: Passagem[] = [];

  constructor(
    private passagensService: PassagensService,
    private formBuscaService: FormBuscaService
  ) {}

  ngOnInit(): void {
    const buscaPadrao = {
      data: new Date().toISOString,
      pagina: 1,
      porPagina: 25,
      somenteIda: false,
      passageirosAdultos: 1,
      tipo: 'Executiva',
    };

    const busca = this.formBuscaService.formEstaValido
      ? this.formBuscaService.obterDadosParaBusca()
      : buscaPadrao;

    this.passagensService.getPassagens(busca).subscribe((resposta) => {
      console.log(resposta);
      this.listaPassagens = resposta.resultado;
      console.log(this.listaPassagens);
    });
  }

  busca(evento: DadosParaBusca) {
    this.passagensService.getPassagens(evento).subscribe((resposta) => {
      console.log(resposta);
      this.listaPassagens = resposta.resultado;
      console.log(this.listaPassagens);
    });
  }
}
