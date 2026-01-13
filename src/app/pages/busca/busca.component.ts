import { Component, OnInit } from '@angular/core';
import { PassagensService } from 'src/app/core/services/passagens.service';
import { Passagem, DadosParaBusca, Destaque } from '../../core/types/type';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss',
  standalone: false,
})
export class BuscaComponent implements OnInit {
  listaPassagens: Passagem[] = [];
  destaques?: Destaque;

  constructor(
    private passagensService: PassagensService,
    private formBuscaService: FormBuscaService
  ) {}

  ngOnInit(): void {
    const buscaPadrao: DadosParaBusca = {
      dataIda: new Date().toISOString(),
      pagina: 1,
      porPagina: 25,
      somenteIda: true,
      passageirosAdultos: 1,
      tipo: 'Econômica',
      origemId: 9,
      destinoId: 15,
    };

    const busca = this.formBuscaService.formEstaValido
      ? this.formBuscaService.obterDadosParaBusca()
      : buscaPadrao;

    this.passagensService
      .getPassagens(busca)
      .pipe(take(1))
      .subscribe((resposta) => {
        console.log(resposta);
        this.listaPassagens = resposta.resultado;
        console.log(this.listaPassagens);

        this.formBuscaService.formBusca.patchValue({
          precoMin: resposta.precoMin,
          precoMax: resposta.precoMax,
        });

        this.obterDestaques();
      });
  }

  busca(evento: DadosParaBusca) {
    this.passagensService.getPassagens(evento).subscribe((resposta) => {
      console.log(resposta);

      this.listaPassagens = resposta.resultado;
      console.log(this.listaPassagens);

      this.obterDestaques();
    });
  }

  obterDestaques() {
    this.destaques = this.passagensService.obterPassagensDestaques(
      this.listaPassagens
    );
  }
}
