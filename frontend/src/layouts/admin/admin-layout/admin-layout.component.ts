import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService } from '../../../authentication/auth-service/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet,MatIconModule,MatToolbarModule,MatButtonModule,MatCardModule,CommonModule,MatChipsModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  showProfile = false;
  userData: any; // Store user data (name, email, role)
  isImageEnlarged = false; // Toggle image enlargement


  constructor(private router: Router,private authService: AuthService) {}

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }
      toggleImageSize() {
    this.isImageEnlarged = !this.isImageEnlarged;  // Toggle between enlarged and normal size
  }

  navigate(path: string) {
    this.router.navigate(['admin', path]);
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
  logout(){
    this.authService.logout()
  }
}
