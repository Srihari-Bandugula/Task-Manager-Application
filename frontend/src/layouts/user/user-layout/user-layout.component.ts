import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../authentication/auth-service/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet,MatIconModule,MatToolbarModule,MatButtonModule,MatCardModule,CommonModule,MatChipsModule],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {
  showProfile = false;
  userData: any; // Store user data (name, email, role)
  isImageEnlarged = false; // Toggle image enlargement

  constructor(private router: Router, private authService: AuthService) {}

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }
    toggleImageSize() {
    this.isImageEnlarged = !this.isImageEnlarged;  // Toggle between enlarged and normal size
  }

  navigate(path: string) {
    this.router.navigate(['user', path]);
  }

  ngOnInit(): void {
    // Fetch the user profile data
    this.authService.getUserProfile().subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
