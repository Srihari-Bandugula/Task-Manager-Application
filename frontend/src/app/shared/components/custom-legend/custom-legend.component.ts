import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-legend',
  imports: [CommonModule],
  templateUrl: './custom-legend.component.html',
  styleUrl: './custom-legend.component.scss'
})
export class CustomLegendComponent {
  @Input() payload: { color: string, value: string }[] = [];
}
