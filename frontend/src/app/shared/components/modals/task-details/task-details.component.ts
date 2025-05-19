import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-details',
  imports: [ModalComponent,CommonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
  providers:[DatePipe]
})
export class TaskDetailsComponent {
@Input() task: any; 
  @Input() isOpen: boolean = false; 
   @Input() users: any[] = [];
  @Output() onClose = new EventEmitter<void>(); 


  constructor(private datePipe: DatePipe) {}

  formatDate(date: string): string | null {
    return this.datePipe.transform(date, 'd MMM yyyy');
  }

  onCloseModal(): void {
    this.onClose.emit(); 
  }
}
