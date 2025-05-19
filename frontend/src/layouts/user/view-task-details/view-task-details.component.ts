import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../../app/shared/services/tasks.service';
import { CommonModule, DatePipe } from '@angular/common';
import { AttachmentsComponent } from '../../../app/shared/components/inputs/attachments/attachments.component';
import { TodoListComponent } from '../../../app/shared/components/inputs/todo-list/todo-list.component';
import { AvatarsComponent } from '../../../app/shared/components/avatars/avatars.component';

import { HttpClient } from '@angular/common/http';
import { TodoItem } from '../../../app/shared/components/inputs/todo-list/todo-list.component';
import { InfoCardComponent } from '../../../app/shared/components/cards/info-card/info-card.component';
// interface TodoItem {
//   text: string;
//   completed: boolean;
// }

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  assignedTo: any[];
  todoChecklist: TodoItem[];
  attachments: string[];
}

@Component({
  selector: 'app-view-task-details',
  imports: [
    CommonModule,
    AttachmentsComponent,
    TodoListComponent,
    AvatarsComponent,
    InfoCardComponent,
  ],
  templateUrl: './view-task-details.component.html',
  styleUrl: './view-task-details.component.scss',
  providers: [DatePipe],
})
export class ViewTaskDetailsComponent implements OnInit {
  task: Task | null = null;
  assignedAvatars: { profileImageUrl: string; name: string }[] = [];

  id: string | null = null;
  infoCard:boolean=false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getTaskDetailsById(this.id);
    }
  }

  getTaskDetailsById(id: string) {
    this.http.get<Task>(`http://localhost:8000/api/tasks/${id}`).subscribe({
      next: (data) => {
        this.task = data;
        if (this.task?.assignedTo) {
          this.assignedAvatars = this.task.assignedTo.map((user) => ({
            profileImageUrl: user.profileImageUrl,
            name: user.name,
          }));
        }
      },
      error: (err) => console.error('Error fetching task details:', err),
    });
  }

  onChecklistChanged({
    updatedChecklist,
  }: {
    updatedChecklist: TodoItem[];
    status: string;
  }) {
    if (!this.task) return;

    this.http
      .put<any>(`http://localhost:8000/api/tasks/${this.id}/todo`, {
        todoChecklist: updatedChecklist,
      })
      .subscribe({
        next: (res) => {
          this.task = res.task || this.task;
        },
        error: () => {
          console.error('Error updating checklist');
        },
      });
  }

  getStatusTagColor(status: string) {
    switch (status) {
      case 'In Progress':
        return 'text-cyan-500 bg-cyan-50 border border-cyan-500/10';
      case 'Completed':
        return 'text-lime-500 bg-lime-50 border border-lime-500/10';
      default:
        return 'text-violet-500 bg-violet-50 border border-violet-500/10';
    }
  }

  handleLinkClick(link: string): void {
    if (!/^https?:\/\//i.test(link)) {
      link = 'https://' + link;
    }
    window.open(link, '_blank');
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'd MMM yyyy') || 'N/A';
  }
}
