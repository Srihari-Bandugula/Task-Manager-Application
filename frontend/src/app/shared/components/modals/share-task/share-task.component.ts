import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../../modal/modal.component';
import { SelectUsersComponent } from '../../inputs/select-users/select-users.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-share-task',
  imports: [ModalComponent,SelectUsersComponent,CommonModule],
  templateUrl: './share-task.component.html',
  styleUrl: './share-task.component.scss'
})
export class ShareTaskComponent {
  @Input() taskId: string | null = null;
  @Input() isOpen: boolean = false;
  @Input() users: any[] = [];
  @Output() onClose = new EventEmitter<void>();
  selectedUserId: string[] = [];

  constructor(private http: HttpClient, private toastr: ToastrService,private router:Router) {}

  handleShare(): void {
    if (!this.taskId || this.selectedUserId.length === 0) { // Check if taskId is null
      this.toastr.error("Please select at least one user.");
      return;
    }
  
    const body = { userIdToShareWith: this.selectedUserId };    
    this.http.post(`http://localhost:8000/api/tasks/${this.taskId || ''}/share`, body).subscribe({ // Use fallback if taskId is null
      next: () => {
        this.toastr.success("Task shared successfully!");
        this.selectedUserId = [];
        this.onClose.emit();
        
      },
      error: (err) => {
        console.error("Error sharing task:", err);
        this.toastr.error("Failed to share task.");
      }
    });
  }
}
