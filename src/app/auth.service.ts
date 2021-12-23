import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}
  helper = new JwtHelperService();
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }

  getLoggedInUser() {
    let token = this.getToken();
    if (token) {
      const user = this.helper.decodeToken(token);
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    let token = this.getToken();
    if (token) {
      return true;
    }
    return false;
  }
}
