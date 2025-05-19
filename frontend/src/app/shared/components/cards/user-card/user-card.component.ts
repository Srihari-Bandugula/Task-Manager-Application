import { Component, Input } from '@angular/core';
import { StatusCardComponent } from '../status-card/status-card.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user-card',
  imports: [StatusCardComponent,CommonModule,MatIcon],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() userInfo: any;
}
