import { Component, OnInit } from '@angular/core';
import { PassagensService } from 'src/app/core/services/passagens.service';
import { ResultadoBuscaPassagem, Passagem } from '../../core/types/type';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss',
  standalone: false,
})
export class BuscaComponent implements OnInit {
  listaPassagens: Passagem[] = [];

  constructor(private passagensService: PassagensService) {}

  ngOnInit(): void {
    const buscaPadrao = {
      data: new Date().toISOString,
      pagina: 1,
      porPagina: 25,
      somenteIda: false,
      passageirosAdultos: 1,
      tipo: 'Executiva',
    };

    this.passagensService.getPassagens(buscaPadrao).subscribe((resposta) => {
      console.log(resposta);
      this.listaPassagens = resposta.resultado;
      console.log(this.listaPassagens);
    });
  }
}
