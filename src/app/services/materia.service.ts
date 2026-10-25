import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Materia } from '../models/materia.model';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private apiUrl = 'http://localhost:5201/api/Materia';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Materia[]> {
    return this.http.get<Materia[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching all subjects', error);
        return throwError(() => error);
      })
    );
  }

  getByEstudianteId(id: string): Observable<Materia[]> {
    return this.http.get<Materia[]>(`${this.apiUrl}/estudiante/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching subject by Estudiante', error);
        return throwError(() => error);
      })
    );
  }

  getById(id: string): Observable<Materia> {
    return this.http.get<Materia>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching subject with id ${id}`, error);
        return throwError(() => error);
      })
    );
  }

  create(dto: Materia): Observable<Materia> {
    return this.http.post<Materia>(this.apiUrl, dto).pipe(
      catchError(error => {
        console.error('Error creating subject', error);
        return throwError(() => error);
      })
    );
  }

  update(dto: Materia): Observable<Materia> {
    return this.http.put<Materia>(this.apiUrl, dto).pipe(
      catchError(error => {
        console.error('Error updating subject', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting subject with id ${id}`, error);
        return throwError(() => error);
      })
    );
  }
}