import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {
  private user: any = null;

  constructor() {
    // Set user data (from localStorage or session)
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  getUser() {
    return this.user;

  }
}
