import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [ MatTableModule,
    MatBadgeModule,
    MatSortModule,
    MatIconModule,CommonModule
    ],
    providers: [DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Input() tableData: any[] = [];

  displayedColumns: string[] = ['title', 'status', 'priority', 'createdAt'];

  constructor(private datePipe: DatePipe) {}

getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'Completed':
      return 'status-badge-completed';
    case 'Pending':
      return 'status-badge-pending';
    case 'In Progress':
      return 'status-badge-in-progress';
    default:
      return 'status-badge-default';
  }
}
getPriorityBadgeClass(priority: string): string {
  switch (priority) {
    case 'High':
      return 'priority-badge-high';
    case 'Medium':
      return 'priority-badge-medium';
    case 'Low':
      return 'priority-badge-low';
    default:
      return 'priority-badge-default';
  }
}


  formatDate(date: string | null): string {
    return date ? this.datePipe.transform(date, 'd MMM yyyy') ?? 'N/A' : 'N/A';
  }
  
}
