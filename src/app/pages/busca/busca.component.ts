import { Component, OnInit } from '@angular/core';
import { PassagensService } from 'src/app/core/services/passagens.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss',
  standalone: false,
})
export class BuscaComponent implements OnInit {
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

    this.passagensService
      .getPassagens(buscaPadrao)
      .subscribe((resposta) => console.log(resposta));
  }
}
