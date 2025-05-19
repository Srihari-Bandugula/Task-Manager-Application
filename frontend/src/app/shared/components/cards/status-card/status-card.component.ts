import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-card',
  imports: [CommonModule],
  templateUrl: './status-card.component.html',
  styleUrl: './status-card.component.scss'
})
export class StatusCardComponent {
  @Input() label: string = '';
  @Input() count: number = 0;
  @Input() status: string = '';

getStatusTagColor(): string {
  switch (this.status) {
    case 'Pending':
      return 'status-pending';
    case 'In Progress':
      return 'status-in-progress';
    case 'Completed':
      return 'status-completed';
    default:
      return 'status-default';
  }
}

}
