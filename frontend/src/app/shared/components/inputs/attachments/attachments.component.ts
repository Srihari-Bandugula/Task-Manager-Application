import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-attachments',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AttachmentsComponent),
      multi: true,
    },
  ],
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.scss',
})
export class AttachmentsComponent implements ControlValueAccessor {
  @Input() link!: string; // New input for individual link
  @Input() index!: number; // Index for identifying the link
  @Output() clicked = new EventEmitter<string>(); // Emit event on click

  attachments: string[] = [];
  option: string = '';

  // Form callbacks
  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string[]): void {
    this.attachments = value || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleAddOption() {
    if (this.option.trim()) {
      this.attachments = [...this.attachments, this.option.trim()];
      this.option = '';
      this.onChange(this.attachments); // Notify form control about the change
      this.onTouched(); // Mark the field as touched
    }
  }

  handleDeleteOption(index: number) {
    this.attachments = this.attachments.filter((_, i) => i !== index);
    this.onChange(this.attachments); // Notify form control about the change
    this.onTouched(); // Mark the field as touched
  }

  // Trigger click event
  onLinkClick(link: string) {
    if (link) {
      this.clicked.emit(link);
    }
  }
}
