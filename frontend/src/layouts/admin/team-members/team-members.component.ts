import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../app/shared/services/user.service';
import { UserCardComponent } from '../../../app/shared/components/cards/user-card/user-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-members',
  imports: [UserCardComponent,CommonModule],
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.scss'
})
export class TeamMembersComponent implements OnInit {
  allUsers: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.allUsers = users;
      },
      error: (err) => {
        console.error('Error fetching users', err);
      }
    });
  }

}