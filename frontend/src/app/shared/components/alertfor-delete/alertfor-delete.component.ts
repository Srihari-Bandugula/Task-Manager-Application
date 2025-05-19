import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alertfor-delete',
  imports: [],
  templateUrl: './alertfor-delete.component.html',
  styleUrl: './alertfor-delete.component.scss'
})
export class AlertforDeleteComponent {
  @Input() content: string = '';
  @Output() onDelete = new EventEmitter<void>();

  handleDelete() {
    this.onDelete.emit();
  }
}
