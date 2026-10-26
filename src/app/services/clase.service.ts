import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Clase } from '../models/clase.model';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {
  private apiUrl = 'http://localhost:5201/api/Clase';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching all classes', error);
        return throwError(() => error);
      })
    );
  }

  getClasesDisponiblesByEstudianteId(id: string): Observable<Clase[]> {
    return this.http.get<Clase[]>(`http://localhost:5201/api/ProgramaAcademico/avaliableClasses/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching classes by Estudiante', error);
        return throwError(() => error);
      })
    );
  }

  getByEstudianteId(id: string): Observable<Clase[]> {
    return this.http.get<Clase[]>(`http://localhost:5201/api/ProgramaAcademico/registeredClasses/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching classes by Estudiante', error);
        return throwError(() => error);
      })
    );
  }

  getById(id: string): Observable<Clase> {
    return this.http.get<Clase>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching class with id ${id}`, error);
        return throwError(() => error);
      })
    );
  }

  create(dto: Clase): Observable<Clase> {
    return this.http.post<Clase>(this.apiUrl, dto).pipe(
      catchError(error => {
        console.error('Error creating class', error);
        return throwError(() => error);
      })
    );
  }

  update(dto: Clase): Observable<Clase> {
    return this.http.put<Clase>(this.apiUrl, dto).pipe(
      catchError(error => {
        console.error('Error updating class', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting class with id ${id}`, error);
        return throwError(() => error);
      })
    );
  }
}
