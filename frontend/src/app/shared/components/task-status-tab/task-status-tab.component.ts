import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
interface Tab {
  label: string;
  count: number;
}
@Component({
  selector: 'app-task-status-tab',
  imports: [MatBadgeModule,
    MatButtonModule,CommonModule],
  templateUrl: './task-status-tab.component.html',
  styleUrl: './task-status-tab.component.scss'
})
export class TaskStatusTabComponent {
  @Input() tabs: Tab[] = [];
  @Input() activeTab: string = '';
 
  // Emit a string event
  @Output() tabChange: EventEmitter<string> = new EventEmitter<string>();

  // Method to change the active tab and emit the change
  setActiveTab(tab: string): void {
    this.tabChange.emit(tab); // Emit the tab label as a string
  }
}
