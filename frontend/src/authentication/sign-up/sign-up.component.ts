import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signupForm: FormGroup;
  hidePassword = true;
  imageUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      adminInviteToken: [''],
      profilePicture: [''],
    });
  }

  get name() {
    return this.signupForm.get('name')!;
  }

  get email() {
    return this.signupForm.get('email')!;
  }

  get password() {
    return this.signupForm.get('password')!;
  }

  onImageSelect(event: any) {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('image', file);

    this.authService.uploadImage(formData).subscribe({
      next: (res: any) => {
        // Backend sends back the filename, which is used to construct the URL
        this.imageUrl = `http://localhost:8000/uploads/${res.filename}`;
        this.signupForm.patchValue({ profilePicture: this.imageUrl });
      },
      error: (err) => {
        console.error('Image upload failed:', err);
        alert('Image upload failed.');
      }
    });
  }
}


onSubmit() {
  if (this.signupForm.valid) {
    const formData = this.signupForm.value;
    formData.profileImageUrl = this.imageUrl; // Add the image URL to form data

    this.authService.registerUser(formData).subscribe({
      next: (res) => {
        const { token, role } = res;

        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(res));

          if (role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/user/dashboard']);
          }
        }
      },
      error: (err) => {
        console.error('Signup error:', err);
        alert(err.error?.message || 'Signup failed.');
      }
    });
  }
}

}
