import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss',
  standalone: false,
})
export class LabelComponent {
  @Input() texto: string = '';
}
