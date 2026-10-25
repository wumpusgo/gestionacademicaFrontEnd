import { Component, signal } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProgramaAcademicoDto } from '../../models/programa-academico-dto.model';
import { AuthService } from '../../services/auth.service';
import { ProgramaAcademicoService } from '../../services/programa-academico.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-registro-asignaturas',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './registro-asignaturas.component.html',
  styleUrls: ['./registro-asignaturas.component.css']
})
export class RegistroAsignaturasComponent {

  userId = signal<string | null>(null);
  asignaturasRegistradas$: Observable<ProgramaAcademicoDto[]> | undefined;
  asignaturasDisponibles$: Observable<ProgramaAcademicoDto[]> | undefined;
  constructor(public authService: AuthService, public programaAcademicoService: ProgramaAcademicoService) { }


  ngOnInit() {
    this.userId.set(sessionStorage.getItem('user_id'));
    this.asignaturasDisponibles$ = this.programaAcademicoService.getAll();
    this.asignaturasRegistradas$ = this.programaAcademicoService.getByEstudianteId(this.userId()!);
  }




}

