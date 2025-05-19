import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
} from '@angular/forms';

export interface TodoItem {
  id: number; // Unique identifier
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TodoListComponent),
      multi: true,
    },
  ],
})
export class TodoListComponent implements ControlValueAccessor {
  @Input() todoList: TodoItem[] = [];
  @Output() todoListChange = new EventEmitter<{
    updatedChecklist: TodoItem[];
    status: string;
  }>();

  // Mode inputs
  @Input() creationMode: boolean = false;
  @Input() completionMode: boolean = false;
  @Input() task: any;
  @Input() id: any;

  option: string = '';

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (Array.isArray(value)) {
      this.todoList = value;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  handleAddOption(): void {
    const trimmed = this.option.trim();
    if (trimmed) {
      const newItem: TodoItem = {
        id:
          this.todoList.length > 0
            ? this.todoList[this.todoList.length - 1].id + 1
            : 1, // Generate a unique ID
        text: trimmed,
        completed: false,
      };
      this.todoList = [...this.todoList, newItem]; // Create a new array to trigger change detection
      this.option = '';
      this.emitChanges();
    }
  }

  handleDeleteOption(index: number): void {
    this.todoList.splice(index, 1);
    this.todoList = [...this.todoList]; // Create a new array to trigger change detection
    this.emitChanges();
  }

  toggleCompletion(index: number, item: TodoItem): void {
    if (!this.completionMode) return;
    const updatedItem = { ...item, completed: !item.completed };
    this.todoList[index] = updatedItem;
    this.todoList = [...this.todoList];

    this.emitChanges();
  }
  private emitChanges(): void {
    const status = this.todoList.every((item) => item.completed)
      ? 'Completed'
      : 'In Progress';
    this.onChange(this.todoList);
    this.todoListChange.emit({
      updatedChecklist: this.todoList,
      status: status,
    });
    this.onTouched();
  }

  trackById(index: number, item: TodoItem): number {
    return item.id; // Using 'id' as unique key for tracking
  }
}
