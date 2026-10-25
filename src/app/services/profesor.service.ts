import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Profesor } from '../models/profesor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiUrl = 'http://localhost:5201/api/Profesor';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching all professors', error);
        return throwError(() => error);
      })
    );
  }

  getByEstudianteId(id: string): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${this.apiUrl}/estudiante/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching professor by Estudiante', error);
        return throwError(() => error);
      })
    );
  }

  getById(id: string): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching professor with id ${id}`, error);
        return throwError(() => error);
      })
    );
  }

  create(dto: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(this.apiUrl, dto).pipe(
      catchError(error => {
        console.error('Error creating professor', error);
        return throwError(() => error);
      })
    );
  }

  update(dto: Profesor): Observable<Profesor> {
    return this.http.put<Profesor>(this.apiUrl, dto).pipe(
      catchError(error => {
        console.error('Error updating professor', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting professor with id ${id}`, error);
        return throwError(() => error);
      })
    );
  }
}