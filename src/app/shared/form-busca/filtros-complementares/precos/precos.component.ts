import { Component } from '@angular/core';

@Component({
  selector: 'app-precos',
  templateUrl: './precos.component.html',
  styleUrl: './precos.component.scss',
  standalone: false,
})
export class PrecosComponent {
  precoMin?: number = 0;
  precoMax?: number = 5000;
}
