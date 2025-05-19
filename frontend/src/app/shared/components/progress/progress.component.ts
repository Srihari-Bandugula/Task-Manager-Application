import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-progress',
  imports: [MatProgressBarModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent {
  @Input() progress: number = 0;
  @Input() status: 'In Progress' | 'Completed' | 'Pending' = 'Pending';

  get colorClass(): string {
    switch (this.status) {
      case 'In Progress':
        return 'accent';
      case 'Completed':
        return 'primary';
      default:
        return 'warn';
    }
  }
}
