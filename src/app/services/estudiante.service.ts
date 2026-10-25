import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Estudiante } from '../models/estudiante.model';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private apiUrl = 'http://localhost:5201/api/Estudiante';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching all students', error);
        return throwError(() => error);
      })
    );
  }

  getByEstudianteId(id: string): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/estudiante/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching student by Estudiante', error);
        return throwError(() => error);
      })
    );
  }

  getById(id: string): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching student with id ${id}`, error);
        return throwError(() => error);
      })
    );
  }

  create(dto: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.apiUrl, dto).pipe(
      catchError(error => {
        console.error('Error creating student', error);
        return throwError(() => error);
      })
    );
  }

  update(dto: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(this.apiUrl, dto).pipe(
      catchError(error => {
        console.error('Error updating student', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting student with id ${id}`, error);
        return throwError(() => error);
      })
    );
  }
}