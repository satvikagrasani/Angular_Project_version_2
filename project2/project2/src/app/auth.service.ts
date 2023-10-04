// authentication.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isAuthenticated = false;

  // Simulate login
  login() {
    this.isAuthenticated = true;
  }

  // Simulate logout
  logout() {
    this.isAuthenticated = false;
  }

  // Check if the user is authenticated
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
