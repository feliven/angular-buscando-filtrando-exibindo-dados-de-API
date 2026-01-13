import { Component, Input } from '@angular/core';
import { Passagem } from '../../../../core/types/type';

@Component({
  selector: 'app-passagem-destaque',
  templateUrl: './passagem-destaque.component.html',
  styleUrl: './passagem-destaque.component.scss',
  standalone: false,
})
export class PassagemDestaqueComponent {
  @Input() destacadaPor: string = '';
  @Input() passagem?: Passagem;
  @Input() variant: 'primary' | 'secondary' | 'default' = 'primary';
}
