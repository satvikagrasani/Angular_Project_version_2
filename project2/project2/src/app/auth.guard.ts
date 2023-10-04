// Import necessary modules and services
import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  // Implement canActivate method to guard routes
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkUserAuthentication();
  }

  // Implement canActivateChild method to guard child routes
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkUserAuthentication();
  }

  // Private method to check user authentication
  private checkUserAuthentication(): boolean {
    if (this.authService.isAuthenticatedUser()) {
      // If user is authenticated, allow access
      return true;
    } else {
      // If user is not authenticated, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
