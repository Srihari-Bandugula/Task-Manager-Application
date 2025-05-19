import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { TaskCardComponent } from '../../../app/shared/components/cards/task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../app/shared/components/modal/modal.component';
import { TaskStatusTabComponent } from '../../../app/shared/components/task-status-tab/task-status-tab.component';
import { AlertforDeleteComponent } from '../../../app/shared/components/alertfor-delete/alertfor-delete.component';
import { ShareTaskComponent } from '../../../app/shared/components/modals/share-task/share-task.component';
import { TaskDetailsComponent } from '../../../app/shared/components/modals/task-details/task-details.component';
import { FileSpreadsheet, LucideAngularModule, Search, SearchIcon } from 'lucide-angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
interface Task {
  _id: string;                 // Add this missing property
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'In Progress' | 'Completed' | 'Pending';
  progress: number;               // Add this property
  createdAt: string;
  dueDate: string;
  assignedTo: string[];
  attachmentCount: number;        // Add this property
  completedTodoCount: number;     // Add this property
  todoChecklist: any[];           // Add this property
}


interface User {
  _id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  avatarUrl?: string;
  profileImageUrl: string;
}
@Component({
  selector: 'app-manage-tasks',
  imports: [TaskCardComponent,
    TaskStatusTabComponent,
    ShareTaskComponent,
    TaskDetailsComponent,
    ModalComponent,
    AlertforDeleteComponent,
    FormsModule,
    CommonModule,LucideAngularModule,MatDatepickerModule,MatFormFieldModule,MatInputModule,MatNativeDateModule],
  templateUrl: './manage-tasks.component.html',
  styleUrl: './manage-tasks.component.scss'
})
export class ManageTasksComponent  implements OnInit {
  allTasks: Task[] = [];
  filteredTasks: Task[] = [];
  tabs: any[] = [];
  filterStatus: string = 'All';
  searchQuery: string = '';


  startDate: string = ''; // Start date filter property
  endDate: string = '';   // End date filter property
  tasks: Task[] = [];
  users: User[] = [];

  shareModalOpen = false;
  selectedTaskId: string | null = null;

  selectedTaskDetails: Task | null = null;
  detailsModalOpen = false;
  openDeleteAlert = false;
  taskToDelete: string | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getAllTasks();
    this.fetchUsersAndTasks();
  }

  getAllTasks(): void {
    this.http.get<any>("http://localhost:8000/api/tasks", {
      params: { status: this.filterStatus === 'All' ? '' : this.filterStatus }
    }).subscribe({
      next: (response) => {
        this.allTasks = response?.tasks || [];
        const statusSummary = response?.statusSummary || {};
        this.tabs = [
          { label: 'All', count: statusSummary.all || 0 },
          { label: 'Pending', count: statusSummary.pendingTasks || 0 },
          { label: 'In Progress', count: statusSummary.inProgressTasks || 0 },
          { label: 'Completed', count: statusSummary.completedTasks || 0 },
        ];
        //  Filter tasks whenever tasks or filter conditions change
        this.filterTasks();
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      }
    });
  }

  fetchUsersAndTasks(): void {
  this.http.get<User[]>('http://localhost:8000/api/users').subscribe(users => this.users = users);
  this.http.get<Task[]>('http://localhost:8000/api/tasks').subscribe(tasks => this.tasks = tasks);
}


 // Updated filterTasks to filter by search query and date range (start date to end date)
  filterTasks(): void {
    this.filteredTasks = this.allTasks.filter(task => {
      const searchMatch =
        task.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchQuery.toLowerCase());

      // Compare the task's dueDate with the selected start and end date range
      const dateMatch =
        (this.startDate && new Date(task.dueDate) >= new Date(this.startDate)) &&  // Task dueDate is after start date
        (this.endDate && new Date(task.dueDate) <= new Date(this.endDate)) ||        // Task dueDate is before or on end date
        (!this.startDate && !this.endDate);  // If no date range, include all tasks

      return searchMatch && dateMatch;
    });
  }

  setFilterStatus(status: string): void {
    this.filterStatus = status;
    this.getAllTasks();
  }

 

  editTask(task: Task) {
  if (!task?._id) {
    console.error('Task ID is undefined. Cannot navigate to edit page.');
    return;
  }
  this.router.navigate(['/admin/edit-task', task._id]);
}

  shareTask(taskId: string): void {
    this.selectedTaskId = taskId;
    this.shareModalOpen = true;
  
  }

  closeShareModal(): void {
    this.shareModalOpen = false;
    this.selectedTaskId = null;
  }

  viewTaskDetails(task: Task): void {
    this.selectedTaskDetails = task;
    this.detailsModalOpen = true;
  }

  deleteTask(taskId: string): void {
    this.taskToDelete = taskId;
    this.openDeleteAlert = true;
  }

  confirmDelete(): void {
    if (this.taskToDelete) {
      this.http.delete(`http://localhost:8000/api/tasks/${this.taskToDelete}`).subscribe({
        next: () => {
          this.toastr.success('Task deleted successfully');
          this.getAllTasks();
        },
        error: () => {
          this.toastr.error('Failed to delete the task.');
        }
      });
      this.openDeleteAlert = false;
    }
  }
}