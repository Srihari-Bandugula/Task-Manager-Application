import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  imports: [CommonModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss'
})
export class InfoCardComponent {
  @Input() value: string = '';
  @Input() label: string = '';
  @Input() color: string = 'bg-gray-100'; 

  @Input() infoCard:boolean=true;
}
