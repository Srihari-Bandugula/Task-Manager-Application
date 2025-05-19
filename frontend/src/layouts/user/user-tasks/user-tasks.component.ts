import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskCardComponent } from '../../../app/shared/components/cards/task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { TasksService } from '../../../app/shared/services/tasks.service';
import { ModalComponent } from '../../../app/shared/components/modal/modal.component';
import { UserService } from '../../../app/shared/services/user.service';

@Component({
  selector: 'app-user-tasks',
  imports: [TaskCardComponent,CommonModule,ModalComponent],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.scss'
})
export class UserTasksComponent implements OnInit {
allTasks: any[] = [];
  tabs: { label: string, count: number }[] = [];
  filterStatus: string = 'All';
  users: any[] = [];

  selectedTaskDetails: any = null;
  detailsModalOpen = false;

  constructor(private tasksService: TasksService, private router: Router,private userService:UserService) {}

  ngOnInit(): void {
    this.getUserTasks();
  }

  getUserTasks(): void {
    this.tasksService.getUserTasks(this.filterStatus).subscribe(
      (response: any) => {
        this.allTasks = response.tasks || [];
        const statusSummary = response.statusSummary || {};
        this.tabs = [
          { label: 'All', count: statusSummary.all || 0 },
          { label: 'Pending', count: statusSummary.pendingTasks || 0 },
          { label: 'In Progress', count: statusSummary.inProgressTasks || 0 },
          { label: 'Completed', count: statusSummary.completedTasks || 0 },
        ];
      },
      (error) => {
        console.error('Error fetching user tasks:', error);
      }
    );
  }

  handleTabChange(tab: string): void {
    this.filterStatus = tab;
    this.getUserTasks();
  }

  handleTaskClick(taskId: string): void {
    this.router.navigate([`/user/task-details/${taskId}`]);
  }

  closeModal() {
    this.detailsModalOpen = false; // Close the modal
  }
}