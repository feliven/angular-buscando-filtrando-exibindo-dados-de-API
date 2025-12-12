import { Component, Input } from '@angular/core';
import { Passagem } from '../../../core/types/type';

@Component({
  selector: 'app-passagem',

  templateUrl: './passagem.component.html',
  styleUrl: './passagem.component.scss',
  standalone: false,
})
export class PassagemComponent {
  @Input() passagem!: Passagem;

  textoIdaVolta = '';
}
