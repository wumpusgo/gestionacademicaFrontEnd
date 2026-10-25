import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5201/api/User';

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching all users', error);
        return throwError(() => error);
      })
    );
  }

  getByEstudianteId(id: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/estudiante/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching user by Estudiante', error);
        return throwError(() => error);
      })
    );
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching user with id ${id}`, error);
        return throwError(() => error);
      })
    );
  }

  create(dto: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, dto).pipe(
      catchError(error => {
        console.error('Error creating user', error);
        return throwError(() => error);
      })
    );
  }

  update(dto: User): Observable<User> {
    return this.http.put<User>(this.apiUrl, dto).pipe(
      catchError(error => {
        console.error('Error updating user', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting user with id ${id}`, error);
        return throwError(() => error);
      })
    );
  }
}