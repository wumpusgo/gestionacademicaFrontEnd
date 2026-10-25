import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5201/api/Auth/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(user: User) {
    return this.http.post<any>(this.apiUrl, user).pipe(
      tap(response => {
        if (response.token) {
          console.log(response)
          sessionStorage.setItem('auth_token', response.token);
          sessionStorage.setItem('user_id', response.user.id);
          sessionStorage.setItem('username', response.user.userName);
        }
      })
    );
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('auth_token');
    return !!token;
  }

  getToken() {
    return sessionStorage.getItem('auth_token');
  }

  getUsername(): string | null {
    return sessionStorage.getItem('username');
  }

  getUserId(): string | null {
    return sessionStorage.getItem('user_id');
  }

  logout() {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      this.http.get('http://localhost:5201/api/Auth/logout?userId=' + userId).subscribe(() => {
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('user_id');
      });
    } else {
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('user_id');
    }

    this.router.navigate(['/login']);
  }

}
