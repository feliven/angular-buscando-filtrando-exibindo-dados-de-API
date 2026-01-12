import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { OpcaoDeParada } from '../../../../core/types/type';
import { FormBuscaService } from '../../../../core/services/form-busca.service';

@Component({
  selector: 'app-paradas',
  templateUrl: './paradas.component.html',
  styleUrl: './paradas.component.scss',
  standalone: false,
})
export class ParadasComponent implements OnInit {
  opcaoSelecionada: OpcaoDeParada | null = null;

  opcoes: OpcaoDeParada[] = [
    {
      display: 'Direto',
      value: '0',
    },
    {
      display: '1 conexão',
      value: '1',
    },
    {
      display: '2 conexões',
      value: '2',
    },
    {
      display: 'Mais de 2 conexões',
      value: '3',
    },
  ];

  conexoesControl!: FormControl<number | null>;

  constructor(private formBuscaService: FormBuscaService) {
    this.conexoesControl =
      this.formBuscaService.obterControle<number>('conexoes');
  }

  ngOnInit(): void {
    this.conexoesControl.valueChanges.subscribe((valor) => {
      if (!valor) {
        this.opcaoSelecionada = null;
      }
    });
  }

  alternarParada(opcao: OpcaoDeParada, checked: boolean) {
    if (!checked) {
      this.opcaoSelecionada = null;
      this.formBuscaService.formBusca.patchValue({
        conexoes: null,
      });
      return;
    }
    this.opcaoSelecionada = opcao;
    this.formBuscaService.formBusca.patchValue({
      conexoes: Number(opcao.value),
    });
  }
}
