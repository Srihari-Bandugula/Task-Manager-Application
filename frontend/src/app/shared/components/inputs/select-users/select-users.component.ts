import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from '../../modal/modal.component';
import { AvatarsComponent } from '../../avatars/avatars.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-users',
  imports: [
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    ModalComponent,
    AvatarsComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectUsersComponent),
      multi: true,
    },
  ],
  templateUrl: './select-users.component.html',
  styleUrl: './select-users.component.scss',
})
export class SelectUsersComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @Input() selectedUsers: string[] = [];
  @Output() selectedUsersChange = new EventEmitter<string[]>();

  allUsers: any[] = [];
  isModalOpen = false;
  tempSelectedUsers: string[] = [];
  onChange: any;
  onTouched: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUsers'] && !changes['selectedUsers'].firstChange) {
      this.tempSelectedUsers = [...this.selectedUsers];
    }
  }

  getAllUsers(): void {
    this.http.get<any[]>('http://localhost:8000/api/users').subscribe(
      (response) => {
        this.allUsers = response.filter((user) => user.role=== 'member');
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  toggleUserSelection(userId: string): void {
    const index = this.tempSelectedUsers.indexOf(userId);
    if (index === -1) {
      this.tempSelectedUsers.push(userId);
    } else {
      this.tempSelectedUsers.splice(index, 1);
    }
  }

  handleAssign(): void {
    this.selectedUsers = [...this.tempSelectedUsers];
    this.selectedUsersChange.emit(this.selectedUsers);
    if (this.onChange) this.onChange(this.selectedUsers); // <-- This is needed
    if (this.onTouched) this.onTouched(); // Good UX
    this.isModalOpen = false;
  }

  getSelectedUserAvatars(): { profileImageUrl: string; name: string }[] {
    return this.allUsers
      .filter((user) => this.selectedUsers.includes(user._id))
      .map((user) => ({
        profileImageUrl: user.profileImageUrl,
        name: user.name,
      }));
  }

  writeValue(value: string[]): void {
    this.selectedUsers = value || [];
    this.tempSelectedUsers = [...this.selectedUsers];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
