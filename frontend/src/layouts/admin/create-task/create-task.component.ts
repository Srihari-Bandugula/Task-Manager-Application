import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../../../app/shared/services/tasks.service';
import { SelectDropdownComponent } from '../../../app/shared/components/inputs/select-dropdown/select-dropdown.component';
import { SelectUsersComponent } from '../../../app/shared/components/inputs/select-users/select-users.component';
import { TodoListComponent } from '../../../app/shared/components/inputs/todo-list/todo-list.component';
import { AttachmentsComponent } from '../../../app/shared/components/inputs/attachments/attachments.component';
import { CommonModule } from '@angular/common';

interface SelectDropDownOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-create-task',
  imports: [SelectDropdownComponent, SelectUsersComponent, TodoListComponent, AttachmentsComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  PriorityData: SelectDropDownOption[] = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' }
  ];
  taskForm: FormGroup;
  taskId: string | null;
  error: string = '';
  loading: boolean = false;
  priorityOptions: SelectDropDownOption[] = this.PriorityData;
  currentTask: any;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['Low', [Validators.required]],
      dueDate: [null, [Validators.required]],
      assignedTo: [[], [Validators.required]],
      todoChecklist: [[], [Validators.required]],
      attachments: [[]]
    });
    this.taskId = this.route.snapshot.paramMap.get('taskId');
  }

  ngOnInit(): void {
    if (this.taskId) {
      this.getTaskDetailsById();
    } else {
      this.currentTask = null;
    }
  }

  getTaskDetailsById(): void {
    this.loading = true;
    this.tasksService.getTaskById(this.taskId!).subscribe(
      (task) => {
        this.currentTask = task;

        const dueDate = new Date(task.dueDate);
        const formattedDate = dueDate.toISOString().split('T')[0];

        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          priority: task.priority,
          dueDate: formattedDate,
          assignedTo: task.assignedTo.map((user: any) => user._id),
          todoChecklist: task.todoChecklist,
          attachments: task.attachments
        });

        this.loading = false;
      },
      (error) => {
        this.toastr.error('Error fetching task details');
        this.loading = false;
      }
    );
  }

  handleSubmit(): void {
    if (this.taskForm.invalid) {
      this.error = 'Please fill all required fields';
      return;
    } else {
      this.error = '';
    }

    if (this.loading) {
      return;
    }

    this.loading = true;
    const taskData = this.taskForm.value;

    const taskPayload = {
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      dueDate: new Date(taskData.dueDate).toISOString(),
      assignedTo: taskData.assignedTo || [],
      todoChecklist: taskData.todoChecklist || [],
      attachments: taskData.attachments || []
    };

    if (this.taskId) {
      this.updateTask(taskPayload);
    } else {
      this.createTask(taskPayload);
    }
  }

  createTask(taskPayload: any): void {
    this.tasksService.createTask(taskPayload).subscribe(
      () => {
        this.toastr.success('Task created successfully');
        this.router.navigate(['/admin/manage-tasks']);
      },
      (error) => {
        this.toastr.error('Error creating task');
        this.loading = false;  // Reset loading state
      }
    );
  }

  updateTask(taskPayload: any): void {
    this.tasksService.updateTask(this.taskId!, taskPayload).subscribe(
      () => {
        this.toastr.success('Task updated successfully');
        this.router.navigate(['/admin/manage-tasks']);
      },
      (error) => {
        this.toastr.error('Error updating task');
        this.loading = false;  // Reset loading state
      }
    );
  }
}
