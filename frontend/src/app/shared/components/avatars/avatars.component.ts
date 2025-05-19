import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-avatars',
  imports: [ AvatarModule, AvatarGroupModule,CommonModule,TooltipModule,MatIconModule],
  templateUrl: './avatars.component.html',
  styleUrl: './avatars.component.scss'
})
export class AvatarsComponent {

  @Input() avatars: { profileImageUrl: string; name: string }[] = [];
  @Input() maxVisible: number = 3;
  
    getInitials(name: string): string {
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    return initials || '?'; // If no initials, fallback to '?'
  }
}
