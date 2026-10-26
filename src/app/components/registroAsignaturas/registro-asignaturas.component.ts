import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProgramaAcademicoDto } from '../../models/programa-academico-dto.model';
import { AuthService } from '../../services/auth.service';
import { ProgramaAcademicoService } from '../../services/programa-academico.service';
import { AsyncPipe } from '@angular/common';
import { ClaseService } from '../../services/clase.service';
import { Clase } from '../../models/clase.model';
import { ProfesorDirectiva } from '../../directives/profesor.directive';
import { MateriaDirectiva } from '../../directives/materia.directive';

@Component({
  selector: 'app-registro-asignaturas',
  standalone: true,
  imports: [AsyncPipe, MateriaDirectiva, ProfesorDirectiva],
  templateUrl: './registro-asignaturas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./registro-asignaturas.component.css']
})
export class RegistroAsignaturasComponent {

  userId = signal<string | null>(null);
  asignaturasRegistradas$: Observable<ProgramaAcademicoDto[]> | undefined;
  asignaturas$: Observable<Clase[]> | undefined;
  asignaturasDisponibles$: Observable<Clase[]> | undefined;
  asignaturasSeleccionadas: Clase[] = [];
  asignaturasDisponibles: Clase[] = [];
  returnedMsg = '';
  private cdr = inject(ChangeDetectorRef);

  constructor(public authService: AuthService, public programaAcademicoService: ProgramaAcademicoService, public claseService: ClaseService) { }

  ngOnInit() {
    this.userId.set(sessionStorage.getItem('user_id'));
    this.claseService.getClasesDisponiblesByEstudianteId(sessionStorage.getItem('user_id')!).
      subscribe({
        next: (data) => {
          this.asignaturasDisponibles = data; // Asignamos los datos a nuestra variable local
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error al cargar datos', err);
        }
      });


    this.claseService.getByEstudianteId(sessionStorage.getItem('user_id')!).
      subscribe({
        next: (data) => {
          this.asignaturasSeleccionadas = data; // Asignamos los datos a nuestra variable local
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error al cargar datos', err);
        }
      });
    this.asignaturasRegistradas$ = this.programaAcademicoService.getByEstudianteId(this.userId()!);

  }

  add(item: Clase) {
    this.asignaturasSeleccionadas?.push(item)
    const index = this.asignaturasDisponibles.indexOf(item, 0);
    if (index > -1) {
      this.asignaturasDisponibles.splice(index, 1);
    }
  }

  remove(item: Clase) {
    this.asignaturasDisponibles?.push(item)
    const index = this.asignaturasSeleccionadas?.indexOf(item, 0);
    if (index > -1) {
      this.asignaturasSeleccionadas?.splice(index, 1);
    }
  }

  createNewProgram(clases: Clase[]) {
    const currentUserId = this.userId();
    if (!currentUserId) {
      return;
    }

    const programasDtos: ProgramaAcademicoDto[] = clases.map(clase => ({
      id: crypto.randomUUID(),
      idClase: clase.id,
      idEstudiante: currentUserId,
      clase: clase,
      estudiante: null as any
    }));

    this.programaAcademicoService.createNewProgram(currentUserId, programasDtos).subscribe({
      next: (result) => {
        if (result) {
          this.asignaturasRegistradas$ = this.programaAcademicoService.getByEstudianteId(currentUserId);
          this.returnedMsg = "Asignaturas registradas."
          this.cdr.markForCheck();
        }
      },
      error: (err) => {
        this.returnedMsg = `Error al guardar asignaturas => ${err.error}`;
        this.cdr.markForCheck();
      }
    });
  }

}
