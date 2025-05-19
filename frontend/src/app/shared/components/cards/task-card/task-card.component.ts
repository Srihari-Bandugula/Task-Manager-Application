import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ProgressComponent } from '../../progress/progress.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit,
  faShare,
  faTrash,
  faEllipsisH,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import { AvatarsComponent } from '../../avatars/avatars.component';
library.add(faEdit, faShare, faTrash, faEllipsisH, faPaperclip);

@Component({
  selector: 'app-task-card',
  imports: [
    CommonModule,
    ProgressComponent,
    FontAwesomeModule,
    AvatarsComponent,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() task!: {
    _id: string;
    title: string;
    description: string;
    priority: string;
    status: 'In Progress' | 'Completed' | 'Pending';
    progress: number;
    createdAt: string;
    dueDate: string;
    assignedTo: string[];
    attachmentCount: number;
    completedTodoCount: number;
    todoChecklist: any[];
  };
  @Input() users!: { _id: string; name: string; profileImageUrl: string }[];
  @Input() isAdmin: boolean = false;
  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() onShareClick = new EventEmitter<string>();
  @Output() onEditClick = new EventEmitter<any>();
  @Output() onDeleteClick = new EventEmitter<string>();

  menuOpen: boolean = false;

  faEdit = faEdit;
  faShare = faShare;
  faTrash = faTrash;
  faEllipsisH = faEllipsisH;
  faPaperclip = faPaperclip;

  constructor(private cdRef: ChangeDetectorRef) {}

  getStatusTagColor(): string {
    switch (this.task.status) {
      case 'In Progress':
        return 'status-in-progress';
      case 'Completed':
        return 'status-completed';
      default:
        return 'status-default';
    }
  }

  getPriorityTagColor(): string {
    switch (this.task.priority) {
      case 'Low':
        return 'priority-low';
      case 'Medium':
        return 'priority-medium';
      default:
        return 'priority-high';
    }
  }
  getTaskBorderClass(): string {
    switch (this.task.status) {
      case 'In Progress':
        return 'border-cyan';
      case 'Completed':
        return 'border-indigo';
      default:
        return 'border-violet';
    }
  }

  handleMenuToggle(event: MouseEvent): void {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }

  handleShareClick(event: MouseEvent): void {
    event.stopPropagation();
    this.onShareClick.emit(this.task._id);
    this.cdRef.markForCheck();
  }

  handleEditClick(event: MouseEvent): void {
    event.stopPropagation();
    this.onEditClick.emit(this.task);
  }

  handleDeleteClick(event: MouseEvent): void {
    event.stopPropagation();
    this.onDeleteClick.emit(this.task._id);
  }

  getAssignedUsers(assignedTo: string[]) {
    const assignedUsers = this.users.filter((user) =>
      assignedTo.includes(user._id)
    );
    return assignedUsers;
  }

  // Method to return an array of user _ids
  getAssignedToIds(task: any): string[] {
    return task.assignedTo.map((user: { _id: string }) => user._id);
  }
}
