import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProgramaAcademicoDto } from '../models/programa-academico-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramaAcademicoService {
  private apiUrl = 'http://localhost:5201/api/ProgramaAcademico';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProgramaAcademicoDto[]> {
    return this.http.get<ProgramaAcademicoDto[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching all programs', error);
        return throwError(() => error);
      })
    );
  }

  getByClaseId(id: string): Observable<ProgramaAcademicoDto[]> {
    return this.http.get<ProgramaAcademicoDto[]>(`${this.apiUrl}/clase/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching programs by Estudiante', error);
        return throwError(() => error);
      })
    );
  }

  getByEstudianteId(id: string): Observable<ProgramaAcademicoDto[]> {
    return this.http.get<ProgramaAcademicoDto[]>(`${this.apiUrl}/estudiante/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching programs by Estudiante', error);
        return throwError(() => error);
      })
    );
  }

  getById(id: string): Observable<ProgramaAcademicoDto> {
    return this.http.get<ProgramaAcademicoDto>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching program with id ${id}`, error);
        return throwError(() => error);
      })
    );
  }

  createNewProgram(idEstudiante: string, programasAcademicos: ProgramaAcademicoDto[]): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/createProgram`, {
      idEstudiante,
      programasAcademicos
    }).pipe(
      catchError(error => {
        console.error('Error creating new program', error);
        return throwError(() => error);
      })
    );
  }

  update(dto: ProgramaAcademicoDto): Observable<ProgramaAcademicoDto> {
    return this.http.put<ProgramaAcademicoDto>(this.apiUrl, dto).pipe(
      catchError(error => {
        console.error('Error updating program', error);
        return throwError(() => error);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting program with id ${id}`, error);
        return throwError(() => error);
      })
    );
  }
}
